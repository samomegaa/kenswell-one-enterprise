export default function StatusBadge({ value }) {
  const label = String(value || 'unknown').replaceAll('_', ' ');

  return <span className={`status-badge status-${value || 'unknown'}`}>{label}</span>;
}
