// src/index.ts
import { performance } from 'perf_hooks';
import * as fs from 'fs/promises';
import { run, generateInput } from './userAlgorithm';
import { generatePlot, Measurement } from './plotter';

async function measure(
  runFn: (input: any) => any,
  genFn: (n: number) => any,
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

      await Promise.resolve(runFn(genFn(n)));

      const t1 = performance.now();
      const afterMem = process.memoryUsage().heapUsed;

      totalTime += t1 - t0;
      peakMem = Math.max(peakMem, afterMem - beforeMem);
    }

    results.push({ n, timeMs: totalTime / repeats, memoryBytes: peakMem });
  }

  return results;
}

async function main() {
  const sizes = [100, 200, 400, 800, 1600, 3200];
  console.log('🔍 Iniciando benchmark...');

  const data = await measure(run, generateInput, sizes, 5);

  console.table(data.map(d => ({
    n: d.n,
    time: d.timeMs.toFixed(2) + ' ms',
    mem: (d.memoryBytes / 1024).toFixed(1) + ' KB'
  })));

  await fs.writeFile('benchmark.json', JSON.stringify(data, null, 2));
  console.log('✅ benchmark.json gerado.');

  console.log('📊 Gerando gráfico de complexidade...');
  await generatePlot('benchmark.json', 'complexity.png');
  console.log('✅ complexity.png gerado.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
