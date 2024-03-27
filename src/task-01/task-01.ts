type Input = Array<any>;

export const arraySum = (input: Input): number => {
  let sum = 0;

  for (const i of input) {
    if (typeof i === 'number' && !isNaN(i)) {
      sum += i;
    } else if (Array.isArray(i)) {
      sum += arraySum(i) || 0;
    }
  }

  return sum;
};
