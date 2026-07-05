const fs = require('fs');
const path = require('path');
const { monitorEventLoopDelay } = require('perf_hooks');

const OUT_DIR = path.join(__dirname, 'results');
const SAMPLE_MS = Number(process.env.BRIDGE_MEMORY_SAMPLE_MS || 1000);

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const eventLoop = monitorEventLoopDelay({ resolution: 20 });
  eventLoop.enable();

  await new Promise((resolve) => setTimeout(resolve, SAMPLE_MS));

  const memory = process.memoryUsage();

  const output = {
    generatedAt: new Date().toISOString(),
    sampleMs: SAMPLE_MS,
    memory: {
      rss: memory.rss,
      heapTotal: memory.heapTotal,
      heapUsed: memory.heapUsed,
      external: memory.external,
      arrayBuffers: memory.arrayBuffers,
    },
    eventLoop: {
      minMs: Number((eventLoop.min / 1e6).toFixed(2)),
      maxMs: Number((eventLoop.max / 1e6).toFixed(2)),
      meanMs: Number((eventLoop.mean / 1e6).toFixed(2)),
      p95Ms: Number((eventLoop.percentile(95) / 1e6).toFixed(2)),
      p99Ms: Number((eventLoop.percentile(99) / 1e6).toFixed(2)),
    },
  };

  eventLoop.disable();

  fs.writeFileSync(
    path.join(OUT_DIR, 'memory-profile-results.json'),
    JSON.stringify(output, null, 2)
  );

  console.log('Memory and event-loop profile complete');
  console.log(`Results: ${path.join(OUT_DIR, 'memory-profile-results.json')}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
