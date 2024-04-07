import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
  let totalScore = 0;

  games.forEach(game => {
    let red = 0, green = 0, blue = 0;

    game.draws.forEach((draw) => {
    red = draw.red && draw.red > red ? draw.red : red;
    green = draw.green && draw.green > green ? draw.green : green;
    blue = draw.blue && draw.blue > blue ? draw.blue : blue;
    });

    totalScore += (red * green * blue);
  });

  return totalScore;
};
