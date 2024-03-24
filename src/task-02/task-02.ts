export interface Item {
  id: number;
  name: string;
}

export function uniqueFilter(items: Item[]): Item[] {
  const uniqueItems: Item[] = [];
  const seenIds: { [key: number]: boolean } = {};

  for (const item of items) {
      if (!seenIds[item.id]) {
          uniqueItems.push(item);
          seenIds[item.id] = true;
      }
  }

  return uniqueItems;
}
