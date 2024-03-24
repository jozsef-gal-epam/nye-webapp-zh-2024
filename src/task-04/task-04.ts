import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  let totalPoints = 0;

  for (const game of gameSet) {

     totalPoints += Points.get(game.shape) || 0;
 

     totalPoints += Points.get(game.outcome) || 0;
  }
 
  return totalPoints;
};
