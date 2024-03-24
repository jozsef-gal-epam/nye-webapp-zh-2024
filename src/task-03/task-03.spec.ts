import { readFileSync } from 'fs';
import { resolve } from 'path';
import { minimalCubeSet } from './task-03';
import { Game } from './models';

describe.skip('task-03', () => {
  const parseLine = (line: string): Game => {
    const [name, ...sets] = line.split(/[:;]/i);
    const draws = sets.map((set) => set.trim().split(', ')).map((game) => game.reduce((draw, cube) => {
      const [num, color] = cube.split(/\s/i, 2);
      return {
        ...draw,
        [color]: parseInt(num, 10),
      };
    }, { blue: 0, red: 0, green: 0 }));
    return {
      id: parseInt(name.replace('Game ', ''), 10),
      draws,
    };
  };

  const largeTest = readFileSync(resolve(__dirname, './task-03.txt'), 'utf8').split(/\n/ig).map(parseLine);

  interface TestCase {
    input: Game[];
    output: number;
  };
  const TEST_CASES: TestCase[] = [
    {
      input: [
        { id: 1, draws: [{ blue: 3, red: 4 }, { red: 1, green: 2, blue: 6 }, { green: 2 }] },
        { id: 2, draws: [{ blue: 1, green: 2 }, { green: 3, blue: 4, red: 1 }, { green: 1, blue: 1 }] },
        { id: 3, draws: [{ green: 8, blue: 6, red: 20 }, { blue: 5, red: 4, green: 13 }, { green: 5, red: 1 }] },
        { id: 4, draws: [{ green: 1, red: 3, blue: 6, }, { green: 3, red: 6 }, { green: 3, blue: 15, red: 14 }] },
        { id: 5, draws: [{ red: 6, blue: 1, green: 3 }, { blue: 2, red: 1, green: 2 }] },
      ],
      output: 2286,
    },
    { input: largeTest, output: 56322 },
  ];

  it('should be defined', () => {
    expect(minimalCubeSet).toBeDefined();
    expect(typeof minimalCubeSet).toBe('function');
  });

  test.each(TEST_CASES)('should collect the number of minimal number of cubes for each draw', ({ input, output }) => {
    const result = minimalCubeSet(input);
    expect(typeof result).toBe('number');
    expect(result).toEqual(output);
  });
});