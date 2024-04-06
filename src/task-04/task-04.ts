import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  let totalPoints = 0;

  for (const game of gameSet) {
    const opponentShape = game.shape;
    const outcome = game.outcome;

    const myShape = determineMyShape(outcome, opponentShape);

    totalPoints += Points.get(myShape) ?? 0;
    totalPoints += Points.get(outcome) ?? 0;
  }

  return totalPoints;
}

function determineMyShape(outcome: Outcome, opponentShape: Shape): Shape {
  const winningShapes = {
    [Shape.ROCK]: Shape.PAPER,
    [Shape.PAPER]: Shape.SCISSORS,
    [Shape.SCISSORS]: Shape.ROCK,
  };

  const losingShapes = {
    [Shape.ROCK]: Shape.SCISSORS,
    [Shape.PAPER]: Shape.ROCK,
    [Shape.SCISSORS]: Shape.PAPER,
  };

  switch (outcome) {
    case Outcome.WIN:
      return winningShapes[opponentShape];
    case Outcome.LOOSE:
      return losingShapes[opponentShape];
    default:
      return opponentShape;
  }
};
