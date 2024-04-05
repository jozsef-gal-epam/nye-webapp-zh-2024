import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  let totalPoints = 0;
  let pointsForShape = 0;
  let pointsForOutcome = 0;
  gameSet.forEach(game => {
    const { shape, outcome } = game;

    switch (Points.get(outcome)) {
        case (0):  { //lose
            pointsForOutcome = 0;
            if(Points.get(shape) === 1){
                pointsForShape = 3;
            }
            if(Points.get(shape) === 2){
                pointsForShape = 1;
            }
            if(Points.get(shape) === 3){
                pointsForShape = 2;
            }
            break;
        }
        case (3): { //draw
            pointsForOutcome = 3;
            pointsForShape = Points.get(shape) || 0;
            break;
        }
        case (6): { //win
            pointsForOutcome = 6;
            if(Points.get(shape) === 1){
                pointsForShape = 2;
            }
            if(Points.get(shape) === 2){
                pointsForShape = 3;
            }
            if(Points.get(shape) === 3){
                pointsForShape = 1;
            }
            break;
        }
            
    }  
    totalPoints += pointsForShape + pointsForOutcome;
  });

  return totalPoints;
};

