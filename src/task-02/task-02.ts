export interface Item {
  id: number;
  name: string;
}

export const uniqueFilter = (array: Item[]): Item[] => {
  const uniqueItems: Item[] = [];
  const uniqueIds = new Set<number>();
  const uniqueNames = new Set<string>();

  for (const item of array) {
    if (!uniqueIds.has(item.id) && !uniqueNames.has(item.name)) {
      uniqueItems.push(item);
      uniqueIds.add(item.id);
      uniqueNames.add(item.name);
    }
  }

  return uniqueItems;
};