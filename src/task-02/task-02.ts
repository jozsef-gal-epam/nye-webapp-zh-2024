
interface Item {
  id: number;
  name: string;
}

function uniqueFilter(items: Item[]): Item[] {
  
  const uniqueItems = new Map<number, Item>();

  
  for (const item of items) {
    
    if (!uniqueItems.has(item.id)) {
      uniqueItems.set(item.id, item);
    }
  }

 
  return Array.from(uniqueItems.values());
}


export { Item, uniqueFilter };
