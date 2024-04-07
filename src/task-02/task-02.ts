export interface Item {
  id: number;
  name: string;
}

export const uniqueFilter = (array: Item[]): Item[] => {
  const uniqueItemsMap = new Map<number, Item>();

  for (const item of array) {
    if (!uniqueItemsMap.has(item.id)) {
      uniqueItemsMap.set(item.id, item);
    }
  }

  return Array.from(uniqueItemsMap.values());
};
