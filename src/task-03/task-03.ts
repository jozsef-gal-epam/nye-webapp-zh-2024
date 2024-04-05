import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
  // Hibakezelés: ha nincs játék vagy a játékok üres a tömb
  if (!Array.isArray(games) || games.length === 0) {
    return 0;
  }

  // Az egyes játékok erősségét tároló tömb inicializálása(azt sem tudtam, hogy ismerem ezt a szót#Memolife#)
  const gameStrengths: number[] = [];

  // Minden játékra végrehajom az Erősség számítását
  games.forEach((game) => {
    let maxRed = 0,
      maxGreen = 0,
      maxBlue = 0;

    // Minden markolásra a játékban kiszámítom a maximális számú kockát minden színhez
    game.draws.forEach((draw) => {
      maxRed = Math.max(maxRed, draw.red ?? 0);
      maxGreen = Math.max(maxGreen, draw.green ?? 0);
      maxBlue = Math.max(maxBlue, draw.blue ?? 0);
    });

    // A játék erősségét hozzáadjuk a gameStrengths tömbhöz/haz/hez/val/vel
    gameStrengths.push(maxRed * maxGreen * maxBlue);
  });

  // Visszatérek a játékok erősségeinek összegével
  return gameStrengths.reduce((total, strength) => total + strength, 0);
};


//Start....
//import { Draw, Game } from './models';
//export const minimalCubeSet = (games: Game[]): number => {
// throw new Error('Not implemented');