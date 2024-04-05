import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
  const minCounts: Draw = {
    red: Infinity,
    green: Infinity,
    blue: Infinity
  };

  // Meghatározzuk a legkisebb darabszámot minden színből
  games.forEach(game => {
    game.draws.forEach((draw) => {
      Object.entries(draw).forEach(([color, count]) => {
        if (count! < minCounts[color as keyof Draw]!) {
          minCounts[color as keyof Draw] = count!;
        }
      });
    });
  });

  // Számoljuk ki az egyes játékok erejét és adjuk össze őket
  const totalStrength = games.reduce((acc, game) => {
    const strength = game.draws.reduce((product, draw) => {
      const drawStrength = Object.entries(draw).reduce((min, [color, count]) => Math.min(min, minCounts[color as keyof Draw]!), Infinity);
      return product * drawStrength;
    }, 1);
    return acc + strength;
  }, 0);

  return totalStrength;
};