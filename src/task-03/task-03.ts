import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
  let totalStrength = 0;

  for (const game of games) {
    let gameStrength = 1; 

    for (const draw of game.draws) {
      let minDrawValue = Infinity; 

      for (const value of Object.values(draw)) {
        if (value < minDrawValue) {
          minDrawValue = value; 
        }
      }

      gameStrength *= minDrawValue; 
    }

    totalStrength += gameStrength; 
  }

  return totalStrength;
};