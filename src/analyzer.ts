// src/analyzer.ts
import { performance } from 'perf_hooks';

export interface Measurement {
  n: number;
  timeMs: number;
  memoryBytes: number;
}

export async function measure(
  run: (input: any) => any,
  generateInput: (n: number) => any,
  sizes: number[],
  repeats = 3
): Promise<Measurement[]> {
  const results: Measurement[] = [];

  for (const n of sizes) {
    let totalTime = 0;
    let peakMem = 0;

    for (let i = 0; i < repeats; i++) {
      global.gc?.();
      const beforeMem = process.memoryUsage().heapUsed;
      const t0 = performance.now();

      await Promise.resolve(run(generateInput(n)));

      const t1 = performance.now();
      const afterMem = process.memoryUsage().heapUsed;

      totalTime += (t1 - t0);
      peakMem = Math.max(peakMem, afterMem - beforeMem);
    }

    results.push({
      n,
      timeMs: totalTime / repeats,
      memoryBytes: peakMem,
    });
  }

  return results;
}
