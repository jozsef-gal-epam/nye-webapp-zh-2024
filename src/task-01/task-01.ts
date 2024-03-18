type Input = Array<any>;

export const arraySum = (input: Input): number => {
  let sum = 0;

  const traverseArray = (arr: Input) => {
    arr.forEach((item) => {
      if (Array.isArray(item)) {
        traverseArray(item);
      } else if (typeof item === 'number' && !isNaN(item)) {
        sum += item;
      }
    });
  };

  traverseArray(input);

  return sum;
};
