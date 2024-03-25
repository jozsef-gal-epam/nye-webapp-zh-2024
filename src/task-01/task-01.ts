type Input = Array<any>;

export const arraySum = (input: Input): number => {
  let sum = 0;

  const traverseStructure = (item: any) => {
    if (typeof item === 'number' && !isNaN(item)) {
      sum += item; 
    } else if (Array.isArray(item)) {
      item.forEach(traverseStructure); 
    }
  };

  input.forEach(traverseStructure);

  return sum;
};
