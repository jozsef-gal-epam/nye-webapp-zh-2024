import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  
  try {
    const allMovies = await MovieService.getMovies();

    const { query, genre, orderBy = 'title', direction = 'ASC', limit = 12, offset = 0 } = params;


    const filterByQuery = ( movie: Movie) => {
      if (!query) 
      {
        return Boolean;
      }
      const searchedQuery = query.toLowerCase();
      return ( 
        movie.title.toLowerCase().includes(searchedQuery) || movie.overview.toLowerCase().includes(searchedQuery)
      );
    };


    const filterByGenre = (movie: Movie) => {
      if (!genre || !Array.isArray(genre) || genre.length === 0) 
      {
        return Boolean;
      }
      else return genre.some(genre => movie.genres?.includes(genre));
    };

    
    const sortOrder = (thismovie: Movie, othermovie: Movie) => {
      switch (orderBy) {
        case 'release_date':
          const dateSub =  thismovie.release_date.getTime() - othermovie.release_date.getTime()
          return direction === 'ASC' ? dateSub : -dateSub
        case 'vote_average':
          const voteSub = (thismovie.vote_average || 0) - (othermovie.vote_average || 0) 
          return direction === 'ASC' ? voteSub : -voteSub
        case 'title':
          return direction === 'ASC' ?
            thismovie.title.localeCompare(othermovie.title) : othermovie.title.localeCompare(thismovie.title);
            default:
              return 0;
      }
    };

  
    const receivedMovies = allMovies
      .filter(filterByQuery)
      .filter(filterByGenre)
      .sort(sortOrder);

   
    const limitedPage = receivedMovies.slice(offset, offset + limit);

    return {
      total: receivedMovies.length,
      movies: limitedPage
    };
  } catch (error) {
    console.error('Unfortunately we have some error, do not be angry):', error);
    return {
      total: 0,
      movies: []
    };
  }
};
