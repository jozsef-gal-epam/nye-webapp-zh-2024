import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => 
  {
    enum Outcome 
    {
        WIN = "win",
        LOSE = "lose",
        DRAW = "draw",
    }

    enum Shape 
    {
        ROCK = "rock",
        PAPER = "paper",
        SCISSORS = "scissor",
    }

    const pointsMap: Map<Shape | Outcome, number> = new Map(Array.from([[Shape.ROCK, 1], [Shape.PAPER, 2], [Shape.SCISSORS, 3], [Outcome.WIN, 6], [Outcome.DRAW, 3], [Outcome.LOSE, 0]]));

    interface GameResult 
    {
        shape: Shape;
        outcome: Outcome;
    }

    function calculatePoints(games: GameResult[]): number 
    {
        let totalPoints = 0;
        for (const game of games) 
          {
            const shapePoints = pointsMap.get(game.shape) || 0;
            const outcomePoints = pointsMap.get(game.outcome) || 0;
            totalPoints += shapePoints + outcomePoints;
          }
        return totalPoints;
    }

    return calculatePoints(gameSet);
  }
