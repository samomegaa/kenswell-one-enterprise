export function buildTimelineSummary(entries) {
  return Object.freeze({
    total: entries.length,
    exceptions: count(entries, 'exception'),
    submissions: count(entries, 'submission'),
    completions: count(entries, 'completion'),
    latestAt: entries[0]?.occurredAt || null,
  });
}

function count(entries, type) {
  return entries.filter((entry) => entry.type === type).length;
}
