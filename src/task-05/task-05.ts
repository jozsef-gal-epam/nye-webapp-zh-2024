import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  const allMovies = await MovieService.getMovies();


  const filteredByTitleAndDescription = allMovies.filter(movie => {
     const query = params.query?.toLowerCase();
     return query && (movie.title.toLowerCase().includes(query) || movie.overview.toLowerCase().includes(query));
  });
 

  const filteredByGenre = params.genre ? filteredByTitleAndDescription.filter(movie =>
     movie.genres?.some(genre => params.genre?.includes(genre))
  ) : filteredByTitleAndDescription;
 

  const paginatedMovies = filteredByGenre.slice(params.offset || 0, (params.offset || 0) + (params.limit || 12));
 

  const sortedMovies = paginatedMovies.sort((a, b) => {
    const orderBy = params.orderBy || 'title';
    const direction = params.direction || 'ASC';
    let valueA = a[orderBy];
    let valueB = b[orderBy];

 
    if (valueA === undefined) {
        valueA = direction === 'ASC' ? Infinity : -Infinity;
    }
    if (valueB === undefined) {
        valueB = direction === 'ASC' ? Infinity : -Infinity;
    }

    return direction === 'ASC' ? (valueA > valueB ? 1 : -1) : (valueA < valueB ? 1 : -1);
  });
 
  return {
     total: filteredByGenre.length,
     movies: sortedMovies
  };
};