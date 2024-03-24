import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

const DEFAULTS = {
  LIMIT: 12,
  OFFSET: 0,
  ORDER_BY: 'title' as OrderBy,
  DIRECTION: 'ASC' as Direction
};

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  try {
    const query = (params.query || '').toLowerCase().trim();
    const genres = params.genre || [];
    const limit = params.limit || DEFAULTS.LIMIT;
    const offset = params.offset || DEFAULTS.OFFSET;
    const orderBy = params.orderBy || DEFAULTS.ORDER_BY;
    const direction = params.direction || DEFAULTS.DIRECTION;

    let filteredMovies = (await MovieService.getMovies()).filter(movie => {
      const titleMatch = movie.title.toLowerCase().includes(query);
      const descriptionMatch = movie.overview.toLowerCase().includes(query);
      const genreMatch = movie.genres && movie.genres.some(g => genres.includes(g));
      return (titleMatch || descriptionMatch) && (!genres.length || genreMatch);
    });

    filteredMovies.sort((a, b) => {
      const valueA: any = a[orderBy];
      const valueB: any = b[orderBy];
    
      if (orderBy === 'title') {
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return direction === 'ASC' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        }
      } else if (orderBy === 'release_date') {
        const dateA = new Date(valueA);
        const dateB = new Date(valueB);
        return direction === 'ASC' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      } else {
        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return direction === 'ASC' ? valueA - valueB : valueB - valueA;
        }
      }
    
      return 0;
    });
      
    const total = filteredMovies.length;
    const movies = filteredMovies.slice(offset, offset + limit);

    

    return { total, movies };
  } catch (error) {
    return { total: 0, movies: [] };
  }
};
