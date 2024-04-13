type Input = Array<any>;
export const arraySum = (input: Input): number =>
  
{
  let sum=0;
    for(const item of input)
      {
        if(typeof item === 'number' && !isNaN(item))
          {
            sum +=item;
          }
        else if(Array.isArray(item))
          {
            sum +=arraySum(item);
          }
        else if(typeof item === 'object' && !isNaN(item))
          {
            sum +=item;
          }
      }
  return sum;
}
