type Input = Array<any>;

export const arraySum = (input: Input): number => {
  let sum = 0;

    const sumNumbers = (arr: any[]): void => {
        for (const item of arr) {
            if (typeof item === 'number' && !isNaN(item)) {
                sum += item;
            } else if (Array.isArray(item)) {
                sumNumbers(item);
            } else if (typeof item === 'object' && item !== null) {
                sumNumbers(Object.values(item));
            }
        }
    };

    sumNumbers(input);

    return sum;
};
