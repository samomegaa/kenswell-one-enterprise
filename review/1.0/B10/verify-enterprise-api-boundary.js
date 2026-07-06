const { createEnterpriseContext } = require('../../../src/enterprise/context');

const {
  DomainService,
  defaultDomainServiceRegistry,
  domainSuccess,
} = require('../../../src/enterprise/domain');

const {
  ApplicationService,
  defaultApplicationServiceRegistry,
  applicationSuccess,
} = require('../../../src/enterprise/application');

const {
  ApiServiceBoundary,
  ApiController,
  createApiRequest,
  apiSuccess,
  apiFailure,
  sendApiResponse,
  enterpriseApiBoundaryMiddleware,
} = require('../../../src/enterprise/api');

const core = require('../../../packages/core/src');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function run() {
  defaultApplicationServiceRegistry.clear();
  defaultDomainServiceRegistry.clear();

  const enterpriseContext = createEnterpriseContext({
    tenant: { id: 'tenant_api', slug: 'api', name: 'API Tenant' },
    identity: { userId: 'user_api', email: 'api@example.com' },
    auth: { authenticated: true, provider: 'local', tokenType: 'bearer' },
    rbac: { roles: ['api-user'], permissions: ['api:execute'] },
  });

  const domainService = new DomainService('api.domain');

  domainService.registerOperation('createRecord', async (context) => {
    return domainSuccess({
      id: 'record_001',
      name: context.input.name,
      tenantId: context.enterpriseContext.tenant.id,
    });
  });

  defaultDomainServiceRegistry.register(domainService);

  const applicationService = new ApplicationService('api.application');

  applicationService.registerUseCase('createRecord', async (context) => {
    const result = await context.domainServices.execute(
      'api.domain',
      'createRecord',
      {
        enterpriseContext: context.enterpriseContext,
        input: context.input,
      }
    );

    if (!result.ok) return result;

    return applicationSuccess({
      record: result.data,
    });
  });

  defaultApplicationServiceRegistry.register(applicationService);

  const req = {
    method: 'POST',
    url: '/api/records',
    originalUrl: '/api/records',
    params: {},
    query: {},
    body: { name: 'API Record' },
    headers: {
      'x-request-id': enterpriseContext.requestId,
      'x-correlation-id': enterpriseContext.correlationId,
    },
    enterpriseContext,
    applicationServices: defaultApplicationServiceRegistry,
    domainServices: defaultDomainServiceRegistry,
  };

  const apiRequest = createApiRequest({
    req,
    enterpriseContext,
    applicationServices: defaultApplicationServiceRegistry,
    domainServices: defaultDomainServiceRegistry,
    input: req.body,
  });

  assert(Object.isFrozen(apiRequest), 'apiRequest must be immutable');
  assert(apiRequest.method === 'POST', 'apiRequest method mismatch');
  assert(apiRequest.input.name === 'API Record', 'apiRequest input mismatch');

  const boundary = new ApiServiceBoundary({
    applicationServices: defaultApplicationServiceRegistry,
    domainServices: defaultDomainServiceRegistry,
  });

  const boundaryResult = await boundary.executeApplicationService({
    req,
    serviceName: 'api.application',
    useCaseName: 'createRecord',
    input: req.body,
  });

  assert(boundaryResult.ok === true, 'API boundary execution failed');
  assert(boundaryResult.data.record.id === 'record_001', 'API boundary result mismatch');
  assert(boundaryResult.data.record.tenantId === 'tenant_api', 'tenant not passed through API boundary');

  const controller = new ApiController('records.create', async () => {
    return apiSuccess({ created: true });
  });

  const controllerResult = await controller.execute(apiRequest);

  assert(controllerResult.ok === true, 'API controller execution failed');
  assert(controllerResult.data.created === true, 'API controller result mismatch');

  const failedController = new ApiController('records.fail', async () => {
    throw new Error('expected controller failure');
  });

  const failedControllerResult = await failedController.execute(apiRequest);

  assert(failedControllerResult.ok === false, 'failed controller should return api failure');
  assert(failedControllerResult.error.name === 'ApiControllerError', 'wrong controller error type');

  const success = apiSuccess({ ok: true });
  const failure = apiFailure(new Error('api failure'));

  assert(success.ok === true, 'apiSuccess invalid');
  assert(failure.ok === false, 'apiFailure invalid');

  const mockResponse = {
    statusCode: null,
    payload: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.payload = payload;
      return payload;
    },
  };

  sendApiResponse(mockResponse, success, 201);

  assert(mockResponse.statusCode === 201, 'sendApiResponse status mismatch');
  assert(mockResponse.payload.ok === true, 'sendApiResponse payload mismatch');

  assert(typeof enterpriseApiBoundaryMiddleware === 'function', 'API middleware not exported');
  assert(core.api, 'api not exported from core');
  assert(typeof core.api.ApiServiceBoundary === 'function', 'core API export invalid');

  console.log('✅ Enterprise API Service Boundary verification passed');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
