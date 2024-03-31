import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
 // return Promise.reject('Not implemented');
 try {
  const allMovies = await MovieService.getMovies();

    const { query = '', genre = [], orderBy = 'title', direction = 'ASC', limit = 12, offset = 0 } = params;

    const filterByQuery = (movie: Movie) => {
    if (!query) return true; 
    const searchedQuery = query.toLowerCase();
    return (
      movie.title.toLowerCase().includes(searchedQuery) ||
      movie.overview.toLowerCase().includes(searchedQuery)
    );
  };

    const filterByGenre = (movie: Movie) => {
    if (!genre.length) return true; 
    return genre.some(g => movie.genres?.includes(g));
  };

    const sortOrder = (thisMovie: Movie, otherMovie: Movie) => {
    switch (orderBy) {
      case 'release_date':
        const dateSub = thisMovie.release_date.getTime() - otherMovie.release_date.getTime();
        return direction === 'ASC' ? dateSub : -dateSub;
      case 'vote_average':
        const voteSub = (thisMovie.vote_average || 0) - (otherMovie.vote_average || 0);
        return direction === 'ASC' ? voteSub : -voteSub;
      case 'title':
        return direction === 'ASC' ?
          thisMovie.title.localeCompare(otherMovie.title) : otherMovie.title.localeCompare(thisMovie.title);
      default:
        return 0;
    }
  };

    const filteredMovies = allMovies
    .filter(filterByQuery)
    .filter(filterByGenre)
    .sort(sortOrder);

    const limitedPage = filteredMovies.slice(offset, offset + limit);

  return {
    total: filteredMovies.length,
    movies: limitedPage
  };
} catch (error) {
  console.error('Hiba:', error);
  return {
    total: 0,
    movies: []
  };
}
};