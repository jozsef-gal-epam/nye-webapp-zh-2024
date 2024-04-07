import { Movie, Genre, SearchParams, SearchResults, Direction } from './models';
import { MovieService } from './services';

const searchByQuery = async (params: SearchParams): Promise<Movie[]> => {
  const movies = await MovieService.getMovies();
  const filter = params.query?.toLowerCase();
  const genreFilter = params.genre;

  if (filter && genreFilter) {
    return movies.filter(movie => {
      const matchesFilter = movie.title.toLowerCase().includes(filter) || (movie.overview && movie.overview.toLowerCase().includes(filter));
      const matchesGenre = genreFilter.some(genre => movie.genres?.includes(genre));
      return matchesFilter && matchesGenre;
    });
  } else if (filter) {
    return movies.filter(movie => {
      return movie.title.toLowerCase().includes(filter) || (movie.overview && movie.overview.toLowerCase().includes(filter));
    });
  } else if (genreFilter) {
    return movies.filter(movie => {
      return genreFilter.some(genre => movie.genres?.includes(genre));
    });
  } else {
    return movies; 
  }
}




const limitOutput = async (params: SearchParams, filteredMovies: Movie[]): Promise<Movie[]> => {
  let offset = 0;
  let limit = 12;
  
  if (params.limit) {
    limit = params.limit;
  }
  
  if (params.offset) {
    offset = params.offset;
  }
  
  return filteredMovies.slice(offset, offset + limit);
}

const sortOutput = async (params: SearchParams, filteredMovies: Movie[]): Promise<Movie[]> => {
  let direction: Direction = "ASC"; 
  let orderBy: keyof Movie = "title"; 

  if (params.direction) {
    direction = params.direction;
  }
  if (params.orderBy) {
    orderBy = params.orderBy as keyof Movie;
  }

  if (orderBy === 'title') {
    filteredMovies.sort((a, b) => {
      if (direction === 'ASC') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  } else if (orderBy === 'release_date') {
    filteredMovies.sort((a, b) => {
      const dateA = new Date(a.release_date).getTime();
      const dateB = new Date(b.release_date).getTime();
      if (direction === 'ASC') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  } else if (orderBy === 'vote_average') {
    filteredMovies.sort((a, b) => {
      const avgA = a.vote_average || 0;
      const avgB = b.vote_average || 0;
      if (direction === 'ASC') {
        return avgA - avgB;
      } else {
        return avgB - avgA;
      }
    });
  }

  return filteredMovies;
};

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  try {
    const filteredMovies = await searchByQuery(params);
    const total = filteredMovies.length; 

    const sorted = await sortOutput(params, filteredMovies);
    const limitedMovies = await limitOutput(params, sorted);
    
    const searchResult: SearchResults = { total, movies: limitedMovies };
    
    if (searchResult.total === 0 || searchResult.movies.length === 0) {
      throw new Error("No movies found.");
    }
    
    return searchResult;
  } catch (error) {
    console.error(error);
    return { total: 0, movies: [] };
  }
};



searchMovies({
  
   
    orderBy: 'vote_average',
    direction: 'DESC',
    offset: 0,
    limit: 5,

    
  

  
}).then(results => console.log(results))
.catch(error => console.error(error));
