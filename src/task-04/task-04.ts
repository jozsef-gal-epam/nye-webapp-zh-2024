import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

// Függvény a kő-papír-olló eredményeinek pontszámítására
export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
    let totalPoints = 0;

    // Végigmegyek a játékon
    for (const game of gameSet) {
        // Az eredmény alapján pontokat adok
        switch (game.outcome) {
            case Outcome.DRAW:
                // Döntetlen esetén a döntetlen pontjait és a forma pontjait adom 
                totalPoints += Points.get(Outcome.DRAW) ?? 0;
                totalPoints += Points.get(game.shape) ?? 0;
                break;
            case Outcome.LOOSE:
                // Bukta esetén a bukta pontjait és az ellenfél forma pontjait adjom hozzá
                totalPoints += Points.get(Outcome.LOOSE) ?? 0;
                switch (game.shape) {
                    case Shape.ROCK:
                        totalPoints += Points.get(Shape.SCISSORS) ?? 0;
                        break;
                    case Shape.PAPER:
                        totalPoints += Points.get(Shape.ROCK) ?? 0;
                        break;
                    case Shape.SCISSORS:
                        totalPoints += Points.get(Shape.PAPER) ?? 0;
                        break;
                }
                break;
            case Outcome.WIN:
                // Gyúzelem eset
                totalPoints += Points.get(Outcome.WIN) ?? 0;
                switch (game.shape) {
                    case Shape.ROCK:
                        totalPoints += Points.get(Shape.PAPER) ?? 0;
                        break;
                    case Shape.PAPER:
                        totalPoints += Points.get(Shape.SCISSORS) ?? 0;
                        break;
                    case Shape.SCISSORS:
                        totalPoints += Points.get(Shape.ROCK) ?? 0;
                        break;
                }
                break;
        }
    }

    // Összpontszám
    return totalPoints;
};





//import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';
//export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  //throw new Error('Not implemented');
//};


//2024.04.05-22:36 Eddig fasza
//4 passed, 15 passed