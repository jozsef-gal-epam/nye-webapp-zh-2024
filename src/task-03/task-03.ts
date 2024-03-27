import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
  let totalSum = 0;

  for (const game of games) {
    // Azonos játékon belüli minimális kockabeállítás
    let idSum = 1;

    // Tárolja az egyes színek maximális értékeit az adott játékban
    const colorMaxValues: Record<string, number> = {};
    for (const draw of game.draws) {

      // Végigiterál a húzás színeken és értékein
      for (const [color, value] of Object.entries(draw)) {
        colorMaxValues[color] = Math.max(colorMaxValues[color] ?? 0, value);
      }
    }

    for (const [color, maxValue] of Object.entries(colorMaxValues)) {
      idSum *= maxValue;
    }
    totalSum += idSum;
  }

  return totalSum;
};
