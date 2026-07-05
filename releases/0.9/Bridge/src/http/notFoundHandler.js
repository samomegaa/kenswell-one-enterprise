function notFoundHandler(req, res) {
  return res.status(404).json({
    success: false,
    error: {
      code: 'not_found',
      message: 'The requested resource was not found',
    },
    meta: {
      requestId: req.requestId || null,
      path: req.originalUrl || req.url,
    },
  });
}

module.exports = notFoundHandler;
