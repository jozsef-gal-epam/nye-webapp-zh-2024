import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number =>
  gameSet.reduce((totalPoints, { outcome, shape }) => {
    const ourShape = getOurShape(outcome, shape);
    return totalPoints + (Points.get(ourShape) ?? 0) + (Points.get(outcome) ?? 0);
  }, 0);

const getOurShape = (outcome: Outcome, opponentShape: Shape): Shape =>
  outcome === Outcome.DRAW ? opponentShape :
  outcome === Outcome.WIN ? { [Shape.ROCK]: Shape.PAPER, [Shape.PAPER]: Shape.SCISSORS, [Shape.SCISSORS]: Shape.ROCK }[opponentShape] :
  { [Shape.ROCK]: Shape.SCISSORS, [Shape.PAPER]: Shape.ROCK, [Shape.SCISSORS]: Shape.PAPER }[opponentShape];
