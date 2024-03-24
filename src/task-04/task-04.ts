import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  let totalPoints = 0;

  for (const game of gameSet) {
    const { shape, outcome } = game;

    const opponentShape = shape === Shape.ROCK ? Shape.SCISSORS : shape === Shape.PAPER ? Shape.ROCK : Shape.PAPER;
    const pointsFromOutcome = Points.get(outcome) ?? 0;

    totalPoints += Points.get(shape) ?? 0;
    totalPoints += Points.get(opponentShape) ?? 0;
    totalPoints += pointsFromOutcome;
  }

  return totalPoints;
};
