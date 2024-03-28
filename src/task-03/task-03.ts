import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
  let result = 0;

  games.forEach((game) => {
    let maxRed = 0;
    let maxGreen = 0;
    let maxBlue = 0;
  
    game.draws.forEach((draw) => {
      maxRed = Math.max(maxRed, draw.red || 0); 
      maxGreen = Math.max(maxGreen, draw.green || 0);
      maxBlue = Math.max(maxBlue, draw.blue || 0);
    });
  
    result += maxRed * maxGreen * maxBlue;
  });
  
  return result;
};
