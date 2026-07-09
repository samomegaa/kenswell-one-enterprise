function startTimer() {
  const startedAt = Date.now();

  return Object.freeze({
    startedAt,
    stop() {
      return Date.now() - startedAt;
    },
  });
}

async function timeAsync(fn) {
  const timer = startTimer();
  const result = await fn();

  return Object.freeze({
    durationMs: timer.stop(),
    result,
  });
}

module.exports = {
  startTimer,
  timeAsync,
};
