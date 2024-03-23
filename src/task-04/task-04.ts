import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  let allGamePoints = 0;

  gameSet.forEach(game => {
    const resultPoints = Points.get(game.outcome);
    const pickedShape = getPickedShape(game.shape, game.outcome);
    const pickedShapePoints = Points.get(pickedShape);
    const sameShapePoints = Points.get(game.shape);

    if (pickedShapePoints !== undefined && resultPoints !== undefined && sameShapePoints !== undefined) {
      if (game.outcome === Outcome.WIN) 
      {
        allGamePoints += pickedShapePoints + resultPoints;
      } 
      else if (game.outcome === Outcome.DRAW) 
      { 
        allGamePoints += sameShapePoints + resultPoints;
      } 
      else 
      {
        allGamePoints += pickedShapePoints;
      }
    }
  });
  return allGamePoints;
};


const getPickedShape = (shapeOfEnemy: Shape, outcome: Outcome) => {
  if (shapeOfEnemy === Shape.ROCK) 
  {
    return outcome === Outcome.WIN ? Shape.PAPER : Shape.SCISSORS;
  } 
  else if (shapeOfEnemy === Shape.PAPER) 
  {
    return outcome === Outcome.WIN ? Shape.SCISSORS : Shape.ROCK;
  } 
  else if (shapeOfEnemy === Shape.SCISSORS) 
  {
    return outcome === Outcome.WIN ? Shape.ROCK : Shape.PAPER;
  } 
  else 
  {
    throw new Error('It was not a good game');
  }
};
