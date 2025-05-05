// src/plotter.ts
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import type { ChartConfiguration } from 'chart.js';
import * as fs from 'fs/promises';

export interface Measurement {
  n: number;
  timeMs: number;
  memoryBytes: number;
}

export async function generatePlot(
  inputJson = 'benchmark.json',
  outputImage = 'complexity.png'
) {
  const data: Measurement[] = JSON.parse(
    await fs.readFile(inputJson, 'utf-8')
  );

  const labels = data.map(d => d.n.toString());
  const times  = data.map(d => d.timeMs);

  const norm = times[0];
  const n0   = data[0].n;

  const curves: Record<string, number[]> = {
    'O(1)':       data.map(() => norm),
    'O(log n)':   data.map(d => Math.log2(d.n) * norm),
    'O(n)':       data.map(d => (d.n / n0) * norm),
    'O(n log n)': data.map(d =>
                    ((d.n * Math.log2(d.n)) / (n0 * Math.log2(n0))) * norm
                  ),
    'O(n²)':      data.map(d => ((d.n ** 2) / (n0 ** 2)) * norm),
  };

  const width = 800;
  const height = 600;
  const canvas = new ChartJSNodeCanvas({ width, height });

  const config: ChartConfiguration<'line', number[], string> = {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Algoritmo (medido)',
          data: times,
          fill: false,
          borderWidth: 2,
        },
        ...Object.entries(curves).map(([label, vals]) => ({
          label,
          data: vals,
          borderDash: [5, 5],
          fill: false,
          borderWidth: 1,
        }))
      ],
    },
    options: {
      scales: {
        x: {
          type: 'category',
          title: {
            display: true,
            text: 'Tamanho da entrada (n)',
          },
        },
        y: {
          type: 'linear',
          title: {
            display: true,
            text: 'Tempo (ms)',
          },
        },
      },
    },
  };

  const buffer = await canvas.renderToBuffer(config);
  await fs.writeFile(outputImage, buffer);
}
