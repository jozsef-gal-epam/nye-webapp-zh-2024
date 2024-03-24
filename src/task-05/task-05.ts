import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  try {
    const ÖsszesFilm = await MovieService.getMovies();

    const { query = '', genre = [], orderBy = 'title', direction = 'ASC', limit = 12, offset = 0 } = params;

    const MegszürtFilmek = ÖsszesFilm.filter(movie => {
      const AzonosQuery = !query || movie.title.toLowerCase().includes(query.toLowerCase()) || movie.overview.toLowerCase().includes(query.toLowerCase());
      const AzonosGenre = genre.length === 0 || movie.genres?.some(genreItem => genre.includes(genreItem));
      return AzonosQuery && AzonosGenre;
    });

    const RendezettFilmek = MegszürtFilmek.sort((a, b) => {
      switch (orderBy) {
        case 'release_date':
          const dátum = (new Date(a.release_date)).getTime() - (new Date(b.release_date)).getTime();
          return direction === 'ASC' ? dátum : -dátum;
        case 'vote_average':
          const Szavazat = (a.vote_average || 0) - (b.vote_average || 0);
          return direction === 'ASC' ? Szavazat : -Szavazat;
        default:
          return direction === 'ASC' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      }
    });

    const Összeselem = RendezettFilmek.length;
    const keresettOldal = RendezettFilmek.slice(offset, offset + limit);

    return { total: Összeselem, movies: keresettOldal };
  } catch (error) {

    console.error('Hiba történt a filmek keresése közben:', error);
    return { total: 0, movies: [] };
  }
};
