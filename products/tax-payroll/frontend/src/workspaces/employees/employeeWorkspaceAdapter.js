function readinessBySection(payload) {
  return new Map(
    (payload.readiness?.sections || []).map(
      (section) => [section.sectionId, section]
    )
  );
}

export function adaptEmployeeWorkspace(payload) {
  if (!payload?.employee) {
    throw new TypeError(
      'Enterprise employee workspace payload is invalid'
    );
  }

  const sections =
    payload.visibleWorkspace?.sections || [];

  const readiness = readinessBySection(payload);

  return Object.freeze({
    employee: payload.employee,
    schema: payload.workspaceSchema,
    visibleWorkspace: payload.visibleWorkspace,
    readiness: payload.readiness,
    providerPanel: payload.providerPanel,
    contract: payload.contract,
    metadata: payload.metadata,
    navigation: Object.freeze(
      sections.map((section) => {
        const state = readiness.get(section.id);

        return Object.freeze({
          id: section.id,
          label: section.title,
          icon: section.icon || null,
          fieldCount: section.fields?.length || 0,
          status: state?.status || 'ready',
          score: state?.score ?? 100,
          missing: state?.missing || 0,
          changed: false,
        });
      })
    ),
  });
}

export function findWorkspaceSection(
  workspace,
  sectionId
) {
  return (
    workspace?.visibleWorkspace?.sections
      ?.find((section) => section.id === sectionId) ||
    null
  );
}
