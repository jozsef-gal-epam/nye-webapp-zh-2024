export interface Item {
  id: number;
  name: string;
}

export const uniqueFilter = (array: Item[]): Item[] => {
  const uniqueArr: Item[] = [];
  const encData: { [key: number]: boolean } = {};

  for (const item of array) {
    if (!encData[item.id]) {
      uniqueArr.push(item);
      encData[item.id] = true;
    }
  }

  return uniqueArr;
      

};


//KÉSZ