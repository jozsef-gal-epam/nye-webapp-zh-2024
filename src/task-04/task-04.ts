import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  let GamePoints = 0;

  for (const { shape, outcome } of gameSet) {
    const shapePoints = Points.get(shape); 
    const outcomePoints = Points.get(outcome); 
      if (outcome===Outcome.WIN){
        if(shape===Shape.ROCK){
          GamePoints += Points.get( Shape.PAPER)??0 ;
          GamePoints+= Points.get(outcome) ??0;

      } else if(shape===Shape.PAPER){
          GamePoints += Points.get( Shape.SCISSORS) ??0;
          GamePoints+= Points.get(outcome) ??0;
      }else {GamePoints += Points.get( Shape.ROCK) ??0;
        GamePoints+= Points.get(outcome) ??0;
  }
  } 
        if (outcome===Outcome.LOOSE){
          if(shape===Shape.PAPER){
            GamePoints += Points.get( Shape.ROCK) ??0;
            GamePoints+= Points.get(outcome) ??0;
            }else if(shape===Shape.SCISSORS){
              GamePoints += Points.get( Shape.PAPER) ??0;
              GamePoints+= Points.get(outcome) ??0;
        }else {GamePoints += Points.get( Shape.SCISSORS) ??0;
          GamePoints+= Points.get(outcome) ??0;
        }
  }
  if (outcome===Outcome.DRAW){
    if(shape===Shape.PAPER){
      GamePoints += Points.get( Shape.PAPER) ??0;
      GamePoints+= Points.get(outcome) ??0;
      }else if(shape===Shape.SCISSORS){
        GamePoints += Points.get( Shape.SCISSORS) ??0;
        GamePoints+= Points.get(outcome) ??0;
  }else {GamePoints += Points.get( Shape.ROCK) ??0;
    GamePoints+= Points.get(outcome) ??0;
  }
}
    
  }
 
  return GamePoints;
};