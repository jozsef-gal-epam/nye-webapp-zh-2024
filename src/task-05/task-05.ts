import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';


const DEFAULT_LIMIT = 12;
const DEFAULT_OFFSET = 0;
const DEFAULT_ORDER_BY: OrderBy = 'title';
const DEFAULT_DIRECTION: Direction = 'ASC';

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  try {

    const query: string = (params.query || '').toLowerCase().trim();
    const genresToFilter: Genre[] = params.genre || [];
    const limit: number = params.limit ?? DEFAULT_LIMIT;
    const offset: number = params.offset ?? DEFAULT_OFFSET;
    const orderBy: OrderBy = params.orderBy ?? DEFAULT_ORDER_BY;
    const direction: Direction = params.direction ?? DEFAULT_DIRECTION;

    
    let movies: Movie[] = await MovieService.getMovies();

   
    movies = movies.filter(movie => {
      const titleMatch = movie.title.toLowerCase().includes(query);
      const descriptionMatch = movie.overview.toLowerCase().includes(query);
      const genresMatch = movie.genres ? movie.genres.some(genre => genresToFilter.includes(genre)) : false;
      return (titleMatch || descriptionMatch) && (genresToFilter.length === 0 || genresMatch);
    });

   
movies.sort((a, b) => {
  if (orderBy === 'title') {
    return (direction === 'ASC' ? 1 : -1) * a[orderBy].localeCompare(b[orderBy]);
  } else if (orderBy === 'release_date') {
    const dateA = new Date(a.release_date);
    const dateB = new Date(b.release_date);
    return (direction === 'ASC' ? 1 : -1) * (dateA.getTime() - dateB.getTime());
  } else { 
    return (direction === 'ASC' ? 1 : -1) * ((a[orderBy] ?? 0) - (b[orderBy] ?? 0));
  }
});


   
    const slicedMovies: Movie[] = movies.slice(offset, offset + limit);
    const total: number = movies.length;

    return { total, movies: slicedMovies };
  } catch (error) {
    console.error('An error occurred while searching movies:', error);
    return { total: 0, movies: [] };
  }
};
