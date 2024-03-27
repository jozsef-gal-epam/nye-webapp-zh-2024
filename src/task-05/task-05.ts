import { Movie, SearchParams, SearchResults, Direction, OrderBy } from './models';
import { MovieService } from './services';

const DEFAULTS = {
  LIMIT: 12,
  OFFSET: 0,
  ORDER_BY: 'title' as OrderBy,
  DIRECTION: 'ASC' as Direction
};

const sortByOrder = (movies: Movie[], orderBy: OrderBy, direction: Direction): Movie[] => {
  return movies.sort((a: Movie, b: Movie) => {
    let result = 0;

    if (orderBy === 'title') {
      result = a.title.localeCompare(b.title);
    } else if (orderBy === 'release_date') {
      const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
      const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
      result = dateA - dateB;
    } else if (orderBy === 'vote_average') {
      result = (a.vote_average || 0) - (b.vote_average || 0); 
    }

    return direction === 'ASC' ? result : -result;
  });
};

const paginateResults = (movies: Movie[], offset: number = DEFAULTS.OFFSET, limit: number = DEFAULTS.LIMIT): Movie[] => {
  const startIndex = offset;
  const endIndex = offset + limit;
  return movies.slice(startIndex, endIndex);
};

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  try {
    const { query = '', genre = [], limit = DEFAULTS.LIMIT, offset = DEFAULTS.OFFSET, orderBy = DEFAULTS.ORDER_BY, direction = DEFAULTS.DIRECTION } = params;

    const movies = await MovieService.getMovies();

    const filteredMovies = movies.filter(movie =>
      (query === '' || movie.title.toLowerCase().includes(query.toLowerCase()) || movie.overview.toLowerCase().includes(query.toLowerCase())) &&
      (genre.length === 0 || genre.some(g => movie.genres?.includes(g)))
    );

    const sortedMovies = sortByOrder(filteredMovies, orderBy, direction);
    const paginatedMovies = paginateResults(sortedMovies, offset, limit);

    return { total: filteredMovies.length, movies: paginatedMovies };
  } catch (error) {
    console.error('An error occurred while searching for movies:', error);
    return { total: 0, movies: [] };
  }
};
