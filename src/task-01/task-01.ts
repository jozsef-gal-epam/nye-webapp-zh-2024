type Input = Array<any>;

export const arraySum = (input: Input): number => {
  const flattenArray = (arr: any[]): any[] => {
    return arr.reduce((acc: any[], curr: any) => {
      if (Array.isArray(curr)) {
        acc.push(...flattenArray(curr));
      } else if (typeof curr === 'number' && !isNaN(curr)) {
        acc.push(curr);
      }
      return acc;
    }, []);
  };

  const flattenedInput = flattenArray(input);
  return flattenedInput.reduce((acc: number, curr: number) => acc + curr, 0);
};
