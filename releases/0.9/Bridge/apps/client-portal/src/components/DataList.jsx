import EmptyState from './EmptyState';
import StatusBadge from './StatusBadge';

export default function DataList({ items = [], emptyTitle, emptyMessage, getTitle, getStatus, getMeta }) {
  if (!items.length) {
    return <EmptyState title={emptyTitle} message={emptyMessage} />;
  }

  return (
    <ul className="data-list">
      {items.map((item) => (
        <li key={item.id}>
          <div>
            <strong>{getTitle(item)}</strong>
            {getMeta ? <small>{getMeta(item)}</small> : null}
          </div>
          {getStatus ? <StatusBadge value={getStatus(item)} /> : null}
        </li>
      ))}
    </ul>
  );
}
