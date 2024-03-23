import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  const {
    query = '',
    genre = [],
    orderBy = 'title',
    direction = 'ASC',
    offset = 0,
    limit = 12
  } = params;

  try {
    let movies: Movie[] = await MovieService.getMovies();

    const szurtmovies = szures(movies, query, genre);
    const rendmovies = rendezes(szurtmovies, orderBy, direction);
    const darabolmovies = darabol(rendmovies, offset, limit);

    return {
      total: szurtmovies.length,
      movies: darabolmovies
    };
  } catch (error) {
    return {
      total: 0,
      movies: []
    };
  }
};

const szures = (movies: Movie[], query: string, genre: Genre[]): Movie[] => {
  return movies.filter(movie => {
    const cimegy = movie.title.toLowerCase().includes(query.toLowerCase());
    const osszegy = movie.overview.toLowerCase().includes(query.toLowerCase());
    const kerdegy = cimegy || osszegy;
    const mufajegy = genre.length === 0 || genre.some(g => movie.genres?.includes(g));
    return kerdegy && mufajegy;
  });
};

const rendezes = (movies: Movie[], orderBy: OrderBy, direction: Direction): Movie[] => {
  return movies.sort((a, b) => {
    if (orderBy === 'title') {
      return direction === 'ASC' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    } else if (orderBy === 'release_date') {
      return direction === 'ASC' ? new Date(a.release_date).getTime() - new Date(b.release_date).getTime() : new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
    } else if (orderBy === 'vote_average') {
      return direction === 'ASC' ? (a.vote_average || 0) - (b.vote_average || 0) : (b.vote_average || 0) - (a.vote_average || 0);
    }
    return 0;
  });
};

const darabol = (movies: Movie[], offset: number, limit: number): Movie[] => {
  return movies.slice(offset, offset + limit);
};
