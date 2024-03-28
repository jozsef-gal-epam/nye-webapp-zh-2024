import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  return gameSet.reduce((totalPoints, game) => {
    const ourShape = getOurShape(game.outcome, game.shape);
    const movePoints = Points.get(ourShape) || 0;
    const outcomePoints = Points.get(game.outcome) || 0;
    return totalPoints + movePoints + outcomePoints;
  }, 0);
};

function getOurShape(outcome: Outcome, opponentShape: Shape): Shape {
  const winningMoves = {
    [Shape.ROCK]: Shape.PAPER,
    [Shape.PAPER]: Shape.SCISSORS,
    [Shape.SCISSORS]: Shape.ROCK,
  };
  const losingMoves = {
    [Shape.ROCK]: Shape.SCISSORS,
    [Shape.PAPER]: Shape.ROCK,
    [Shape.SCISSORS]: Shape.PAPER,
  };

  switch (outcome) {
    case Outcome.WIN:
      return winningMoves[opponentShape] || null;
    case Outcome.LOOSE:
      return losingMoves[opponentShape] || null;
    default:
      return opponentShape;
  }
};
