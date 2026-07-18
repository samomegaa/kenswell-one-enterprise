export function adaptEmployeeWorkspace(payload) {
  if (!payload?.employee) {
    throw new TypeError(
      'Enterprise employee workspace payload is invalid'
    );
  }

  const visibleSections =
    payload.visibleWorkspace?.sections || [];

  return Object.freeze({
    employee: payload.employee,
    schema: payload.workspaceSchema,
    visibleWorkspace:
      payload.visibleWorkspace,
    readiness: payload.readiness,
    providerPanel: payload.providerPanel,
    contract: payload.contract,
    metadata: payload.metadata,
    navigation: Object.freeze(
      visibleSections.map((section) =>
        Object.freeze({
          id: section.id,
          label: section.title,
          icon: section.icon || null,
          fieldCount:
            section.fields?.length || 0,
        })
      )
    ),
  });
}

export function findWorkspaceSection(
  workspace,
  sectionId
) {
  return (
    workspace?.visibleWorkspace?.sections
      ?.find(
        (section) => section.id === sectionId
      ) || null
  );
}
