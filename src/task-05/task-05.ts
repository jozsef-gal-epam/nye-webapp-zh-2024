import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';
export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  try {
    const { query, genre, orderBy = 'title', direction = 'ASC', limit = 12, offset = 0 } = params;
    const movies = await MovieService.getMovies();

    let filteredMovies = movies.filter((movie) => {
      const titles = movie.title.toLowerCase().includes(query?.toLowerCase() || '');
      const descriptions = movie.overview.toLowerCase().includes(query?.toLowerCase() || '');
      const genres = !genre || genre.some(selectedGenre => movie.genres?.includes(selectedGenre));

      return titles || descriptions && genres;
    });

    filteredMovies.sort((a, b) => {
      let result = 0;
      if (orderBy === 'title') {
        if (typeof a[orderBy] === 'string' && typeof b[orderBy] === 'string') {
          result = direction === 'ASC' ? a[orderBy].localeCompare(b[orderBy]) : b[orderBy].localeCompare(a[orderBy]);
        }
      } else {
        const fieldA = a[orderBy];
        const fieldB = b[orderBy];

        const multiplier = direction === 'ASC' ? 1 : -1;

        if (fieldA && fieldB) {
          result = (fieldA < fieldB ? -1 : (fieldA > fieldB ? 1 : 0)) * multiplier;
        }
      }

      return result;
    });

    const paginatedMovies = filteredMovies.slice(offset, offset + limit);

    return {
      total: filteredMovies.length,
      movies: paginatedMovies,
    };
  } catch (error) {
    return {
      total: 0,
      movies: [],
    };
  }
};