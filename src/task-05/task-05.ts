import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

const Defaults = {
  LIMIT: 12,
  OFFSET: 0,
  ORDER_BY: 'title',
  DIRECTION: 'ASC'
};

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  const {
    query = '',
    genre = [],
    limit = params.limit ?? Defaults.LIMIT,
    offset = params.offset ?? Defaults.OFFSET,
    orderBy = params.orderBy ?? Defaults.ORDER_BY,
    direction = params.direction ?? Defaults.DIRECTION
  } = params;

  try {
    let movies = await MovieService.getMovies();

    const filteredMovies = movies.filter(movie => {
      const queryMatch = query ? movie.title.toLowerCase().includes(query.toLowerCase()) || movie.overview.toLowerCase().includes(query.toLowerCase()) : true;
      const genreMatch = genre.length ? movie.genres?.some(movieGenre => genre.includes(movieGenre)) : true;
      return queryMatch && genreMatch;
    });

    const sortedMovies = filteredMovies.sort((a, b) => {
      if (orderBy === 'title') {
        return direction === 'ASC' ? a.title.localeCompare(b.title, 'en', {sensitivity: 'base'}) : b.title.localeCompare(a.title, 'en', {sensitivity: 'base'});
      } else if (orderBy === 'release_date') {
        return direction === 'ASC' ? new Date(a.release_date).getTime() - new Date(b.release_date).getTime() : new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
      } else { // orderBy === 'vote_average'
        const voteA = a.vote_average ?? 0;
        const voteB = b.vote_average ?? 0;
        return direction === 'ASC' ? voteA - voteB : voteB - voteA;
      }
    });

    const pagedMovies = sortedMovies.slice(offset, offset + limit);

    return {
      total: filteredMovies.length,
      movies: pagedMovies
    };
  } catch (error) {
    console.error('Error searching movies', error);
    return { total: 0, movies: [] };
  }
};


