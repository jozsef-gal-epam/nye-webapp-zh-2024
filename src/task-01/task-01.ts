type Input = Array<any>;

export const arraySum = (input: Input): number => {
  let sumOfArr = 0;

  //tomb nem ures check
  if (input.length === 0) {
    return 0;
  }else{

    for (let i = 0; i < input.length; i++) {

      if (typeof input[i] === 'number' && !isNaN(input[i])) {
        sumOfArr += input[i];
      }else if (Array.isArray(input[i])) {
        sumOfArr += arraySum(input[i]);
      }
      
    }
  
    return sumOfArr;
  }

};


//KÉSZ 