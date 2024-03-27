import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  try {
    // Filmek betöltése
    const movies = await MovieService.getMovies();

    // Alapértelmezett paraméterek beállítása
    const searchParams = { ...params };
    searchParams.query = searchParams.query?.trim();
    searchParams.genre = searchParams.genre || [];
    searchParams.orderBy = searchParams.orderBy || 'title';
    searchParams.direction = searchParams.direction || 'ASC';
    searchParams.limit = searchParams.limit || 12;
    searchParams.offset = searchParams.offset || 0;

    // Szűrés a keresési kifejezés alapján
    const filteredByQuery = searchParams.query
        ? filterByTerm(movies, searchParams.query)
        : movies;

    // Szűrés a műfaj alapján
    const filteredByGenre = filterMoviesByGenre(filteredByQuery, searchParams.genre);

    // Rendezés
    const sortedMovies = sortByField(filteredByGenre, searchParams.orderBy, searchParams.direction);

    // Lapozás
    const total = sortedMovies.length;
    const moviesToReturn = sortedMovies.slice(searchParams.offset, searchParams.offset + searchParams.limit);

    return {
      total,
      movies: moviesToReturn,
    };
  } catch (error) {
    console.error('Hiba a filmek betöltése közben:', error);
    // Hibakezelés: Üres eredmény visszaadása hiba esetén
    return {
      total: 0,
      movies: [],
    };
  }

  // Segédfüggvények

  function filterByTerm(movies: Movie[], query: string) {
    const lowerCaseQuery = query.toLowerCase();
    return movies.filter((movie) =>
        movie.title.toLowerCase().includes(lowerCaseQuery) ||
        movie.overview.toLowerCase().includes(lowerCaseQuery)
    );
  }

  function filterMoviesByGenre(movies: Movie[], genres: Genre[]): Movie[] {
    if (!genres.length) {
      return movies;
    }
    return movies.filter((movie) => {
      const movieGenres = getMovieGenres(movie);
      return genres.some((genre) => movieGenres.includes(genre));
    });
  }

  function getMovieGenres(movie: Movie): Genre[] {
    return movie.genres ? movie.genres : [];
  }

  function sortByField(movies: Movie[], field: OrderBy, direction: Direction) {
    return movies.sort((a, b) => {
      const order = direction === 'ASC' ? 1 : -1;
      switch (field) {
        case 'title':
          return a.title.localeCompare(b.title) * order;
        case 'release_date':
          return (new Date(a.release_date).getTime() - new Date(b.release_date).getTime()) * order;
        case 'vote_average':
          // Az értékelés alapján történő rendezés javítása
          return ((a.vote_average || 0) - (b.vote_average || 0)) * order;
        default:
          return 0;
      }
    });
  }
};
