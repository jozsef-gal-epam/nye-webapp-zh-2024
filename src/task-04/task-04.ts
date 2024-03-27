import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  let totalPoints = 0;

  const getMyShape = (s: Shape, o: Outcome): Shape =>
    o === Outcome.WIN
      ? { [Shape.ROCK]: Shape.PAPER, [Shape.PAPER]: Shape.SCISSORS, [Shape.SCISSORS]: Shape.ROCK }[s]
      : o === Outcome.LOOSE
      ? { [Shape.ROCK]: Shape.SCISSORS, [Shape.PAPER]: Shape.ROCK, [Shape.SCISSORS]: Shape.PAPER }[s]
      : s;

  for (const { outcome, shape } of gameSet) {
    const pointsForMyShape = Points.get(getMyShape(shape, outcome)) || 0;
    const pointsForOpponentShape = Points.get(outcome) || 0;
    totalPoints += pointsForMyShape + pointsForOpponentShape;
  }

  return totalPoints;
};
