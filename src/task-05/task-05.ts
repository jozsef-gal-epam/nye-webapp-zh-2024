5.

import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  try {

    const { query = '', genre = [], orderBy = 'title', direction = 'ASC', limit = 12, offset = 0 } = params;

    const allMovies = await MovieService.getMovies();

    const filteredMovies = allMovies.filter(movie => {
      const matchesQuery = !query || movie.title.toLowerCase().includes(query.toLowerCase()) || movie.overview.toLowerCase().includes(query.toLowerCase());
      const matchesGenre = genre.length === 0 || genre.some(g => movie.genres?.includes(g));
      return matchesQuery && matchesGenre;
    });

    const sortedMovies = filteredMovies.sort((a, b) => {
      if (orderBy === 'title') {
        return direction === 'ASC' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      } else if (orderBy === 'release_date') {
        return direction === 'ASC' ? a.release_date.getTime() - b.release_date.getTime() : b.release_date.getTime() - a.release_date.getTime();
      } else if (orderBy === 'vote_average') {
        return direction === 'ASC' ? (a.vote_average || 0) - (b.vote_average || 0) : (b.vote_average || 0) - (a.vote_average || 0);
      }
      return 0;
    });

    const total = sortedMovies.length;

    const paginatedMovies = sortedMovies.slice(offset, offset + limit);

    return {
      total,
      movies: paginatedMovies
    };
  } catch (error) {
    return {
      total: 0,
      movies: []
    };
  }
};
