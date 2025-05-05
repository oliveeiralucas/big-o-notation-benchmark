export function algorithm(input: number[]): number[] {
    const arr = [...input];
    const len = arr.length;
    let swapped: boolean;
  
    do {
      swapped = false;
      for (let i = 1; i < len; i++) {
        if (arr[i - 1] > arr[i]) {
          // troca arr[i-1] e arr[i]
          [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
          swapped = true;
        }
      }
    } while (swapped);
  
    return arr;
  }
