import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  const { query, genre, orderBy = 'title', direction = 'ASC', offset = 0, limit = 12 } = params;

  try {
    const movies = await MovieService.getMovies();
    let filteredMovies = movies;

    if (query) {
      const lowercaseQuery = query.toLowerCase(); 
      filteredMovies = filteredMovies.filter(movie => 
        movie.title.toLowerCase().includes(lowercaseQuery) || 
        movie.overview.toLowerCase().includes(lowercaseQuery));
    }

    if (genre && genre.length > 0) {
      filteredMovies = filteredMovies.filter(movie => 
        movie.genres?.some(g => movie.genres?.includes(g)));
    }

    filteredMovies.sort((a, b) => {
      const valueA = a[orderBy] || 0;
      const valueB = b[orderBy] || 0;
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return direction === 'ASC' ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      } else {
        return direction === 'ASC' ? Number(valueA) - Number(valueB) 
          : Number(valueB) - Number(valueA);
      }
    });

    const slicedMovies = filteredMovies.slice(offset, offset + limit);

    return {
      total: filteredMovies.length,
      movies: slicedMovies
    };
  } catch (error) {
    console.error("Error occurred while fetching movies:", error);
    return {
      total: 0,
      movies: []
    };
  }
};
