type Input = Array<any>;

const calculateArraySum = (input: Input): number => {
  let sum = 0;

  const sumArray = (arr: Input) => {
    arr.forEach((item) => {
      if (Array.isArray(item)) {
        sumArray(item);
      } else if (typeof item === 'number' && !isNaN(item)) {
        sum += item;
      }
    });
  };

  sumArray(input);

  return sum;
};

