import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
  return games.reduce((totalStrength, game) => {
    const maxValues = game.draws.reduce((acc, draw) => {
      return {
        mostRed: Math.max(acc.mostRed, draw.red || 0),
        mostGreen: Math.max(acc.mostGreen, draw.green || 0),
        mostBlue: Math.max(acc.mostBlue, draw.blue || 0)
      };
    }, { mostRed: 0, mostGreen: 0, mostBlue: 0 });

    return totalStrength + maxValues.mostGreen * maxValues.mostBlue * maxValues.mostRed;
  }, 0);
};
