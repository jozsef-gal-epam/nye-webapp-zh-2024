import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

const DEFAULT_LIMIT = 12;
const DEFAULT_OFFSET = 0;
const DEFAULT_ORDER_BY = 'title';
const DEFAULT_DIRECTION = 'ASC';

export const searchMovies = async (params: SearchParams = {}): Promise<SearchResults> => {
  try {
    const { query = '', genre = [], limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET, orderBy = DEFAULT_ORDER_BY, direction = DEFAULT_DIRECTION } = params;

    const movies = await MovieService.getMovies();

    const filteredMovies = movies.filter((movie) => {
      const titleMatch = movie.title.toLowerCase().includes(query.toLowerCase());
      const descriptionMatch = movie.overview?.toLowerCase().includes(query.toLowerCase()) || false;
      const genresMatch = genre.length === 0 || movie.genres?.some((g) => genre.includes(g));
      return (titleMatch || descriptionMatch) && genresMatch;
    });

  
    const sortedMovies = filteredMovies.sort((a, b) => {
      const valueA: any = a[orderBy];
      const valueB: any = b[orderBy];

      if (orderBy === 'title') {
        return direction === 'ASC' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else {
        return direction === 'ASC' ? valueA - valueB : valueB - valueA;
      }
    });

    const total = sortedMovies.length;
    const slicedMovies = sortedMovies.slice(offset, offset + limit);

    return { total, movies: slicedMovies };
  } catch (error) {
    console.error('Problem while searching:', error);
    return { total: 0, movies: [] };
  }
};
