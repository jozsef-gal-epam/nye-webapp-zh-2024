export interface Item {
  id: number;
  name: string;
}

export const uniqueFilter = (array: Item[]): Item[] => {
  let _tempArray: Item[] = [];

  array.forEach(arrayElement => {
    let n = 0;

    _tempArray.forEach(tempArrayElement => {
      if (arrayElement.id === tempArrayElement.id)
        n++;
    });

    if (1 > n)
      _tempArray.push(arrayElement)

  });

  return _tempArray;
};
