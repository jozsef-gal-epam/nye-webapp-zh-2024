import { RPSInput, Shape, Outcome, Points } from "./models/rock-paper-scissors";

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
 
    let totalPoints = 0;
  
    gameSet.forEach(({ shape: enemyShape, outcome }) => {

      const ourShape = getOurShape(enemyShape, outcome);

      const ourShapePoints = Points.get(ourShape) ?? 0;
      const ourOutcomePoints = Points.get(outcome) ?? 0;
      const drawShapePoints = Points.get(enemyShape) ?? 0;
  
        switch (outcome) {
          case Outcome.LOOSE:
            totalPoints += ourShapePoints;
            break;
          case Outcome.WIN:
            totalPoints += ourShapePoints + ourOutcomePoints;
            break;
          default:
            totalPoints += drawShapePoints + ourOutcomePoints;
        }
      
    });

    return totalPoints;
  };
 
  const getOurShape = (enemyShape:Shape, outcome:Outcome) => {
    if (outcome === Outcome.WIN) {
      return getWinningShape(enemyShape);
    } else if (outcome === Outcome.LOOSE) {
      return getLosingShape(enemyShape);
    } else {
      return enemyShape;
    }
  };
  const getWinningShape = (enemyShape:Shape) => {
    switch (enemyShape) {
      case Shape.ROCK:
        return Shape.PAPER;
      case Shape.PAPER:
        return Shape.SCISSORS;
      case Shape.SCISSORS:
        return Shape.ROCK;
      default:
        throw new Error('Invalid shape provided');
    }
  };
  
  const getLosingShape = (enemyShape : Shape) => {
    switch (enemyShape) {
      case Shape.ROCK:
        return Shape.SCISSORS;
      case Shape.PAPER:
        return Shape.ROCK;
      case Shape.SCISSORS:
        return Shape.PAPER;
      default:
        throw new Error('Invalid shape provided');
    }
  };
  
