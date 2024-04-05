import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';



function whichShape(shape: string){

  if (shape !== undefined) {
    if (shape === Shape.ROCK) {
      return Points.get(Shape.ROCK);
    }else if (shape === Shape.PAPER){
      return Points.get(Shape.PAPER)
    }else{
      return Points.get(Shape.SCISSORS);
    }

  }else{
    return 0;
  }

};

function whichOutcome(outcome: string){

  if (outcome !== undefined) {
    if (outcome === Outcome.WIN) {
      return Points.get(Outcome.WIN);
    }else if (outcome === Outcome.LOOSE){
      return Points.get(Outcome.LOOSE)
    }else{
      return Points.get(Outcome.DRAW);
    }

  }else{
    return 0;
  }

};

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  let gameScore = 0;

  gameSet.forEach( element => {
    console.log(element.outcome + ": " + whichOutcome(element.outcome));
    console.log(element.shape + ": " + whichShape(element.shape));

    let shapeTurn = whichShape(element.shape);
    let outcomeTurn = whichOutcome(element.outcome);
    let turn = 0;
    if (shapeTurn !== undefined && outcomeTurn !== undefined) {
       turn = shapeTurn + outcomeTurn;
    }

    console.log('Összeg: ' + turn);

    gameScore += turn;

    console.log("gameScore: \t" + gameScore);
  });

  return gameScore;
};
