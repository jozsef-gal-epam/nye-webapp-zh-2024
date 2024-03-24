import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  const { query = '', genre = [], limit = 12, offset = 0, orderBy = 'title', direction = 'ASC' } = params;

  try {
    const movies = await MovieService.getMovies();
    let filteredMovies = movies;

    if (query) {
      const lowercaseQuery = query.toLowerCase();
      const filteredMoviesTemp = [];
      
      for (const movie of filteredMovies) {
        if (movie.title.toLowerCase().includes(lowercaseQuery) || 
            movie.overview.toLowerCase().includes(lowercaseQuery)) {
          filteredMoviesTemp.push(movie);
        }
      }
      
      filteredMovies = filteredMoviesTemp;
    }

    if (genre && genre.length > 0) {
      const filteredMoviesTemp = [];
    
      for (const movie of filteredMovies) {
        if (movie.genres) {
          let hasGenre = false;
          for (const g of genre) {
            if (movie.genres.includes(g)) {
              hasGenre = true;
              break;
            }
          }
          if (hasGenre) {
            filteredMoviesTemp.push(movie);
          }
        }
      }
    
      filteredMovies = filteredMoviesTemp;
    }
    
    filteredMovies.sort((a, b) => {
      const valueA: any = a[orderBy];
      const valueB: any = b[orderBy];
  
      const comparison = orderBy === 'title'
          ? (direction === 'ASC' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA))
          : (direction === 'ASC' ? valueA - valueB : valueB - valueA);
  
      return comparison;
  });
  
    const slicedMovies: Movie[] = [];
    const endIndex = Math.min(offset + limit, filteredMovies.length);
    for (let i = offset; i < endIndex; i++) {
      slicedMovies.push(filteredMovies[i]);
    }

  return { total: filteredMovies.length, movies: slicedMovies };
  } catch (error) {
    return { total: 0,movies: [] };
  }
};
