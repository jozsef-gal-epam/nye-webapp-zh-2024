import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';



function whichShape(shape: string, outcome: string){
  let result = 0;
  //Nyertünk
  if (outcome === Outcome.WIN){

     result = Points.get(Outcome.WIN) || 0;

    //Kő ellen -> papírral
    if(shape === Shape.ROCK){
      //papír pontszáma
      result += Points.get(Shape.PAPER) || 0;
      return result; //8

    }else if( shape === Shape.PAPER ){
      //olló pontszáma
      result += Points.get(Shape.SCISSORS) || 0;
      return result;//9

    }else if( shape === Shape.SCISSORS){
      //kő pontszáma
      result += Points.get(Shape.ROCK) || 0;
      return result;//7

    }

  }

  //Veszítettünk
  if(outcome === Outcome.LOOSE){
    
    result = Points.get(Outcome.LOOSE) || 0;

    //Kő ellen -> olló
    if(shape === Shape.ROCK){
      //olló pontszáma
      result += Points.get(Shape.SCISSORS) || 0;
      return result;
    }
    //papír ellen -> kő
    else if( shape === Shape.PAPER ){
      //kő pontszáma
      result += Points.get(Shape.ROCK) || 0;
      return result;
    }
    //olló ellen -> papír
    else if( shape === Shape.SCISSORS){
      //papír pontszáma
      result += Points.get(Shape.PAPER) || 0;
      return result;
    }

  }
  //Döntetlen
  if(outcome === Outcome.DRAW){

    result = Points.get(Outcome.DRAW) || 0;

    //Kő ellen -> kő
    if(shape === Shape.ROCK){
      //kő pontszáma
      result += Points.get(Shape.ROCK) || 0;
      return result;
    }else if( shape === Shape.PAPER ){
      //papír pontszáma
      result += Points.get(Shape.PAPER) || 0;
      return result;
    }else if( shape === Shape.SCISSORS){
      //olló pontszáma
      result += Points.get(Shape.SCISSORS) || 0;
      return result;
    }
  }

};


export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  let gameScore = 0;

  gameSet.forEach(turn => {


    //console.log(turn.shape + ", " + turn.outcome + ": " + whichShape(turn.shape, turn.outcome));
    const turnScore = whichShape(turn.shape, turn.outcome) || 0;

    //console.log("Menet: " + turnScore);

    gameScore += turnScore;

  });

  //console.log('Game Score: ' + gameScore);

  return gameScore;
};
