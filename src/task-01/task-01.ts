type Input = Array<any>;

export const arraySum = (input: Input): number => {
  let result = 0;

  const traverse = (arr: Input) => {
    for (const item of arr) {
      if(Array.isArray(item)){
        traverse(item);
      } else if (typeof item === 'number' && !isNaN(item)){
        result += item;
      }
    }
  };

  traverse(input);

  return result;
};
