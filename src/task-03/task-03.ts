import { Draw, Game } from './models';
export const minimalCubeSet = (games: Game[]): number => {
  let totalPower = 0;
  for (const game of games) {
      let gamePower = 1;
      const redn: number[] = []; 
      const bluen: number[] = [];
      const greenn: number[] = []; 
      for (const draw of game.draws) {
          let drawPower = 1; 
          for (const color of ['red', 'green', 'blue'] as const) {
              if (color === 'red') {
                  redn.push(draw[color] ?? 0);
              }
              if (color === 'blue') {
                      bluen.push(draw[color] ?? 0);          
              }
              if (color === 'green') {
                      greenn.push(draw[color] ?? 0);   
              }
          }
      }
      gamePower = Math.max(...redn) * Math.max(...bluen) * Math.max(...greenn);
      totalPower=totalPower+gamePower;
  }
  return totalPower;
};