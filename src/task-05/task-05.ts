import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';
const filterMovies = async (params: SearchParams): Promise<Movie[]> => {
  const movies = await MovieService.getMovies();
  const filteredMovies = (await movies).filter(movie => {
    return movie.title.toLowerCase().includes(params.query || '') ||
           movie.overview?.toLowerCase().includes(params.query || '');
  });
  return filteredMovies;
};

const filterGenre = async (params: SearchParams, filteredMovies: Movie[]): Promise<Movie[]> => {
  if (params.genre && params.genre.length > 0) {
    return filteredMovies.filter(movie => {
      return params.genre?.every(genre => movie.genres?.includes(genre));
    });
  } else {
    return filteredMovies;
  }
};
enum ORDERBY {
  TITLE = "title",
  RELEASE_DATE = "release_date",
  BUDGET = "budget",
  REVENUE = "revenue",
  RUNTIME = "runtime"
}

const sortFiltered = async (params: SearchParams, filteredMovies: Movie[]): Promise<Movie[]> => {
  if(params.orderBy){
    switch(params.orderBy){
      case(ORDERBY.TITLE):
        filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
        break;
  
      case(ORDERBY.RELEASE_DATE):
        filteredMovies.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
        break;
     
      default:
  
        break;
    }
  }
  

  return filteredMovies;
};





export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  const filtered_query = await filterMovies(params);
  const filtered_genre = await filterGenre(params, filtered_query);
  const sorted = await sortFiltered(params, filtered_genre);
  const total = sorted.length;

  
  const limited = sorted.slice(params.offset || 0, (params.offset || 0) + (params.limit || 12));

  return {
    total,
    movies: limited
  };
};


console.log(searchMovies({
  query: 'batman',
  orderBy: 'vote_average',
  direction: 'DESC',
  offset: 0,
  limit: 5,
}).then(results => console.log(results))
.catch(error => console.error(error)))
