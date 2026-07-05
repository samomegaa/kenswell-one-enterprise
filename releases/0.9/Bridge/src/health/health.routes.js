const express = require('express');

function createHealthRouter(healthService) {
  const router = express.Router();

  router.get('/live', (req, res) => {
    return res.json({
      success: true,
      data: healthService.live(),
      meta: {},
    });
  });

  router.get('/health', (req, res) => {
    return res.json({
      success: true,
      data: healthService.health(),
      meta: {},
    });
  });

  router.get('/ready', (req, res) => {
    const readiness = healthService.readiness();

    return res.status(readiness.ready ? 200 : 503).json({
      success: readiness.ready,
      data: readiness,
      meta: {},
    });
  });

  return router;
}

module.exports = createHealthRouter;
