type Input = Array<any>;

export const arraySum = (input: Input): number => {
  let sum = 0;

  const traverse = (arr: Input) => {
    arr.forEach(element => {
      if (Array.isArray(element)) {
        traverse(element);
      } else if (typeof element === 'number'&& !isNaN(element)) {
        sum += element;
      }
    });
  };

  traverse(input);

  return sum;
};