import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  let totalPoints = 0;

  for (const { outcome, shape } of gameSet) {
    const myShape = getMyShape(shape, outcome);
    totalPoints += Points.get(myShape) || 0;
    totalPoints += Points.get(outcome) || 0;
  }

  return totalPoints;
};

const getMyShape = (shape: Shape, outcome: Outcome): Shape => {
  const shapeMap: Record<Outcome, Record<Shape, Shape>> = {
    [Outcome.WIN]: {
      [Shape.ROCK]: Shape.PAPER,
      [Shape.PAPER]: Shape.SCISSORS,
      [Shape.SCISSORS]: Shape.ROCK,
    },
    [Outcome.LOOSE]: {
      [Shape.ROCK]: Shape.SCISSORS,
      [Shape.PAPER]: Shape.ROCK,
      [Shape.SCISSORS]: Shape.PAPER,
    },
    [Outcome.DRAW]: {
      [Shape.ROCK]: Shape.ROCK,
      [Shape.PAPER]: Shape.PAPER,
      [Shape.SCISSORS]: Shape.SCISSORS,
    },
  };

  return shapeMap[outcome][shape] || shape;
};
