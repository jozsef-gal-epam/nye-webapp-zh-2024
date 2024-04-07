import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';



//cím és TagLine alapján keresés a moviesArr tömbben
export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  //return Promise.reject('Not implemented');

  try{
    const movies = await MovieService.getMovies();

    const offset: number = params.offset ?? 0;
    const limit: number = params.limit ?? 12;
    const orderBy: string = params.orderBy ?? 'title';
    const direction: string = params.direction ?? 'ASC';

    const filteredMovies = movies.filter(movie => {

      const lcQuery = params.query?.toLowerCase() || '';
      let resultArr = [];
      if(movie.title.toLowerCase().includes(lcQuery) || movie.overview.toLocaleLowerCase().includes(lcQuery)){
        resultArr.push(movie);
      }else{
        resultArr = movies;
      }

      return resultArr;

    });

    if(params.genre){
      let result = [];

      movies.filter(movie => {
        movie.genres?.forEach((genre) => {
          if (params.genre && params.genre.includes(genre)) {

            result.push(movie);

          }else{

            result = movies;

          }
        })
      });
    }

    let orderedMovies = filteredMovies.sort((a, b) => {
      
      let result = 0;

      if(orderBy === 'title'){

        result = (a.title).localeCompare(b.title);

      }else if(orderBy === 'release_date'){

        result = a.release_date.getTime() - b.release_date.getTime();

      }else if(orderBy === 'vote_average'){

        result = (b.vote_average ?? 0) - (a.vote_average ?? 0);

      }

      return direction === 'ASC' ? result : -result;

    });

    let pagnatedMovies = orderedMovies.slice(offset, offset + limit);

    console.log(pagnatedMovies);

    let num_rows = 0;

    if(!pagnatedMovies){
      num_rows = filteredMovies.length;
    }else{
      num_rows = pagnatedMovies.length;
    }

    return {
      total: filteredMovies.length,
      movies: pagnatedMovies
    }


  } catch (error){
    return {
      total: 0,
      movies: []
    }
  }
};