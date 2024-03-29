
type Input = Array<any>;
//

export const arraySum = (input: Input): number => {
  let sum = 0;


  const traverseArray = (element: any) => {
    if (Array.isArray(element)) {
      element.forEach(item => traverseArray(item));
    } else if (typeof element === 'number' && !isNaN(element)) {
      sum += element;
    }
  };

  traverseArray(input);
  return sum;
};
