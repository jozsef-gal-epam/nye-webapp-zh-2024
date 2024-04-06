import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  let points = 0;
  
  for (let i = 0; i < gameSet.length; i++) {
    const { shape, outcome } = gameSet[i];

    points += outcome === Outcome.WIN ? 6 + shapePoints(shape) :
              outcome === Outcome.DRAW ? 3 + shapePoints(shape) :
              outcome === Outcome.LOOSE ? 0 + shapePoints(shape) : 0;
  }

  return points + shapePointsTotal(gameSet);
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
