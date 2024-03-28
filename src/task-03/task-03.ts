import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
  return games.reduce((GameResults, game) => {
    const MaximumValues = {
      red: Math.max(...game.draws.map(draw => draw.red ?? 0)),
      green: Math.max(...game.draws.map(draw => draw.green ?? 0)),
      blue: Math.max(...game.draws.map(draw => draw.blue ?? 0))
    };
    return GameResults + MaximumValues.red * MaximumValues.green * MaximumValues.blue;
  }, 0);
};
