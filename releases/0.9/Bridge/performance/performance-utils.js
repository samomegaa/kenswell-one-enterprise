function percentile(values, p) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, Math.min(index, sorted.length - 1))];
}

function summary(values) {
  if (!values.length) {
    return { count: 0, avg: 0, median: 0, p95: 0, p99: 0, min: 0, max: 0 };
  }

  const total = values.reduce((sum, value) => sum + value, 0);

  return {
    count: values.length,
    avg: Math.round(total / values.length),
    median: percentile(values, 50),
    p95: percentile(values, 95),
    p99: percentile(values, 99),
    min: Math.min(...values),
    max: Math.max(...values),
  };
}

function nowMs() {
  return Number(process.hrtime.bigint() / 1000000n);
}

module.exports = {
  percentile,
  summary,
  nowMs,
};
