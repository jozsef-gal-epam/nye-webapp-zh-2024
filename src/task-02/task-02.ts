export interface Item {
  id: number;
  name: string;
}

export const uniqueFilter = (array: Item[]): Item[] => {
  const uniqueArray: Item[] = [];

  array.forEach(item => {
    if (!uniqueArray.some(uniqueItem => uniqueItem.id === item.id)) {
      uniqueArray.push(item);
    }
  });

  return uniqueArray;
};
