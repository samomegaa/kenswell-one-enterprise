export const displayValue=(value)=>value===null||value===undefined||value===''?'—':String(value);
export const displayCount=(value)=>value===null||value===undefined||value===''?'Unavailable':String(value);
export function displayDate(value) {
  if (!value) return '—'; const date=new Date(value); if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat('en-GB',{day:'2-digit',month:'short',year:'numeric'}).format(date);
}
