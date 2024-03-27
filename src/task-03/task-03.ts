import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
    let total = 0;

  for(const i of games) {
    let red = 0;
    let green = 0;
    let blue = 0;

    for(const j of i.draws) {
        red = Math.max(red, j.red??0);
        green = Math.max(green, j.green??0);
        blue = Math.max(blue, j.blue??0);
    }
    
    total += red*green*blue; 
  }

  return total;
};