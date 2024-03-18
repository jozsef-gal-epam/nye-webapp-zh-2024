export const oddsAndEvens = (num: number): 'odd' | 'even' => {
  const checkEvenOdd = (num: number): 'odd' | 'even' => num % 2 === 0 ? 'even' : 'odd';
  return checkEvenOdd(num);
};