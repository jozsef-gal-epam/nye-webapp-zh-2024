import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
  let totalStrength = 0;

  for (let i = 0; i < games.length; i++) {
    const game = games[i];

    let mostRed = 0;
    let mostGreen = 0;
    let mostBlue = 0;

    for (let j = 0; j < game.draws.length; j++) {
      const draw = game.draws[j];

      if (draw.blue !== undefined && draw.blue > mostBlue) {
        mostBlue = draw.blue;
      }
      if (draw.red !== undefined && draw.red > mostRed) {
        mostRed = draw.red;
      }
      if (draw.green !== undefined && draw.green > mostGreen) {
        mostGreen = draw.green;
      }
    }

    totalStrength += mostGreen * mostBlue * mostRed;
  }

  return totalStrength;
};
