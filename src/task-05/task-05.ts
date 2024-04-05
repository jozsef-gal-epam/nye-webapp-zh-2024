import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

/**
 *  A feladat, hogy megalkossunk egy használható kereső függvényt az alábbi paraméterek alapján:
- Tudjunk keresni a cím (`Movie.title`) és a leírás (`Movie.description`) alapján egy adott szóra/kifejezésre (`SearchParams.query`).
  A kis és nagybetű nem számít, azaz például a "batman" és "BaTmAn" azonos ebből a szempontból
          stringToLower()
- A lista szűkíthető legyen filmtípusokra (`Movie.Genre`): többet is átadhatunk paraméterként, legalább az egyikre legyen találat - ez egy logikai `OR` (vagy) feltétel ezen belül
- Ha keresési érték és a típus is adott, az egy `AND` (és) logikai kapcsolatnak felel meg.
- Lapozható listát kapjunk, azaz megszabható legyen egy határ, hogy hány elemet akarunk látni egy oldalon (`limit`) és hanyadik elemtől (`offset`) - ha ezt nem adjuk meg külsőleg, legyen az érték 12 elem ez első találattól (`{ offset: 0, limit: 12 }`)
- A kimenet taralmazza az összes megtalált elem számát (`SearchResults.total`), valamint a limitál mennyiségű film elemet (`SearchResults.movies`) a fentebbi kitételek szerint
- Legyen rendezhető (`orderBy`) a lista cím (`'title'`), a bemutató ideje (`'release_date'`) vagy az átlagos értékelés (`'vote_average'`) mezők alapján növekvő (`'ASC'`) vagy csökkenő (`'DESC'`) sorrendben (`direction`) - alapértelmezés cím szerint növevkő sorrend (`{ orderBy: 'title', direction: 'ASC' }`)
 */

//cím és TagLine alapján keresés a moviesArr tömbben
function searchTitle(queryline : string = '', movies : Movie[]){
  let lcqueryline = queryline.toLowerCase();

  const searchData = movies.filter((obj) => {
    return obj.title == lcqueryline;
  });

  return searchData;

}

//típus alapján szűrés
function filteredByGenre(genres:Genre[] = [], movies: Movie[]){
  if(genres.length === 0){
    return movies;
  }

  const filteredData = movies.filter(movie => genres.some(genre => movie.genres?.includes(genre)));
  return filteredData;

}

//lapozhatóság
function pagination(movies : Movie[], limit: number = 12, offset : number = 0){
  let pagination = movies.slice(offset, offset + limit);
  return pagination;
}

//rendezés
function orderedBy(movies : Movie[], orderBy : OrderBy = 'title', direction: Direction = 'ASC'){
  return movies.sort((a, b) => {
    let comp = 0;

    switch (orderBy) {
      case 'title':
        comp = a.title.localeCompare(b.title);
        break;

      case 'release_date':
        comp = new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
        break;

      case 'vote_average':
        comp = (a.vote_average || 0) - (b.vote_average || 0);
        break;

      default:
        break;
    }

    if(direction === 'DESC'){
      comp *= -1;
    }

    return comp;
  });
}

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {

  //hiba szűrés
  if(!params || typeof params !== 'object'){
    return {total: 0, movies: []};
  }else{
     //összes film lekérdezése a movies tömbbe
    const movies = await MovieService.getMovies();

    if( movies.length === 0 ){
      return {total: 0, movies: []};
    }else{
      
      let moviesByTitle = searchTitle(params.query, movies);
      let filteredMovies = filteredByGenre(params.genre, moviesByTitle);
      let filteredPagMovies = pagination(filteredMovies, params.limit, params.offset)
      let orderedMovies = orderedBy(filteredPagMovies, params.orderBy, params.direction);
      const numOfRows = moviesByTitle.length;

      return {total: numOfRows, movies: orderedMovies};
    }

  }

 
};
