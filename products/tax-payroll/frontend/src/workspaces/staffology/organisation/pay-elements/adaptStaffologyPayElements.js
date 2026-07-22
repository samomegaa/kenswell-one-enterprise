import {
  resolvePayElementField,
  resolvePayElementGroups,
} from './payElementResolver';

function adaptPayElement(item, groupId, index) {
  return {
    id:
      resolvePayElementField(item, 'id') ||
      `${groupId}-${index + 1}`,
    name: resolvePayElementField(item, 'name'),
    code: resolvePayElementField(item, 'code'),
    category:
      resolvePayElementField(item, 'category'),
    calculation:
      resolvePayElementField(item, 'calculation'),
    frequency:
      resolvePayElementField(item, 'frequency'),
    taxable:
      resolvePayElementField(item, 'taxable'),
    niable:
      resolvePayElementField(item, 'niable'),
    pensionable:
      resolvePayElementField(item, 'pensionable'),
    status:
      resolvePayElementField(item, 'status'),
  };
}

export function adaptStaffologyPayElements(input) {
  const source =
    input?.employer ||
    input?.organisation ||
    input?.organization ||
    input ||
    {};

  return {
    groups: resolvePayElementGroups(source).map(
      (group) => ({
        id: group.id,
        title: group.title,
        singular: group.singular,
        available: group.available,
        sourcePath: group.sourcePath,
        items: group.items.map((item, index) =>
          adaptPayElement(item, group.id, index)
        ),
      })
    ),
  };
}
