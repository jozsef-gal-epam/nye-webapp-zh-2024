import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
  const calculateMinimalCubes = (draws: { [key: string]: number }[]): number => {
    let minimalCubes: { [key: string]: number } = {};

    for (const draw of draws) {
      for (const color in draw) {
        minimalCubes[color] = Math.max(minimalCubes[color] || 0, draw[color]);
      }
    }

    return Object.values(minimalCubes).reduce((acc, curr) => acc * curr, 1);
  };

  const totalStrength = games.reduce((acc, game) => 
    acc + calculateMinimalCubes(game.draws), 0);

  return totalStrength;
};
