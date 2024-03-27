import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
  if (!Array.isArray(games) || games.length === 0) {
    return 0;
  }

  const receivedGame = games.map((game) => {
    const colorsMax = { red: 0, green: 0, blue: 0 };
    game.draws.forEach((draw) => {
      colorsMax.red = Math.max(colorsMax.red, draw.red ?? 0);
      colorsMax.green = Math.max(colorsMax.green, draw.green ?? 0);
      colorsMax.blue = Math.max(colorsMax.blue, draw.blue ?? 0);
    });
    const multipResult = colorsMax.red * colorsMax.green * colorsMax.blue;
  
    return multipResult;
  });


  return receivedGame.reduce((total, item) => total + item, 0);
};
