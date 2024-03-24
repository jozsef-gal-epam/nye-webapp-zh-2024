export interface Item {
  id: number;
  name: string;
}

export const uniqueFilter = (array: Item[]): Item[] => {
  //throw new Error('Not implemented');

  let out : Item[] = [];
  let temp = true;
  out.push(array[0]);
  for(let i=0; i<array.length; i++)
  {
    temp = true;
    for(let j=0; j<out.length; j++)
    {
      if(out[j].id == array[i].id)
      {
        temp = false;
      }
    }
    if(temp)
    {
      out.push(array[i]);
    }
  }
  return out;
};
