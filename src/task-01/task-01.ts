type Input = Array<any>;

export const arraySum = (input: Input): number => {
  let s = 0;

  input.forEach(elem => {
    if (typeof elem === 'number') {
      if (!isNaN(elem))
        s += elem;
    } else if (Array.isArray(elem)) {
      s += arraySum(elem);
    }
  });

  return s;
};
