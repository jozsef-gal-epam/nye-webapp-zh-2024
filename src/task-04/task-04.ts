import {Outcome, Points, RPSInput, Shape} from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  let totalPoints = 0;

  for (const game of gameSet) {
    const ourShape: Shape = getOurShape(game.outcome, game.shape);
    const pointsForOurShape = Points.get(ourShape) ?? 0;
    const pointsForOutcome = Points.get(game.outcome) ?? 0;
    totalPoints += pointsForOurShape + pointsForOutcome;
  }

  return totalPoints;
};

const getOurShape = (outcome: Outcome, opponentShape: Shape): Shape => {
  if (outcome === Outcome.WIN) {
    switch (opponentShape) {
      case Shape.ROCK:
        return Shape.PAPER;
      case Shape.PAPER:
        return Shape.SCISSORS;
      case Shape.SCISSORS:
        return Shape.ROCK;
    }
  } else if (outcome === Outcome.LOOSE) {
    switch (opponentShape) {
      case Shape.ROCK:
        return Shape.SCISSORS;
      case Shape.PAPER:
        return Shape.ROCK;
      case Shape.SCISSORS:
        return Shape.PAPER;
    }
  } else {
    return opponentShape;
  }
};
