# Version 2.0-R0 Baseline Certification

R0 establishes the protected engineering baseline from which Version 2.0 product
development begins.

The baseline is the current Version 1.x implementation on `release/1.4-a5`, including
the enterprise runtime, Staffology provider, employer and employee runtime, organisation
foundation, payroll-run A1–A5 foundation, and Staffology verification catalogue.

The exact commit and observed repository state are captured in `baseline-snapshot.json`.
Certification confirms structural availability; it does not claim that every capability
is live-write enabled or that the working tree is clean.

Version 2.0 rule: payroll contracts and operational behaviour must come from verified
Staffology API operations. Kenswell may improve enterprise composition and interface
design without changing Staffology payroll semantics.
