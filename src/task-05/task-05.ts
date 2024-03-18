import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

// Alapértelmezett értékek definiálása
const DEFAULT_LIMIT = 12;
const DEFAULT_OFFSET = 0;
const DEFAULT_ORDER_BY = 'title';
const DEFAULT_DIRECTION = 'ASC';

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  try {
    const query: string = (params.query || '').toLowerCase().trim();
    const genresToFilter: Genre[] = params.genre || [];
    const limit: number = params.limit || DEFAULT_LIMIT;
    const offset: number = params.offset || DEFAULT_OFFSET;
    const orderBy: OrderBy = params.orderBy || DEFAULT_ORDER_BY;
    const direction: Direction = params.direction || DEFAULT_DIRECTION;

    let movies: Movie[] = await MovieService.getMovies();

    // Szűrés
    movies = movies.filter(movie => {
      const titleMatch: boolean = movie.title.toLowerCase().includes(query);
      const descriptionMatch: boolean = movie.overview.toLowerCase().includes(query);
      const genresMatch: boolean = movie.genres !== undefined && movie.genres.some(genre => genresToFilter.includes(genre));
      return (titleMatch || descriptionMatch) && (genresToFilter.length === 0 || genresMatch);
    });

    // Rendezés
    movies.sort((a, b) => {
      const valueA: any = a[orderBy];
      const valueB: any = b[orderBy];

      if (orderBy === 'title') {
        return direction === 'ASC' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else {
        return direction === 'ASC' ? valueA - valueB : valueB - valueA;
      }
    });

    // Lapozható lista létrehozása
    const total: number = movies.length;
    const slicedMovies: Movie[] = movies.slice(offset, offset + limit);

    return { total, movies: slicedMovies };
  } catch (error) {
    console.error('An error occurred while searching movies:', error);
    return { total: 0, movies: [] };
  }
};
