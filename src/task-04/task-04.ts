import { RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const Points: ReadonlyMap<string, number> = new Map<string, number>([
  [`${Shape.ROCK}_${Outcome.WIN}`, 8], 
  [`${Shape.ROCK}_${Outcome.LOOSE}`, 3],
  [`${Shape.ROCK}_${Outcome.DRAW}`, 4],

  [`${Shape.PAPER}_${Outcome.WIN}`, 9],
  [`${Shape.PAPER}_${Outcome.LOOSE}`, 1], 
  [`${Shape.PAPER}_${Outcome.DRAW}`, 5],

  [`${Shape.SCISSORS}_${Outcome.WIN}`, 7], 
  [`${Shape.SCISSORS}_${Outcome.LOOSE}`, 2],
  [`${Shape.SCISSORS}_${Outcome.DRAW}`, 6],
]);

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  let totalPoints = 0;

  for (const game of gameSet) {
    const key = `${game.shape}_${game.outcome}`;
    const points = Points.get(key) || 0;
    totalPoints += points;
  }

  return totalPoints;
};
