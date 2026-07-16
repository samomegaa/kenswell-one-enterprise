export default function LinkedEmployerBridge({ clientName, employeeCount, onOpenPayroll }) {
  return (
    <div className="linked-employer-bridge">
      <div><span>Linked Kenswell client</span><strong>{clientName}</strong></div>
      <div><span>Canonical employees</span><strong>{employeeCount}</strong></div>
      <button type="button" onClick={onOpenPayroll}>Open client payroll</button>
    </div>
  );
}
