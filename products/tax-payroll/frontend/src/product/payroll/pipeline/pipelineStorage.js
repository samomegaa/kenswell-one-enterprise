const STORAGE_KEY = 'kenswell.payroll.pipeline';
export function readPipeline() {
  try { const v = window.localStorage.getItem(STORAGE_KEY); return v ? JSON.parse(v) : null; }
  catch { return null; }
}
export function writePipeline(pipeline) {
  try {
    if (!pipeline) { window.localStorage.removeItem(STORAGE_KEY); return; }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(pipeline));
  } catch { /* Storage must not block payroll operations. */ }
}
