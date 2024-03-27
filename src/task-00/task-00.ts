export const oddsAndEvens = (num: number): 'odd' | 'even' => {
  if(num%2 === 0) {
    return 'even';
  } else return 'odd';
};