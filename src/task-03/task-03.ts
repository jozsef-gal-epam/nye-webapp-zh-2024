import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
  //throw new Error('Not implemented');
 
  let out = 0;
  let red = 1;
  let green = 1;
  let blue = 1;
  let temp : any = 0;

  for (let i=0; i<games.length; i++)
  {
    red = 1;
    green = 1;
    blue = 1;
    for(let j=0; j<games[i].draws.length; j++)
    {
      temp = games[i].draws[j].red? games[i].draws[j].red : 1;
      if(temp>red)
      {
        red=temp;
      }
      temp = games[i].draws[j].green? games[i].draws[j].green : 1;
      if(temp>green)
      {
        green=temp;
      }
      temp = games[i].draws[j].blue? games[i].draws[j].blue : 1;
      if(temp>blue)
      {
        blue=temp;
      }
    }
    out += (red*green*blue);
  }

  return out
};
