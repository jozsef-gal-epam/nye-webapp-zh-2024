import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  let s = 0;

  gameSet.forEach(game => {
    const { shape, outcome } = game;

    switch (outcome) {
      case Outcome.WIN:
        s += 6

        switch (shape) {
          case Shape.ROCK:
            s += 2
            break;
          case Shape.PAPER:
            s += 3
            break;
          case Shape.SCISSORS:
            s += 1
            break;
          default:
            break;
        }

        break;

      case Outcome.LOOSE:
        switch (shape) {
          case Shape.ROCK:
            s += 3
            break;
          case Shape.PAPER:
            s += 1
            break;
          case Shape.SCISSORS:
            s += 2
            break;
          default:
            break;
        }
        break;

      case Outcome.DRAW:
        s += 3

        switch (shape) {
          case Shape.ROCK:
            s += 1
            break;
          case Shape.PAPER:
            s += 2
            break;
          case Shape.SCISSORS:
            s += 3
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  });

  return s;
};
