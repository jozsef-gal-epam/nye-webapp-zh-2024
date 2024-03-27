import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
  const calculateGameStrength = (draws: Partial<Draw>[]): number => {
    return draws.reduce((acc, draw) => {
      const minRed = draw.red || 0;
      const minGreen = draw.green || 0;
      const minBlue = draw.blue || 0;

      return acc + minRed * minGreen * minBlue;
    }, 1); 
  };

  return games.reduce((totalStrength, game) => {
    const fullDraws: Draw[] = game.draws.map(draw => ({
      red: draw.red || 0,
      green: draw.green || 0,
      blue: draw.blue || 0
    }));
    const gameStrength = calculateGameStrength(fullDraws);
    return totalStrength + gameStrength;
  }, 0);
};
