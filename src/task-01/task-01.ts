type Input = Array<any>;

export const arraySum = (input: Input): number => {
  let sum = 0;
    
    function traverse(input: any[]) {
        input.forEach(item => {
            if (typeof item === 'number' && !isNaN(item)) {
                sum += item;
            } else if (Array.isArray(item)) {
                traverse(item);
            }
        });
    }
    
    traverse(input);
    
    return sum;
};
