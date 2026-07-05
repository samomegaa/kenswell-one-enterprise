export default function PageHeader({ title, subtitle }) {
  return (
    <header className="page-header">
      <div>
        <p className="eyebrow">Kenswell One</p>
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
    </header>
  );
}
