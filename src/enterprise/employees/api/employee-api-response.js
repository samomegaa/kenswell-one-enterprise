function success(
  data,
  {
    status = 200,
    metadata = {},
  } = {}
) {
  return {
    status,
    body: {
      success: true,
      data,
      metadata,
      errors: [],
    },
  };
}

function failure(error) {
  const status =
    Number(error.status) || 500;

  return {
    status,
    body: {
      success: false,
      data: null,
      metadata: {},
      errors: [
        {
          code:
            error.code ||
            'internal_error',
          message:
            status === 500
              ? 'An unexpected error occurred'
              : error.message,
          details:
            status === 500
              ? {}
              : error.details || {},
        },
      ],
    },
  };
}

function send(res, response) {
  return res
    .status(response.status)
    .json(response.body);
}

module.exports = {
  success,
  failure,
  send,
};
