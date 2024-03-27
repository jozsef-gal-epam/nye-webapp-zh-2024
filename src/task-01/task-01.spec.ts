import { arraySum } from './task-01';

const TESTS = [
  {
    input: [1, 2, 5, 9, 42, 12481334, -2412, 6341, -564984],
    output: 11920338,
  },
  {
    input: [5, 6, [3, "9", [[{a: 50}], 2]], NaN],
    output: 16,
  },
  {
    input: ["mofmOuvzS",[[7666,"5"],"qhPK3re",{"wy":"ealN"},false,"Aa6h"],[1146,false,"5GnapAsVE",{"2AdGz":"FFS"}],false,false,[[null,false,[4938,["ah",[[true,4552,["kjOTMJ",true]]],[8224,{"j99aJm":false},"uM",[{"v1TyO":8396},1998]],true],[false,[8824],7981],true],[{"6LEuO":{"OaMX9H3zfH":false}},1831,false,true,"NATjUn1qu"],5367]],"GJ2ljXKlge"],
    output: 52527,
  },
  {
    input: [1846,"fEk83zJ",5710,true,"y5FQh3SEG",true,9540,[[[{"lUvlj":{"vxtk":4334}}],"37P531Sb0F",{"1t4GLi":true},{"SDyv":{"80g2":null}}],[7144,1435]],"ApW"],
    output: 25675,
  },
  {
    input: [[{"aBmC":["ba",{"C1SV7qd8Av":false}]},[{"CNdGE12i9v":true},{"ly3KBF01":{"rWlke":true}},{"a2XZC9fJYM":true},{"PgWnHAyWI":true}],{"X":true},true,true],{"oUsLsrfI":[3399,["sn82qwUGY","KpCqYt","LG",{"WrW7SrwsD":4937}],{"iPujSM":false}]}],
    output: 0,
  },
];

describe.skip('task-01', () => {
  it('should export the arraySum function', () => {
    expect(arraySum).toBeDefined();
    expect(typeof arraySum).toBe('function');
  });

  test.each(TESTS)(
    'should return with the sum of numbers within an array',
    ({ input, output }) => {
      expect(arraySum(input)).toEqual(output);
    }
  );
});
