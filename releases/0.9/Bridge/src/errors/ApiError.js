class ApiError extends Error {
  constructor(message, statusCode = 500, code = 'internal_error', details = null) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends ApiError {
  constructor(message = 'Bad request', details = null) {
    super(message, 400, 'bad_request', details);
  }
}

class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized', details = null) {
    super(message, 401, 'unauthorized', details);
  }
}

class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden', details = null) {
    super(message, 403, 'forbidden', details);
  }
}

class NotFoundError extends ApiError {
  constructor(message = 'Not found', details = null) {
    super(message, 404, 'not_found', details);
  }
}

class ValidationError extends ApiError {
  constructor(message = 'Validation failed', details = null) {
    super(message, 422, 'validation_error', details);
  }
}

module.exports = {
  ApiError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
};
