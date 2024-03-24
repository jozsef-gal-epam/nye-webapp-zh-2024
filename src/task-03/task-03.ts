import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
  let totalStrength = 0;

  for (const game of games) {
     let minRed = Infinity;
     let minGreen = Infinity;
     let minBlue = Infinity;
 
     for (const draw of game.draws) {
       if (draw.red !== undefined) minRed = Math.min(minRed, draw.red);
       if (draw.green !== undefined) minGreen = Math.min(minGreen, draw.green);
       if (draw.blue !== undefined) minBlue = Math.min(minBlue, draw.blue);
     }
 
     const gameStrength = minRed * minGreen * minBlue;
     totalStrength += gameStrength;
  }

  return totalStrength;
};
