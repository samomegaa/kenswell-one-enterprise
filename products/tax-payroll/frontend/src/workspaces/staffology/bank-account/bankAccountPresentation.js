function missing(value) { return value === undefined || value === null || value === ''; }
function digits(value) { return String(value).replace(/\D/g, ''); }
export function maskAccountNumber(value) {
  if (missing(value)) return value;
  const clean=digits(value); if (clean.length <= 4) return '••••';
  return `${'•'.repeat(clean.length - 4)}${clean.slice(-4)}`;
}
export function maskSortCode(value) {
  if (missing(value)) return value;
  const clean=digits(value); if (clean.length < 2) return '••-••-••';
  return `••-••-${clean.slice(-2)}`;
}
export function presentBoolean(value) {
  if (missing(value)) return value;
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  const normalised=String(value).trim().toLowerCase();
  if (normalised === 'true') return 'Yes'; if (normalised === 'false') return 'No'; return value;
}
export function presentPaymentMethod(value) {
  if (missing(value)) return value;
  const key=String(value).replace(/[^a-zA-Z0-9]/g,'').toLowerCase();
  return ({bacs:'BACS',cash:'Cash',cheque:'Cheque',manual:'Manual payment'})[key] || value;
}
