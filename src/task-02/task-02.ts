export interface Item {
  id: number;
  name: string;
}

export const uniqueFilter = (array: Item[]): Item[] => {
  const uniqueObjects: Item[] = [];
    const ids = new Set();
    
    array.forEach(obj => {

        if (!ids.has(obj.id)) {

            uniqueObjects.push(obj);

            ids.add(obj.id);
        }
    });
    
    return uniqueObjects;
};
