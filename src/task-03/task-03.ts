import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
  let sum = 0;
  games.forEach(element => {
    let blue = 0;
    let red = 0;
    let green = 0;
    element.draws.forEach(draw_element => {
      if (typeof draw_element.blue === "number") {
        if (draw_element.blue > blue) {
          blue = draw_element.blue;
        }
      }
      if (typeof draw_element.green === "number") {
        if (draw_element.green > green) {
          green = draw_element.green;
        }
      }
      if (typeof draw_element.red === "number") {
        if (draw_element.red > red) {
          red = draw_element.red;
        }
      }
    });
    sum += (blue * red * green);
  });
  return sum;
};

console.log(minimalCubeSet([
  {
    id: 1,
    draws: [
      { blue: 3, red: 4 },
      { red: 1, green: 2, blue: 6 },
      { green: 2 },
    ],
  },
  {
    id: 2,
    draws: [
      { blue: 1, green: 2 },
      { green: 3, blue: 4, red: 1 },
      { green: 1, blue: 1 },
    ],
  },
  {
    id: 3,
    draws: [
      { green: 8, blue: 6, red: 20 },
      { blue: 5, red: 4, green: 13 },
      { green: 5, red: 1 },
    ],
  },
  {
    id: 4,
    draws: [
      { green: 1, red: 3, blue: 6 },
      { green: 3, red: 6 },
      { green: 3, blue: 15, red: 14 },
    ],
  },
  {
    id: 5,
    draws: [
      { red: 6, blue: 1, green: 3 },
      { blue: 2, red: 1, green: 2 },
    ],
  },
]));
