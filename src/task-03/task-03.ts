import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
  let result = 0;

  games.forEach(game => {
    let maxRed = 0;
    let maxGreen = 0;
    let maxBlue = 0;

    game.draws.forEach(draw => {
      if (draw.red !== undefined && draw.red > maxRed) {
        maxRed = draw.red;
      }
      if (draw.green !== undefined && draw.green > maxGreen) {
        maxGreen = draw.green;
      }
      if (draw.blue !== undefined && draw.blue > maxBlue) {
        maxBlue = draw.blue;
      }
    });

    result += maxRed * maxGreen * maxBlue;
  });

  return result;
};
