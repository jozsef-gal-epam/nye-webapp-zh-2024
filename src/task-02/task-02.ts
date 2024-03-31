export interface Item {
  id: number;
  name: string;
}

export const uniqueFilter = (array: Item[]): Item[] => {
  //throw new Error('Not implemented');
  const uniqueMap = array.reduce((map, item) => {
    if (!map.has(item.id)) {
      map.set(item.id, item);
    }
    return map;
  }, new Map<number, Item>());

  return Array.from(uniqueMap.values());
};
