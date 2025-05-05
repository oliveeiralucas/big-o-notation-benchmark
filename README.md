# Big O Notation Benchmark

Uma ferramenta em **TypeScript** e **Node.js** para medir e visualizar a complexidade de tempo e espaço de algoritmos.

---

## 🎯 Visão Geral

Este projeto permite que você:

1. **Defina** seu algoritmo e um gerador de inputs em um único arquivo (`src/userCode.ts`).
2. **Meça** o tempo de execução e o consumo de memória para vários tamanhos de entrada (`src/analyzer.ts`).
3. **Plote** automaticamente um gráfico comparando a curva medida do seu algoritmo com as curvas teóricas de complexidade (O(1), O(log n), O(n), O(n log n), O(n²)) (`src/plotter.ts`).
4. **Execute tudo** com um único comando (`npm run dev`), gerando:
   - `benchmark.json` (resultados detalhados)
   - `complexity.png` (gráfico final)

---

## 🚀 Pré-requisitos

- [Node.js](https://nodejs.org/) **versão 16** ou superior  

---

## 💾 Instalação

```bash
# Clone este repositório
git clone https://github.com/oliveeiralucas/big-o-notation-benchmark.git
cd big-o-notation-benchmark

# Instale dependências
npm install

```

---

## 📁 Estrutura do Projeto

```
big-o-notation/
├── src/
│   ├── userCode.ts       ← Defina aqui seu algoritmo e generateInput(n)
│   ├── userAlgorithm.ts  ← "Glue": exporta run() e generateInput() do userCode
│   ├── analyzer.ts       ← Mede tempo & memória para tamanhos configurados
│   ├── plotter.ts        ← Gera complexity.png com Chart.js + node-canvas
│   └── index.ts          ← Orquestra benchmark + plot automático
├── benchmark.json        ← Dados gerados (após executar)
├── complexity.png        ← Gráfico gerado (após executar)
├── package.json
└── tsconfig.json
```

---

## ⚙️ Scripts NPM

- **`npm run dev`**  
  Executa tudo em modo desenvolvimento (sem compilar):
  1. Roda benchmark para múltiplos `n`  
  2. Gera `benchmark.json`  
  3. Plota `complexity.png`

- **`npm run build`**  
  Compila o TypeScript para `dist/`.

- **`npm start`**  
  Executa a versão compilada em `dist/index.js`.

---

## 🛠️ Personalizando seu Algoritmo

1. Abra `src/userCode.ts`.
2. Exporte uma função:

   ```ts
   // src/userCode.ts

   export function algorithm(input: number[]): number[] {
     // ... seu código aqui ...
   }
   ```

3. Rode `npm run dev` e confira o gráfico em `complexity.png`.

---

## 📝 License

Este projeto está sob [MIT License](LICENSE).

---

## 🤝 Contribuições

PRs são sempre bem-vindas! Sinta-se à vontade para abrir issues e pull requests.  

---
