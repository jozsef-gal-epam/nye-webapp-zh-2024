import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
  //throw new Error('Not implemented');
  if (!Array.isArray(games) || games.length === 0) {
    return 0;
  }

    const gameStrengths = games.map((game) => {
        let maxRed = 0, maxGreen = 0, maxBlue = 0;

        game.draws.forEach((draw) => {
      maxRed = Math.max(maxRed, draw.red ?? 0);
      maxGreen = Math.max(maxGreen, draw.green ?? 0);
      maxBlue = Math.max(maxBlue, draw.blue ?? 0);
    });

       return maxRed * maxGreen * maxBlue;
  });

   return gameStrengths.reduce((total, strength) => total + strength, 0);
};
