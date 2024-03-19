import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  const determineShapeBasedOnOutcome = (gameOutcome: Outcome, opponentShape: Shape): Shape => {
    const winningShapeMap: Record<Shape, Shape> = {
      [Shape.ROCK]: Shape.PAPER,
      [Shape.PAPER]: Shape.SCISSORS,
      [Shape.SCISSORS]: Shape.ROCK,
    };

    if (gameOutcome === Outcome.WIN) {
      return winningShapeMap[opponentShape];
    } else if (gameOutcome === Outcome.LOOSE) {
      // Inverting the mapping for the losing scenario
      const invertMapping = (shapeMap: Record<Shape, Shape>): Record<Shape, Shape> =>
        Object.keys(shapeMap).reduce((acc, currentShape) => {
          const mappedShape = shapeMap[currentShape as keyof typeof shapeMap];
          acc[mappedShape] = currentShape as Shape;
          return acc;
        }, {} as Record<Shape, Shape>);

      return invertMapping(winningShapeMap)[opponentShape];
    } else {
      // In case of a draw, maintain the same shape
      return opponentShape;
    }
  };

  return gameSet.reduce((accumulatedPoints, currentGame) => {
    const chosenShape = determineShapeBasedOnOutcome(currentGame.outcome, currentGame.shape);
    return accumulatedPoints + (Points.get(chosenShape) ?? 0) + (Points.get(currentGame.outcome) ?? 0);
  }, 0);
};
