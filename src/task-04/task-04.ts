import { RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  const shapePointsMap: Map<Shape, number> = new Map([
    [Shape.ROCK, 1],
    [Shape.PAPER, 2],
    [Shape.SCISSORS, 3],
  ]);

  let totalPoints = 0;

  gameSet.forEach(({ shape, outcome }) => {
    const ourPoints = shapePointsMap.get(shape) || 0;
    if (outcome === Outcome.WIN) {
      totalPoints += ourPoints + 6; // Add our points plus win points (6)
    } else if (outcome === Outcome.DRAW) {
      totalPoints += 3; // Add fixed points for a draw (3)
    }
  });

  return totalPoints;
};
