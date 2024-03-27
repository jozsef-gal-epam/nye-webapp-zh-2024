export interface Item {
  id: number;
  name: string;
}

export const uniqueFilter = (array: Item[]): Item[] => {
  const filteredArray: Item[] = [];
  
  for (let i = 0; i < array.length; i++) {
    let exists = false;
    for (let j = 0; j < filteredArray.length; j++) {
      if (filteredArray[j].id === array[i].id) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      filteredArray.push(array[i]);
    }
  }

  return filteredArray;
};