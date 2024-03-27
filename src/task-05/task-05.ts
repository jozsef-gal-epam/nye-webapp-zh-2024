import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  const { query = '', genre = [], orderBy = 'title', direction = 'ASC', limit = 12, offset = 0 } = params;

  let allMovies: Movie[] = [];

  try {
    allMovies = await MovieService.getMovies();
  } catch (error) {
    console.error('Error fetching movies:', error);
    return {
      total: 0,
      movies: [],
    };
  }

  const filteredMovies = allMovies.filter(movie => {
    const lowercaseQuery = query.toLowerCase();
    const isInTitleOrDescription = movie.title.toLowerCase().includes(lowercaseQuery) ||
      movie.overview.toLowerCase().includes(lowercaseQuery);

    const isMatchingGenre = genre.length === 0 || genre.some(g => movie.genres?.includes(g));

    return isInTitleOrDescription && isMatchingGenre;
  });

 
  if (orderBy === 'title') {
    filteredMovies.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      return titleA.localeCompare(titleB);
    });
  }

  filteredMovies.sort((a, b) => {
    let valueA: string | number | Date | undefined;
    let valueB: string | number | Date | undefined;

    if (orderBy === 'release_date') {
      valueA = new Date(a.release_date).getTime();
      valueB = new Date(b.release_date).getTime();
    } else if (orderBy === 'vote_average') {
      valueA = a[orderBy];
      valueB = b[orderBy];
    } else {
      valueA = undefined;
      valueB = undefined;
    }

    if (valueA === undefined || valueB === undefined || valueA === null || valueB === null) {
      return 0;
    }

    const multiplier = direction === 'ASC' ? 1 : -1;

    if (valueA === valueB) return 0;
    return valueA > valueB ? multiplier : -multiplier;
  });

  const paginatedMovies = filteredMovies.slice(offset, offset + limit);

  return {
    total: filteredMovies.length,
    movies: paginatedMovies,
  };
}