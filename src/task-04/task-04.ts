import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  let totalPoints = 0;

  for (const { shape, outcome } of gameSet) {
    let ourShape: Shape;

    switch (shape) {
      case Shape.ROCK:
        ourShape = (outcome === Outcome.WIN) ? Shape.PAPER : 
          (outcome === Outcome.LOOSE) ? Shape.SCISSORS : Shape.ROCK;
        break;
      case Shape.PAPER:
        ourShape = (outcome === Outcome.WIN) ? Shape.SCISSORS : 
          (outcome === Outcome.LOOSE) ? Shape.ROCK : Shape.PAPER;
        break;
      case Shape.SCISSORS:
        ourShape = (outcome === Outcome.WIN) ? Shape.ROCK : 
          (outcome === Outcome.LOOSE) ? Shape.PAPER : Shape.SCISSORS;
        break;
    }

    const shapePoints = Points.get(ourShape) || 0;
    const outcomePoints = Points.get(outcome) || 0;
    totalPoints += shapePoints + outcomePoints;
  }

  return totalPoints;
};
