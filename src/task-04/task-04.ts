import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  let points = 0;
  
  for (let i = 0; i < gameSet.length; i++) {
    const { shape, outcome } = gameSet[i];

    if (outcome === Outcome.WIN) {
      points += 6 + shapePoints(shape);
    } else if (outcome === Outcome.DRAW) {
      points += 3 + shapePoints(shape);
    } else if (outcome === Outcome.LOOSE) {
      points += 0 + shapePoints(shape);
    }
  }

  return points + shapePointsTotal(gameSet); // Itt hozzáadjuk az összes játékra vonatkozó pontokat is
};

const shapePoints = (shape: Shape): number => {
  return shape === Shape.ROCK ? 1 :
         shape === Shape.PAPER ? 2 :
         shape === Shape.SCISSORS ? 3 : 0;
};

const shapePointsTotal = (gameSet: readonly RPSInput[]): number => {
  let total = 0;

  for (let i = 0; i < gameSet.length; i++) {
    const { shape } = gameSet[i];
    total += shapePoints(shape);
  }

  return total;
};
