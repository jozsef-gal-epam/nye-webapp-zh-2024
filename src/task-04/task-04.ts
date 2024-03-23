import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';
export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  let totalPoints = 0;
  for (const { shape, outcome } of gameSet) {
    const shapePoints = Points.get(shape);
    const outcomePoints = Points.get(outcome);
    if(outcome===Outcome.WIN)
    {
      if(shape===Shape.ROCK)
      {
      totalPoints=totalPoints+(Points.get(Shape.PAPER)??0)+(Points.get(Outcome.WIN)||0);  
      }
      if(shape===Shape.PAPER)
      {
      totalPoints=totalPoints+(Points.get(Shape.SCISSORS)??0)+(Points.get(Outcome.WIN)||0);  
      }
      if(shape===Shape.SCISSORS)
      {
      totalPoints=totalPoints+(Points.get(Shape.ROCK)??0)+(Points.get(Outcome.WIN)||0);  
      }
   }
   if(outcome===Outcome.LOOSE)
    {
      if(shape===Shape.ROCK)
      {
      totalPoints=totalPoints+(Points.get(Shape.SCISSORS)??0)+(Points.get(Outcome.LOOSE)||0);  
      }

      if(shape===Shape.PAPER)
      {
      totalPoints=totalPoints+(Points.get(Shape.ROCK)??0)+(Points.get(Outcome.LOOSE)||0);  
      }
      if(shape===Shape.SCISSORS)
      {
      totalPoints=totalPoints+(Points.get(Shape.PAPER)??0)+(Points.get(Outcome.LOOSE)||0);  
      }
   }
   if(outcome===Outcome.DRAW)
    {
      if(shape===Shape.ROCK)
      {
      totalPoints=totalPoints+(Points.get(Shape.ROCK)??0)+(Points.get(Outcome.DRAW)||0);  
      }

      if(shape===Shape.PAPER)
      {
      totalPoints=totalPoints+(Points.get(Shape.PAPER)??0)+(Points.get(Outcome.DRAW)||0);  
      }
      if(shape===Shape.SCISSORS)
      {
      totalPoints=totalPoints+(Points.get(Shape.SCISSORS)??0)+(Points.get(Outcome.DRAW)||0);  
      }
   }
  }
  return totalPoints;
};