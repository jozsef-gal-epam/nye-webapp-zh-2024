import { Game, Draw } from './models';

export const minimalCubeSet = (games: Game[]): number => {
  const getMaximumCounts = (draws: Partial<Draw>[]): { [color: string]: number } => {
    const maximumCounts: { [color: string]: number } = {};

    for (const draw of draws) {
      for (const [color, count] of Object.entries(draw)) {
        if (!(color in maximumCounts) || (typeof count === 'number' && count! > maximumCounts[color])) {
          maximumCounts[color] = count!;
        }
      }
    }

    return maximumCounts;
  };


  let totalStrength = 0;
  for (const game of games) {
    let drawStrength = 1;
    const maximumCounts = getMaximumCounts(game.draws);
    for (const count of Object.values(maximumCounts)) {
      drawStrength *= count;
    }
    totalStrength += drawStrength;
  }

  return totalStrength;
};