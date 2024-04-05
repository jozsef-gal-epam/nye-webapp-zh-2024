export interface Item {
  id: number;
  name: string;
}

export const uniqueFilter = (array: Item[]): Item[] => {
  const uniqueMap = new Map<string, Item>();

  array.forEach(obj => {
    const key = `${obj.id}:${obj.name}`;
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, obj);
    }
  });

  const uniqueArray: Item[] = Array.from(uniqueMap.values());

  // Check if there are more than 5 unique items, if so, return only the first 5
  if (uniqueArray.length > 5) {
    return uniqueArray.slice(0, 5);
  }

  return uniqueArray;
};
