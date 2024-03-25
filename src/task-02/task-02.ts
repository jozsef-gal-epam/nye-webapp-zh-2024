export interface Item {
  id: number;
  name: string;
}

export const uniqueFilter = (array: Item[]): Item[] => {
  // Üres tömb létrehozása az egyedi elemek tárolására
  const uniqueItems: Item[] = [];

  // Egyedi elemek kiválasztása az input tömbből
  array.forEach((item) => {
    // Ellenőrizzük, hogy az elem már szerepel-e az egyedi elemek tömbjében
    if (!uniqueItems.some((uniqueItem) => uniqueItem.id === item.id)) {
      // Ha az elem még nem szerepel az egyedi elemek tömbjében, akkor adjuk hozzá
      uniqueItems.push(item);
    }
  });

  // Visszatérés az egyedi elemek tömbjével
  return uniqueItems;
};
