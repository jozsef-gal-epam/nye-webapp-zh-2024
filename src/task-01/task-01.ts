type Input = Array<any>;

export const arraySum = (input: Input): number => {
  let sum = 0;

  const sumArray = (arr: Input) => {
    for (const item of arr) {
      if (Array.isArray(item)) {
        sumArray(item);
      } else if (typeof item === 'number' && !isNaN(item)) {
        sum += item;
      }
    }
  };

  sumArray(input);

  return sum;
};
