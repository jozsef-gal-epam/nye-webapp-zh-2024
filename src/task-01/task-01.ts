type Input = Array<any>;

export const arraySum = (input: Input): number => {
    let sum = 0;

    // Rekurzív függvény a bemeneti tömb bejárására
    const traverseArray = (arr: Input): void => {
        arr.forEach(element => {
            if (typeof element === 'number' && !isNaN(element)) {
                sum += element;
            } else if (Array.isArray(element)) {
                traverseArray(element);
            }
        });
    };

    // A bemeneti tömb bejárása
    traverseArray(input);

    return sum;
};

