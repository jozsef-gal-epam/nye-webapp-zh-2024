export interface Item {
  id: number;
  name: string;
}

export const uniqueFilter = (array: Item[]): Item[] => {
  const uniqueArray: Item[] = [];
  
    for (const item of array) {
      let isUnique = true;
      for (const uniqueItem of uniqueArray) {
        if (item.id === uniqueItem.id) {
          isUnique = false;
          break;
        }
      }
      if (isUnique) {
        uniqueArray.push(item);
      }
    }
  
    return uniqueArray;
};
