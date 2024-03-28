export interface Item {
  id: number;
  name: string;
}

export const uniqueFilter = (array: Item[]): Item[] => {
const uniqueItemsMap = new Map<number, Item>();
array.forEach((item) => {
  if (!uniqueItemsMap.has(item.id)) {
    uniqueItemsMap.set(item.id, item);
  }
});
const uniqueItemsArray = Array.from(uniqueItemsMap.values());

return uniqueItemsArray;
};
