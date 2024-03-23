import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
  let s = 0;

  games.forEach(game => {
    let red = 0, green = 0, blue = 0;

    game.draws.forEach(draw => {
      if (draw.red)
        if (draw.red > red) red = draw.red

      if (draw.green)
        if (draw.green > green) green = draw.green

      if (draw.blue)
        if (draw.blue > blue) blue = draw.blue
    });

    s += (red * green * blue);
  });


  return s;
};
