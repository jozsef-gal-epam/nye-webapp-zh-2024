type Input = Array<any>;

export const arraySum = (input: Input): number => {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
     if (typeof input[i] === 'number') {
       sum += input[i];
     } else if (Array.isArray(input[i])) {
       sum += arraySum(input[i]);
     }
  }
  return sum;
};
