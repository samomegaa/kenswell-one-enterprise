export function filterTimeline(entries, filter, query) {
  const normalisedQuery = query.trim().toLowerCase();

  return entries.filter((entry) => {
    const typeMatches =
      filter === 'all' || entry.type === filter;

    const queryMatches =
      !normalisedQuery ||
      entry.title.toLowerCase().includes(normalisedQuery) ||
      entry.message.toLowerCase().includes(normalisedQuery) ||
      entry.correlationId?.toLowerCase().includes(
        normalisedQuery
      );

    return typeMatches && queryMatches;
  });
}
