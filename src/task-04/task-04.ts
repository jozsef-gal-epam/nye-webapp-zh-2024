import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  let totalPoints = 0;

  // Minden egyes játékmeneten végigmegyünk
  for (const round of gameSet) {
    if (round.outcome === Outcome.WIN) {
      totalPoints += Points.get(round.outcome)!
      if (round.shape === Shape.ROCK) {
        totalPoints += Points.get(Shape.PAPER)!; //if they have a rock, we win with a paper
      } else
      if(round.shape === Shape.PAPER) {
        totalPoints += Points.get(Shape.SCISSORS)!; //if they have a paper, we win with scissors
      }else{
        totalPoints += Points.get(Shape.ROCK)!;  //if they have scissors, we win with a ROCK
      }
    }else
    if(round.outcome === Outcome.LOOSE){
      totalPoints += Points.get(round.outcome)!
      if (round.shape === Shape.ROCK) {
        totalPoints += Points.get(Shape.SCISSORS)!;  //if they have rock, we loose with scissors
      } else
      if(round.shape === Shape.PAPER) {
        totalPoints += Points.get(Shape.ROCK)!;     //if they have paper, we loose with rock
      }else{
        totalPoints += Points.get(Shape.PAPER)!;    //if they have scissors, we loose with paper
      }
    }else{
      totalPoints += Points.get(round.outcome)!
      if (round.shape === Shape.ROCK) {
        //if they have rock, we draw with the rock // or i could've done that (if they have rock, we draw with the same)--> totalPoints += Points.get(round.shape)!;
        totalPoints += Points.get(Shape.ROCK)!;
      } else
      if(round.shape === Shape.PAPER) {
        totalPoints += Points.get(Shape.PAPER)!;
      }else{
        totalPoints += Points.get(Shape.SCISSORS)!;
      }
    }
  }
  return totalPoints;


  /*
  kisegítő táblázat:
  [Shape.ROCK, 1],        loose: 3  win: 2   draw: 1
  [Shape.PAPER, 2],       loose: 1  win: 3   draw: 2
  [Shape.SCISSORS, 3],    loose: 2  win: 1   draw: 3
  */
};
