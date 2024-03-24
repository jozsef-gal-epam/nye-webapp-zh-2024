type Input = Array<any>;

export const arraySum = (input: Input): number => {
  let sum = 0;

  const sumNumbers = (arr: Input) => {
    arr.forEach(item => {
      if (typeof item === 'number' && !isNaN(item)) {
        sum += item;
      } else if (Array.isArray(item)) {
        sumNumbers(item);
      }
    });
  };

  sumNumbers(input);

  return sum;
};
