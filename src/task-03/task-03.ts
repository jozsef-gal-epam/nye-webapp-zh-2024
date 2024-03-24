import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
  return games.reduce((totalStrength, game) => {
    const gameStrength = game.draws.reduce((drawTotal, draw) => {
      const redCount = draw.red || 0;
      const greenCount = draw.green || 0;
      const blueCount = draw.blue || 0;
      const drawStrength = redCount * greenCount * blueCount;
      return drawTotal + drawStrength;
    }, 0);
    return totalStrength + gameStrength;
  }, 0);
};
