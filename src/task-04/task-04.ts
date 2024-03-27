import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  //throw new Error('Not implemented');

  let point = 0;
  
  for (let i=0; i<gameSet.length; i++)
  {
    if(gameSet[i].outcome == Outcome.DRAW)
    {
      point += 3;
      if(gameSet[i].shape == Shape.ROCK)
      {
        point++;
      }
      else
      {
        if(gameSet[i].shape == Shape.PAPER)
        {
          point+=2;
        }
        else
        {
          if(gameSet[i].shape == Shape.SCISSORS)
          {
            point+=3;
          }
        }
      }
    }
    else
    {
      if(gameSet[i].outcome == Outcome.LOOSE)
      {
        if(gameSet[i].shape == Shape.ROCK)
        {
          point+=3;
        }
        else
        {
          if(gameSet[i].shape == Shape.PAPER)
          {
            point++;
          }
          else
          {
            if(gameSet[i].shape == Shape.SCISSORS)
            {
              point+=2;
            }
          }
        }
      }
      else
      {
        if(gameSet[i].outcome == Outcome.WIN)
        {
          point+=6
          if(gameSet[i].shape == Shape.ROCK)
          {
            point+=2;
          }
          else
          {
            if(gameSet[i].shape == Shape.PAPER)
            {
              point+=3;
            }
            else
            {
              if(gameSet[i].shape == Shape.SCISSORS)
              {
                point++;
              }
            }
          }
        }
      }
    }
  }

  return point;
};
