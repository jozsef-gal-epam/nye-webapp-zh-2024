export interface Item {
  id: number;
  name: string;
}

export const uniqueFilter = (array: Item[]): Item[] => {
  const uniqueMap: Map<number, Item> = new Map();

  array.forEach(item => {
    if (!uniqueMap.has(item.id)) {
      uniqueMap.set(item.id, item);
    }
  });
  return Array.from(uniqueMap.values());
};

