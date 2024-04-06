type Input = Array<any>;

export const arraySum = (input: Input): number => {
    let sum = 0;
    input.forEach(element => {
        if (Array.isArray(element)) {
            sum += arraySum(element);
        } else if (typeof element === 'number'&& !isNaN(element)) {
            sum += element;
        }
    });
    return sum;
};

console.log(arraySum([1, 2, 3, [[[4], 5], [["6"]], { obj: 10 }]]));
