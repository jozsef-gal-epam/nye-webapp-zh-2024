export interface Item {
  id: number;
  name: string;
}

export const uniqueFilter = (array: Item[]): Item[] => {
  const receivedItems :Item[] = [];
  
  array.forEach((item) => {
    if (!(receivedItems.some((givenItem) => givenItem.id === item.id))) {
      receivedItems.push(item);
    }
  });

  return receivedItems;

};
