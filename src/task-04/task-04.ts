import { Outcome, Shape, Points } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly { shape: Shape; outcome: Outcome }[]): number => {
  let totalPoints = 0;

  gameSet.forEach(({ shape, outcome }) => {
    let myShape: Shape;

    switch (outcome) {
      case Outcome.WIN:
        myShape = shape === Shape.ROCK ? Shape.PAPER : (shape === Shape.PAPER ? Shape.SCISSORS : Shape.ROCK);
        break;
      case Outcome.LOOSE:
        myShape = shape === Shape.ROCK ? Shape.SCISSORS : (shape === Shape.PAPER ? Shape.ROCK : Shape.PAPER);
        break;
      case Outcome.DRAW:
        myShape = shape;
        break;
      default:
        throw new Error('Invalid outcome');
    }

    totalPoints += Points.get(outcome)! + Points.get(myShape)!;
  });

  return totalPoints;
};
