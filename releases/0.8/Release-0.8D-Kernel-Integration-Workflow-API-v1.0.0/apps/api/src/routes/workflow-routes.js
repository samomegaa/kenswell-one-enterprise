export function registerWorkflowRoutes(app, kernel) {
  app.get('/api/workflows', (req, res) => {
    res.json({ workflows: kernel.workflowService.listWorkflows() });
  });

  app.get('/api/workflows/active', (req, res) => {
    res.json({ workflows: kernel.workflowService.listActiveWorkflows() });
  });

  app.get('/api/workflows/:id', (req, res) => {
    res.json({ snapshot: kernel.workflowService.getWorkflowSnapshot(req.params.id) });
  });

  app.post('/api/workflows/:id/block', (req, res) => {
    const workflow = kernel.workflowService.blockWorkflow(
      req.params.id,
      req.body?.actorId || 'system',
      req.body?.reason || 'Blocked'
    );

    res.json({ ok: true, workflow });
  });

  app.post('/api/workflows/:id/resume', (req, res) => {
    const workflow = kernel.workflowService.resumeWorkflow(
      req.params.id,
      req.body?.actorId || 'system'
    );

    res.json({ ok: true, workflow });
  });

  app.post('/api/workflows/:id/complete', (req, res) => {
    const workflow = kernel.workflowService.completeWorkflow(
      req.params.id,
      req.body?.actorId || 'system'
    );

    res.json({ ok: true, workflow });
  });
}
