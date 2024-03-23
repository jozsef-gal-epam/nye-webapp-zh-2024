import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
  return games.reduce((Sum, game) => {
    
    let maxR = 0, maxG = 0, maxB = 0;

    game.draws.forEach(draw => {
      
      if (draw.blue && draw.blue > maxB) maxB = draw.blue;
      if (draw.red && draw.red > maxR) maxR = draw.red;
      if (draw.green && draw.green > maxG) maxG = draw.green;
    });

  
    const amount = maxB* maxR * maxG  ;

    
    return Sum + amount;
  }, 0); 
};