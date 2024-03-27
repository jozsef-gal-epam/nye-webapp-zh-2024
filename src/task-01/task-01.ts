type Input = Array<any>;

export const arraySum = (input: Input): number => {
  let sum = 0;

  function sumNumbers(input: any): void {
    if (typeof input === "number" && !isNaN(input)) {
      sum += input;
    } else if (Array.isArray(input)) {
      for (const element of input) {
        sumNumbers(element);
      }
    }
  }

  sumNumbers(input);

  return sum;
};
