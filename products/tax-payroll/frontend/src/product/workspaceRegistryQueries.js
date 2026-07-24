import {
  OPERATIONAL_WORKSPACES,
} from './workspaceRegistry.js';

export function getOperationalWorkspace(workspaceId) {
  return OPERATIONAL_WORKSPACES.find(
    (workspace) => workspace.id === workspaceId
  ) || null;
}

export function getSectionWorkspaces(sectionId) {
  return OPERATIONAL_WORKSPACES.filter(
    (workspace) => workspace.sectionId === sectionId
  );
}

export function getProviderWorkspaces(provider) {
  return OPERATIONAL_WORKSPACES.filter(
    (workspace) => workspace.provider === provider
  );
}

export function supportsCapability(capabilities, workspace) {
  if (!workspace?.capability) return true;
  return capabilities.includes(workspace.capability);
}
