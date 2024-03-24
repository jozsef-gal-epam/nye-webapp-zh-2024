import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  let totalPoints = 0;

  for (const { outcome, shape } of gameSet) {
    const pointsForMyShape = Points.get(getMyShape(shape, outcome)) || 0;
    const pointsForOpponentShape = Points.get(outcome) || 0;
    totalPoints += pointsForMyShape + pointsForOpponentShape;
  }

  return totalPoints;
};

const getMyShape = ( s: Shape, o: Outcome): Shape => {
  if (o === Outcome.WIN) {
    const scoringShape: Record<Shape, Shape> = {
      [Shape.ROCK]: Shape.PAPER,
      [Shape.PAPER]: Shape.SCISSORS,
      [Shape.SCISSORS]: Shape.ROCK,
    };
    return scoringShape[s];
  } else if (o === Outcome.LOOSE) {
    const losingShape: Record<Shape, Shape> = {
      [Shape.ROCK]: Shape.SCISSORS,
      [Shape.PAPER]: Shape.ROCK,
      [Shape.SCISSORS]: Shape.PAPER,
    };
    return losingShape[s];
  } else {
    return s;
  }
};
