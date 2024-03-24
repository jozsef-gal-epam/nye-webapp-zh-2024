export interface Item {
  id: number;
  name: string;
}

export const uniqueFilter = (array: Item[]): Item[] => {
  const uniqueItems: Item[] = [];

  array.forEach(item => {
    if (!uniqueItems.some(uniqueItem => uniqueItem.id === item.id)) {
      uniqueItems.push(item);
    }
  });

  return uniqueItems;
};
