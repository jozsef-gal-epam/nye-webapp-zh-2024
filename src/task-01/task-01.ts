type Input = Array<any>;

export const arraySum = (input: Input): number => {
  let sum = 0;

  const processArray = (arr: any[]): void => {
    arr.forEach(item => {
      if (Array.isArray(item)) {
        processArray(item); 
      } else if (typeof item === 'number' && !isNaN(item)) {
        sum += item; 
      }
    });
  };

  processArray(input); 

  return sum;
};
