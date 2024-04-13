import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => 
  {
    const calculateStrength = (games: Game[]): number => 
    {
      return games.reduce((totalStrength, game) => 
        {
        const gameStrength = game.draws.reduce((strength, draw) => 
          {
            let minRed = Infinity;
            let minGreen = Infinity;
            let minBlue = Infinity;
  
              for (const colour in draw) 
                {
                  if (['red', 'green', 'blue'].includes(colour))
                    {
                    if (colour === 'red') 
                      {
                        minRed = Math.min(minRed, draw[colour]);
                      }  
                    else if (colour === 'green') 
                      {
                        minGreen = Math.min(minGreen, draw[colour]);
                      }  
                    else if (colour === 'blue') 
                      {
                        minBlue = Math.min(minBlue, draw[colour]);
                      } 
                    }
                }
  
              return strength * minRed * minGreen * minBlue;
          }, 1);
  
        return totalStrength + gameStrength;
      }, 0);
    }
  
    return calculateStrength(games); 
  }
