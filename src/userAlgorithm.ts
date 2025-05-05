// src/userAlgorithm.ts

import { algorithm } from './userCode';

/**
 * Função principal que roda o algoritmo do usuário.
 * Recebe o input e retorna o output.
 */
export const run = algorithm;

/**
 * Gera um input de tamanho n para benchmarking.
 */
export function generateInput(n: number): number[] {
    return Array.from({ length: n }, () => Math.random());
  }