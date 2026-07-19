export function RuntimeStatePanel({
  title,
  message,
  actionLabel,
  onAction,
  tone = 'neutral',
}) {
  return (
    <section
      className="runtime-state-panel"
      data-tone={tone}
      role={tone === 'error' ? 'alert' : 'status'}
    >
      <h3>{title}</h3>
      <p>{message}</p>

      {actionLabel && onAction && (
        <button type="button" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </section>
  );
}
