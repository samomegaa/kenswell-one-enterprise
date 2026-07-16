const {
  EmployeeSyncService,
} = require(
  '../application/employee-sync-service'
);

const {
  ProviderEmployerLinkService,
} = require(
  '../application/provider-employer-link-service'
);

const {
  ProviderEmployerService,
} = require(
  '../application/provider-employer-service'
);

const {
  ProviderHealthService,
} = require(
  '../application/provider-health-service'
);

const {
  PracticeWorkspaceService,
} = require(
  '../application/practice-workspace-service'
);

const http = require('http');

const {
  ProductProofService,
} = require('../application/product-proof-service');

const service = new ProductProofService();

const providerHealthService =
  new ProviderHealthService();

const providerEmployerService =
  new ProviderEmployerService();

const providerEmployerLinkService =
  new ProviderEmployerLinkService();

const employeeSyncService =
  new EmployeeSyncService();


function sendJson(
  response,
  statusCode,
  body
) {
  const allowedOrigins = String(
    process.env.FRONTEND_ORIGIN ||
    'http://localhost:5173'
  )
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  const requestOrigin =
    response.req?.headers?.origin || '';

  const allowedOrigin =
    allowedOrigins.includes(requestOrigin)
      ? requestOrigin
      : allowedOrigins[0];

  response.writeHead(statusCode, {
    'Content-Type': 'application/json',

    'Access-Control-Allow-Origin':
      allowedOrigin,

    'Access-Control-Allow-Headers':
      'Content-Type, Authorization',

    'Access-Control-Allow-Methods':
      'GET, POST, OPTIONS',

    'Vary': 'Origin',
  });

  response.end(JSON.stringify(body));
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk;

      if (body.length > 1_000_000) {
        reject(new Error('request body too large'));
        request.destroy();
      }
    });

    request.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('invalid JSON request body'));
      }
    });

    request.on('error', reject);
  });
}

async function handleRequest(request, response) {
  if (request.method === 'OPTIONS') {
    sendJson(response, 204, {});
    return;
  }

  if (
    request.method === 'GET' &&
    request.url === '/health'
  ) {
    sendJson(response, 200, {
      ok: true,
      service: 'kenswell-tax-payroll-product-proof',
    });

    return;
  }

  if (
    request.method === 'POST' &&
    request.url ===
      '/api/product-proof/providers/health'
  ) {
    const body = await readJson(request);

    const result =
      await service.checkPayrollProvider(body);

    sendJson(response, 200, {
      ok: true,
      result,
    });

    return;
  }

  if (
    request.method === 'POST' &&
    request.url ===
      '/api/product-proof/practices'
  ) {
    const body = await readJson(request);
    const result = await service.createPractice(body);

    sendJson(response, 201, {
      ok: true,
      result,
    });

    return;
  }

  if (
    request.method === 'POST' &&
    request.url ===
      '/api/product-proof/clients'
  ) {
    const body = await readJson(request);
    const result = await service.createClient(body);

    sendJson(response, 201, {
      ok: true,
      result,
    });

    return;
  }

  if (
    request.method === 'POST' &&
    request.url ===
      '/api/product-proof/employers'
  ) {
    const body = await readJson(request);

    const result =
      await service.createEmployerExperience(body);

    sendJson(response, 201, {
      ok: true,
      result,
    });

    return;
  }

  if (
    request.method === 'GET' &&
    request.url ===
      '/api/product-proof/workspace'
  ) {
    const result =
      workspaceService.getWorkspace();

    sendJson(response, 200, {
      ok: true,
      result,
    });

    return;
  }

  const clientEmployeesMatch =
    request.url.match(
      /^\/api\/product-proof\/clients\/([^/]+)\/employees$/
    );

  if (
    request.method === 'GET' &&
    clientEmployeesMatch
  ) {
    const clientId =
      decodeURIComponent(
        clientEmployeesMatch[1]
      );

    const result =
      employeeSyncService.list(
        clientId
      );

    sendJson(response, 200, {
      ok: true,
      result,
    });

    return;
  }

  const employeeSyncMatch =
    request.url.match(
      /^\/api\/product-proof\/clients\/([^/]+)\/employees\/synchronise$/
    );

  if (
    request.method === 'POST' &&
    employeeSyncMatch
  ) {
    const clientId =
      decodeURIComponent(
        employeeSyncMatch[1]
      );

    const result =
      await employeeSyncService
        .synchronise(clientId);

    sendJson(response, 200, {
      ok: true,
      result,
    });

    return;
  }

  if (
    request.method === 'POST' &&
    request.url ===
      '/api/product-proof/providers/' +
      'staffology/employers/link'
  ) {
    const body = await readJson(request);
    const result =
      providerEmployerLinkService
        .linkStaffologyEmployer(body);

    sendJson(response, 200, { ok: true, result });
    return;
  }

  if (
    request.method === 'GET' &&
    request.url ===
      '/api/product-proof/providers/' +
      'staffology/employers'
  ) {
    const result =
      await providerEmployerService
        .listStaffologyEmployers();

    sendJson(response, 200, {
      ok: true,
      result,
    });

    return;
  }

  if (
    request.method === 'GET' &&
    request.url ===
      '/api/product-proof/providers'
  ) {
    const result =
      await providerHealthService
        .getProviderCentre();

    sendJson(response, 200, {
      ok: true,
      result,
    });

    return;
  }

  sendJson(response, 404, {
    ok: false,
    error: 'route not found',
  });
}

const workspaceService =
  new PracticeWorkspaceService();

const server = http.createServer(
  async (request, response) => {
    try {
      await handleRequest(request, response);
    } catch (error) {
      sendJson(
        response,
        error.statusCode || 400,
        {
          ok: false,
          error: error.message,
        }
      );
    }
  }
);

const port = Number(
  process.env.PORT ||
  process.env.TAX_PAYROLL_API_PORT ||
  5180
);

server.listen(port, '0.0.0.0', () => {
  console.log(
    `Kenswell Tax & Payroll Product Proof API listening on ${port}`
  );
});

module.exports = {
  server,
};
