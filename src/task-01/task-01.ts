type Input = Array<any>;

export const arraySum = (input: Input): number => {
  
  let receivedSum = 0;

  for (let index = 0; index < input.length; index++) {
      const value = input[index];
      if (value) {
          if (typeof value === 'number' && !isNaN(value)) {
              receivedSum+= value;
          }
          else if (Array.isArray(value)) {
              receivedSum += arraySum(value);
          }
      }
  }

  return receivedSum;
};
