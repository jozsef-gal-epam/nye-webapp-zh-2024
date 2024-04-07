type Input = Array<any>;

export const arraySum = (input: Input): number => {
  let sum = 0;

  for (const item of input) {
    if (typeof item === 'number' && Number.isFinite(item)) {
      sum += item;
    } else if (Array.isArray(item)) {
      sum += arraySum(item);
    }
  }
  return sum;
};

/* Teszt feladat
const input: Input = [1, 2, 3, [[[4], 5], [["6"]], { obj: 10 }]];
const result = arraySum(input);
console.log(result);
*/