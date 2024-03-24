type Input = Array<any>;

export const arraySum = (input: Input): number => {
  let total = 0;

    const sumNumbers = (arr: Input) => {
        for (const item of arr) {
            if (Array.isArray(item)) {
                sumNumbers(item);
            } else if (typeof item === 'number' && !isNaN(item)) {
                total += item;
            }
        }
    };
    
    sumNumbers(input);
    return total;
};
