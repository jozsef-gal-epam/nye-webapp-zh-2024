import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
  return games.reduce((total, game) => {
    const minCubes = game.draws.reduce((min, draw) => {
      return {
        red: Math.max(min.red || 0, draw.red || 0),
        green: Math.max(min.green || 0, draw.green || 0),
        blue: Math.max(min.blue || 0, draw.blue || 0),
      };
    }, {red: 0, green: 0, blue: 0});
    return total + (minCubes.red || 0) * (minCubes.green || 0) * (minCubes.blue || 0);
  }, 0);
};
