import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
    if (!Array.isArray(games) || games.length === 0) {
        return 0;
    }

    const totalStrength = games.reduce((total, game) => {
        const gameStrength = game.draws.reduce((strength, draw) => {
            const minRed = draw.red ?? 0;
            const minGreen = draw.green ?? 0;
            const minBlue = draw.blue ?? 0;
            const drawStrength = minRed * minGreen * minBlue;

            return strength + drawStrength;
    }, 0); 
        return total + gameStrength;
    }, 0);
    return totalStrength;
};
