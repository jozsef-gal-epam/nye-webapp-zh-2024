import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  let totalPoints = 0;

  for (const round of gameSet) {
    const { shape, outcome } = round;
    const shapePoints = Points.get(shape);
    const outcomePoints = Points.get(outcome);

    if (shapePoints !== undefined && outcomePoints !== undefined) {
      totalPoints += shapePoints + outcomePoints;
    }
  }

  return totalPoints;
};