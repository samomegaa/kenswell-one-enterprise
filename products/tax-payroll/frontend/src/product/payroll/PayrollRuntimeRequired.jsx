export default function PayrollRuntimeRequired() {
  return (
    <section
      className="payroll-runtime-required"
      role="status"
    >
      <span>Employer context required</span>
      <h2>Select a linked Staffology employer</h2>
      <p>
        The payroll operational workspace uses the verified employer
        runtime. Open a linked employer from Dashboard before beginning
        employee selection, calculation, validation or approval.
      </p>
    </section>
  );
}
