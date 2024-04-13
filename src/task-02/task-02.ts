export interface Item 
{
  id: number;
  name: string;
}

export const uniqueFilter = (array: Item[]): Item[] => 
{
  function uniqueItems(input: Item[]): Item[] 
  {
    const uniqueItems: Item[] = [];
    const checkedIds: { [key: number]: boolean } = {};

    for (const item of input) 
    {
        if (!checkedIds[item.id]) 
          {
            checkedIds[item.id] = true;
            uniqueItems.push(item);
          }
    }
    return uniqueItems;
  }
  return uniqueItems(array);
}
