export default function ActionNotice({ error, message }) {
  if (error) return <p className="form-error">{error}</p>;
  if (message) return <p className="form-success">{message}</p>;
  return null;
}
