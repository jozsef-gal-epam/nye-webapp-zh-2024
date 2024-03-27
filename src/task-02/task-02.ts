export interface Item {
  id: number;
  name: string;
}

export const uniqueFilter = (array: Item[]): Item[] => {
  const seen: Set<string> = new Set();
    return array.filter(obj => {
      const serialized: string = JSON.stringify(obj);
      if (seen.has(serialized)) {
        return false;
      }
      
      seen.add(serialized);
      return true;
    })
};
