'use strict';
function firstDefined(source, keys) {
  for (const key of keys) if (source?.[key] !== undefined) return source[key];
  return undefined;
}
function normalizeEmployer(source = {}) {
  const id = firstDefined(source, ['id','employerId','employerID']);
  if (!id) throw new TypeError('Staffology employer response has no identifier');
  return Object.freeze({
    id: String(id),
    name: firstDefined(source,['name','employerName','businessName']) || String(id),
    status: firstDefined(source,['status','state']) || 'unknown',
    reference: firstDefined(source,['reference','code','payrollCode']) || null,
    raw: source,
  });
}
module.exports = { normalizeEmployer };
