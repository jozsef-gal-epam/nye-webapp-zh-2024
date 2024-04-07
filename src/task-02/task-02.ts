export interface Item {
  id: number;
  name: string;
}

export const uniqueFilter = (array: Item[]): Item[] => {
  const seenIds: Set<number> = new Set();
  const uniqueItems: Item[] = [];

  for (const item of array) {
    if (!seenIds.has(item.id)) {
      seenIds.add(item.id);
      uniqueItems.push(item);
    }
  }

  return uniqueItems;
};
