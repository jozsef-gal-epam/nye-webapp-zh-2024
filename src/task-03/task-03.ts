import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
  return games.reduce((totalStrength, game) => {
    const gameStrength = game.draws.reduce((drawTotal, draw) => {
      const { red = 0, green = 0, blue = 0 } = draw;
      const drawStrength = red * green * blue;
      return drawTotal + drawStrength;
    }, 0);
    return totalStrength + gameStrength;
  }, 0);
};
