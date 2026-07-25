export function resolveReadyNodes(graph) {
  const completed = new Set(
    graph.nodes
      .filter((node) => node.status === 'completed')
      .map((node) => node.id)
  );

  return graph.nodes.filter((node) =>
    ['planned', 'ready'].includes(node.status) &&
    node.dependsOn.every((id) => completed.has(id))
  );
}
