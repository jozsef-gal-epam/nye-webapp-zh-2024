import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  //throw new Error('Not implemented');
  let sum = 0;

  for (const game of gameSet) {
    switch (game.outcome) {
      case Outcome.DRAW:
        sum += Points.get(Outcome.DRAW) ?? 0;
        sum += Points.get(game.shape) ?? 0;
        break;
      case Outcome.LOOSE:
        sum += Points.get(Outcome.LOOSE) ?? 0;
        switch (game.shape) {
          case Shape.ROCK:
            sum += Points.get(Shape.SCISSORS) ?? 0;
            break;
          case Shape.PAPER:
            sum += Points.get(Shape.ROCK) ?? 0;
            break;
          case Shape.SCISSORS:
            sum += Points.get(Shape.PAPER) ?? 0;
            break;
        }
        break;
      case Outcome.WIN:
        sum += Points.get(Outcome.WIN) ?? 0;
        switch (game.shape) {
          case Shape.ROCK:
            sum += Points.get(Shape.PAPER) ?? 0;
            break;
          case Shape.PAPER:
            sum += Points.get(Shape.SCISSORS) ?? 0;
            break;
          case Shape.SCISSORS:
            sum += Points.get(Shape.ROCK) ?? 0;
            break;
        }
        break;
    }
  }

  return sum;
};