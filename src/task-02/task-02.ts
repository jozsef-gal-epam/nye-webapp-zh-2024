export interface Item {
  id: number;
  name: string;
}

export const uniqueFilter = (array: Item[]): Item[] => {
  return array.filter((item, index, self) =>
  index === self.findIndex((t) => (
    t.id === item.id && t.name === item.name
  ))
);
};
