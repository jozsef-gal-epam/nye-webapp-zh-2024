import { RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  let sum = 0;
  gameSet.forEach(element => {
    switch (element.shape) {
      case Shape.ROCK:
        switch (element.outcome) {
          case Outcome.WIN:
            sum += 8; 
            break;
          case Outcome.LOOSE:
            sum += 3; 
            break;
          case Outcome.DRAW:
            sum += 4; 
            break;
        }
        break;
      case Shape.PAPER:
        switch (element.outcome) {
          case Outcome.WIN:
            sum += 9; 
            break;
          case Outcome.LOOSE:
            sum += 1; 
            break;
          case Outcome.DRAW:
            sum += 5; 
            break;
        }
        break;
      case Shape.SCISSORS:
        switch (element.outcome) {
          case Outcome.WIN:
            sum += 7;
            break;
          case Outcome.LOOSE:
            sum += 2; 
            break;
          case Outcome.DRAW:
            sum += 6; 
            break;
        }
        break;
    }
  });
  return sum;
};

console.log(rockPaperScissors([
  { shape: Shape.ROCK, outcome: Outcome.DRAW },
  { shape: Shape.PAPER, outcome: Outcome.LOOSE },
  { shape: Shape.SCISSORS, outcome: Outcome.WIN },
]));
