import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  let sum = 0;

  for (const i of gameSet) {

    if(i.outcome === Outcome.DRAW) {
      sum += Points.get(Outcome.DRAW) ?? 0;
      sum += Points.get(i.shape) ?? 0;
    }

    if(i.outcome === Outcome.LOOSE) {
      sum += Points.get(Outcome.LOOSE) ?? 0;
    
      if(i.shape === Shape.ROCK) {
        sum += Points.get(Shape.SCISSORS) ?? 0;
      }
      if(i.shape === Shape.PAPER) {
        sum += Points.get(Shape.ROCK) ?? 0;
      }
      if(i.shape === Shape.SCISSORS) {
        sum += Points.get(Shape.PAPER) ?? 0;
      }

    }

    if(i.outcome === Outcome.WIN) {
      sum += Points.get(Outcome.WIN) ?? 0;
    
      if(i.shape === Shape.SCISSORS) {
        sum += Points.get(Shape.ROCK) ?? 0;
      }
      if(i.shape === Shape.ROCK) {
        sum += Points.get(Shape.PAPER) ?? 0;
      }
      if(i.shape === Shape.PAPER) {
        sum += Points.get(Shape.SCISSORS) ?? 0;
      }
    }
  }

  return sum;
};
