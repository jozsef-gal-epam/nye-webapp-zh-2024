export interface Item {
  id: number;
  name: string;
}

export const uniqueFilter = (array: Item[]): Item[] => {
  const idSet = new Set<number>();
  const output: Item[] = []
  array.forEach(element=>{
    if(!idSet.has(element.id)){
        output.push(element)
        idSet.add(element.id)
    }

    
  })

  return output;
};

console.log(
  uniqueFilter([
    { id: 1, name: 'a' },
    { id: 2, name: 'b' },
    { id: 4, name: 'c' },
    { id: 5, name: 'd' },
    { id: 4, name: 'c' },
    { id: 2, name: 'b' },
    { id: 6, name: 'e' },
  ])
);
