export interface Item {
  id: number;
  name: string;
}
//Valamit itt kínlódik, de mi a f@#XĐđ?---->jó lett,
export const uniqueFilter = (array: Item[]): Item[] => {
  const uniqueMap = new Map<number, Item>();

  // Bejárom a tömböt és feltöltöm a mapbaaaa...
  array.forEach(item => {
    // Ha még nem létezik az azonosítóval a Map-ban/ben, hozzáadja(ha létezik nem kell, oszt csá)
    if (!uniqueMap.has(item.id)) {
      uniqueMap.set(item.id, item);
    }
  });

  // A Map értékeinek visszaadása egyedi elemek listájaként(#jajj de szép mondat, így este#)
  return Array.from(uniqueMap.values());
};