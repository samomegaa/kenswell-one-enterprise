import {
  PRODUCT_SECTIONS,
} from './productSections.js';

import {
  getSectionWorkspaces,
} from './workspaceRegistryQueries.js';

export function createProductNavigation(options = {}) {
  const {
    includePlanned = true,
  } = options;

  return PRODUCT_SECTIONS.map((section) => {
    const workspaces = getSectionWorkspaces(section.id)
      .filter((workspace) =>
        includePlanned || workspace.availability !== 'planned'
      );

    return Object.freeze({
      id: section.id,
      label: section.label,
      order: section.order,
      workspaces,
      enabled: workspaces.length > 0,
    });
  });
}
