import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  try {
    // Alapértelmezések beállítása
    const { query, genre, orderBy = 'title', direction = 'ASC', limit = 12, offset = 0 } = params;

    // Filmek lekérése a szolgáltatásból
    const movies = await MovieService.getMovies();

    // Keresési feltételek alapján szűrés
    let filteredMovies = movies.filter(movie => {
      // Cím és leírás keresése query alapján
      const titleMatch = movie.title.toLowerCase().includes(query?.toLowerCase() || '');
      const descriptionMatch = movie.overview.toLowerCase().includes(query?.toLowerCase() || '');

      // Genre szűrés
      const genreMatch = !genre || genre.some(g => movie.genres?.includes(g));

      // AND kapcsolat feltétel
      return titleMatch || descriptionMatch && genreMatch;
    });

    // Rendezés
    filteredMovies.sort((a, b) => {
      let result = 0;

      // Rendezés mező alapján
      if (orderBy === 'title') {
        // Cím alapján rendezés
        result = a.title.localeCompare(b.title);
      } else {
        // Egyéb mezők alapján rendezés
        const fieldA = a[orderBy];
        const fieldB = b[orderBy];

        // Csökkenő/növekvő sorrend beállítása
        const multiplier = direction === 'ASC' ? 1 : -1;

        // Ellenőrzöm, hogy az értékek definiáltak-é
        if (fieldA && fieldB) {
          // Rendezem az értékek alapján
          result = (fieldA < fieldB ? -1 : (fieldA > fieldB ? 1 : 0)) * multiplier;
        }
      }

      return result;
    });

    // Lapozás
    const paginatedMovies = filteredMovies.slice(offset, offset + limit);

    return {
      total: filteredMovies.length,
      movies: paginatedMovies,
    };
  } catch (error) {
    // Hibakezelés: üres eredmény
    return {
      total: 0,
      movies: [],
    };
  }
};








//import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
//import { MovieService } from './services';

//export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
//  return Promise.reject('Not implemented');
//};


//Az összes kész, minden jó. 2024.04.05-23:08