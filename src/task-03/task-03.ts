type Draw = {
  red?: number;
  green?: number;
  blue?: number;
};

type Game = {
  id: number;
  draws: Draw[];
};

export const minimalCubeSet = (games: Game[]): number => {
  return games.reduce((totalStrength, game) => {
    const maxCubes = { red: 0, green: 0, blue: 0 };

    game.draws.forEach(draw => {
      Object.entries(draw).forEach(([color, number]) => {
        if (number! > maxCubes[color as keyof Draw]) {
          maxCubes[color as keyof Draw] = number!;
        }
      });
    });

    const gameStrength = Object.values(maxCubes).reduce((acc, val) => acc * val, 1);
    return totalStrength + gameStrength;
  }, 0);
};

export { Draw, Game };
