import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  try {
    
    let query = params.query ?? '';
    let genre = params.genre ??  [];
    let limit = params.limit ?? 12;
    let offset = params.offset ?? 0;
    let orderBy = params.orderBy ?? 'title';
    let direction = params.direction ?? 'ASC';


    let movies = await MovieService.getMovies();

    movies = search(movies, query, genre);
    movies = sort(movies, orderBy, direction);

    return { total: movies.length, movies: movies.slice(offset, offset + limit) };

  } catch (error) {
    return { total: 0, movies: [] };
  }
};



function search(pmovies: Movie[], pquery: string, pgenre: Genre[]): Movie[] {
  let includesQuery: Movie[] = [];

  for (let movie of pmovies) {
    let title = movie.title.toLowerCase();
    let description = movie.overview.toLowerCase();
    if (
      title.includes(pquery.toLowerCase().trim()) ||
      description.includes(pquery.toLowerCase().trim())
    ) {
      includesQuery.push(movie);
    }
  }

  let moviesToReturn: Movie[] = [];
  for (let movie of includesQuery) {
    let genres = movie.genres;
    if (
      pgenre.length === 0 ||
      (genres !== undefined && genres.some((genre) => pgenre.includes(genre)))
    ) {
      moviesToReturn.push(movie);
    }
  }

  return moviesToReturn;
}

function sort(movies: Movie[], orderBy: OrderBy, direction: Direction) {
  return movies.sort((movie1, movie2) => {
    let om1: any = movie1[orderBy];
    let om2: any = movie2[orderBy];
    
    if(orderBy === 'title') {
      if(direction === 'ASC') {
        return om1.localeCompare(om2);
      } else {
        return om2.localeCompare(om1);
      }
    } else {
      if(direction === 'ASC') {
        return om1 - om2;
      } else {
        return om2 - om1;
      }
    }
  });
}