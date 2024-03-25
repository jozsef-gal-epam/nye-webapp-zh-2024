import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  let totalPoints = 0;

  for (const game of gameSet) {
    const { shape, outcome } = game;

    let opponentShape: Shape;

    switch (shape) {
      case Shape.ROCK:
        opponentShape = Shape.SCISSORS;
        break;
      case Shape.PAPER:
        opponentShape = Shape.ROCK;
        break;
      case Shape.SCISSORS:
        opponentShape = Shape.PAPER;
        break;
      default:
        throw new Error('Invalid shape provided');
    }

    const pointsFromOutcome = Points.get(outcome) ?? 0;

    totalPoints += Points.get(shape) ?? 0;
    totalPoints += Points.get(opponentShape) ?? 0;
    totalPoints += pointsFromOutcome;
  }

  return totalPoints;
};
