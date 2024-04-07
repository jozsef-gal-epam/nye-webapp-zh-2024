type Input = Array<any>;


const calculateArraySum = (input: Input): number => {
  let sum = 0;

  input.forEach((item) => {
    if (typeof item === 'number' && !isNaN(item)) {
      sum += item;
    } else if (Array.isArray(item)) {
      sum += calculateArraySum(item);
    }
  });

  return sum;
};
