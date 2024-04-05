type Input = Array<any>;

export const arraySum = (input: Input): number => {
  // Rekurzív függvény az összegzéshez
  const sumRecursive = (arr: any[]): number => {
    let sum = 0;
    for (const item of arr) {
      // Ha az elem egy tömb, rekurzívan hívom a függvényt
      if (Array.isArray(item)) {
        sum += sumRecursive(item);
      } else if (typeof item === 'number' && !isNaN(item)) {
        // Ha az elem szám és nem NaN, hozzáadom az összeghez
        sum += item;
      }
    }
    return sum;
  };

  return sumRecursive(input);
};