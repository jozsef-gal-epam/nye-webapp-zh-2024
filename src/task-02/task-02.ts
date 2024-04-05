export interface Item {
  id: number;
  name: string;
}

export const uniqueFilter = (array: Item[]): Item[] => {
  const uniqueMap: Map<number, Item> = new Map();

  // Iterate through the input array
  array.forEach(item => {
    // Use the 'id' property as the key in the map
    // Only add the item to the map if its 'id' is not already present
    if (!uniqueMap.has(item.id)) {
      uniqueMap.set(item.id, item);
    }
  });

  // Convert the map back to an array of items
  return Array.from(uniqueMap.values());
};
