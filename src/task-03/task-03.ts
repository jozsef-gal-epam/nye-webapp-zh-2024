import { Game, Draw } from './models';

export const minimalCubeSet = (games: Game[]): number => {
    if (!Array.isArray(games) || games.length === 0) {
        return 0;
    }

    return games.reduce((totalStrength, game) => {
        const gameStrength = game.draws.reduce((drawStrength, draw) => {
            const { red = 0, green = 0, blue = 0 } = draw;
            const minDrawValue = Math.min(red, green, blue);
            return drawStrength * minDrawValue;
        }, 1);
        return totalStrength + gameStrength;
    }, 0);
};

