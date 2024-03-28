import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  let összpontszám = 0; 

  for (const { shape, outcome } of gameSet) {
    const PontokShape = Points.get(shape) ?? 0;
    const PontokOutcome = Points.get(outcome) ?? 0;

    if (outcome === Outcome.WIN) {
      const NyerőShape = GyőztesShape(shape);
      const GyőztesPontokShape = Points.get(NyerőShape) ?? 0;
      összpontszám += GyőztesPontokShape + PontokOutcome;
    } else if (outcome === Outcome.LOOSE) {
      const VesztőShape = VesztesShape(shape);
      const VesztesPontokShape = Points.get(VesztőShape) ?? 0;
      összpontszám += VesztesPontokShape + PontokOutcome;
    } else {
      összpontszám += PontokShape + PontokOutcome;
    }
  }

  return összpontszám;
};

const GyőztesShape = (shape: Shape): Shape => {
  switch (shape) {
    case Shape.ROCK:
      return Shape.PAPER;
      case Shape.SCISSORS:
      return Shape.ROCK;
    case Shape.PAPER:
      return Shape.SCISSORS;
    default:
      return shape;
  }
};

const VesztesShape = (shape: Shape): Shape => {
  switch (shape) {
    case Shape.PAPER:
      return Shape.ROCK;
    case Shape.SCISSORS:
      return Shape.PAPER;
      case Shape.ROCK:
      return Shape.SCISSORS;
    default:
      return shape;
  }
};
