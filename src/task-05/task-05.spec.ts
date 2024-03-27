import { searchMovies } from './task-05';
import { MovieService } from './services';

describe.skip('task-05', () => {
  const TOTAL_ITEMS = 3000;

  it('should export the search function', () => {
    expect(searchMovies).toBeDefined();
    expect(typeof searchMovies).toBe('function');
  });

  it('should return 12 movies ordered by title in ascending order', async () => {
    const results = await searchMovies({});
    expect(results).toBeInstanceOf(Object);
    expect(results).toHaveProperty('total');
    expect(results).toHaveProperty('movies');
    const { total, movies } = results;
    expect(total).toBe(TOTAL_ITEMS);
    expect(movies).toHaveLength(12);
    movies.forEach((item) => {
      expect(item).toBeDefined();
      expect(item).toBeInstanceOf(Object);
      expect(Object.keys(item)).toEqual(expect.arrayContaining(['id', 'title', 'overview', 'release_date']));
    });
    expect(movies).toEqual([
      expect.objectContaining({ id: 8388, title: '¡Three Amigos!' }),
      expect.objectContaining({ id: 252178, title: '\'71' }),
      expect.objectContaining({ id: 19913, title: '(500) Days of Summer' }),
      expect.objectContaining({ id: 8329, title: '[REC]' }),
      expect.objectContaining({ id: 455656, title: '#realityhigh' }),
      expect.objectContaining({ id: 333371, title: '10 Cloverfield Lane' }),
      expect.objectContaining({ id: 4951, title: '10 Things I Hate About You' }),
      expect.objectContaining({ id: 7840, title: '10,000 BC' }),
      expect.objectContaining({ id: 11674, title: '101 Dalmatians' }),
      expect.objectContaining({ id: 13654, title: '101 Dalmatians II: Patch\'s London Adventure' }),
      expect.objectContaining({ id: 505177, title: '10x10' }),
      expect.objectContaining({ id: 389, title: '12 Angry Men' }),
    ]);
  });

  it('should return the limited number of items from a defined offset', async () => {
    const LIMIT = 5;
    const OFFSET = 300;
    const { total, movies } = await searchMovies({ offset: OFFSET, limit: LIMIT });
    expect(total).toBe(TOTAL_ITEMS);
    expect(movies).toHaveLength(LIMIT);
    expect(movies).toEqual([
      expect.objectContaining({ id: 364, title: 'Batman Returns' }),
      expect.objectContaining({ id: 209112, title: 'Batman v Superman: Dawn of Justice' }),
      expect.objectContaining({ id: 242643, title: 'Batman: Assault on Arkham' }),
      expect.objectContaining({ id: 471474, title: 'Batman: Gotham by Gaslight' }),
      expect.objectContaining({ id: 123025, title: 'Batman: The Dark Knight Returns, Part 1' }),
    ]);
  });

  it('should return in descending release date order', async () => {
    const limit = 5;
    const offset = 0;
    const direction = 'DESC';
    const orderBy = 'release_date';
    const { total, movies } = await searchMovies({ limit, offset, direction, orderBy });
    expect(total).toBe(TOTAL_ITEMS);
    expect(movies).toHaveLength(limit);
    expect(movies.map((movie) => movie.title)).toEqual([
      'Guardians of the Galaxy Vol. 3',
      'Transformers 7',
      'Untitled Avengers',
      'Shazam!',
      'X-Men: Dark Phoenix',
    ]);
  });

  it('should return by matching title ordered by avarege vote in descending order', async () => {
    const limit = 5;
    const offset = 0;
    const orderBy = 'vote_average';
    const direction = 'DESC';
    const query = 'batman';
    const EXPECTED_TOTAL = 19;

    const { total, movies } = await searchMovies({ limit, offset, query, orderBy, direction });
    expect(total).toBe(EXPECTED_TOTAL);
    expect(movies).toHaveLength(limit);
    expect(movies).toEqual([
      expect.objectContaining({ id: 155, title: 'The Dark Knight', vote_average: 8.3 }),
      expect.objectContaining({ id: 142061, title: 'Batman: The Dark Knight Returns, Part 2', vote_average: 7.9 }),
      expect.objectContaining({ id: 123025, title: 'Batman: The Dark Knight Returns, Part 1', vote_average: 7.7 }),
      expect.objectContaining({ id: 49026, title: 'The Dark Knight Rises', vote_average: 7.6 }),
      expect.objectContaining({ id: 272, title: 'Batman Begins', vote_average: 7.5 }),
    ]);
  });

  it('should handle errors by returning empty result set', async () => {
    jest.spyOn(MovieService, 'getMovies').mockRejectedValueOnce('This should throw an error');
    expect.assertions(3);
    const { total, movies } = await searchMovies({});
    expect(total).toBe(0);
    expect(movies).toBeInstanceOf(Array);
    expect(movies).toHaveLength(0);
  });
});
