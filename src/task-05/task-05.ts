import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  try {
    const allMovies = await MovieService.getMovies();

    const {
      query = '',
      genre = [],
      orderBy = "title",
      direction = "ASC",
      offset = 0,
      limit = 12,
    } = params;

    let filteredMovies: Movie[] = filterMovies(allMovies, query);

    if (genre.length > 0) {
      filteredMovies = filterMoviesByGenre(filteredMovies, genre);
    }

    filteredMovies = sortMovies(filteredMovies, orderBy, direction);

    const paginatedMovies = filteredMovies.slice(offset, offset + limit);

    return {
      total: filteredMovies.length,
      movies: paginatedMovies
    };
  } catch (error) {
    return {
      total: 0,
      movies: []
    };
  }
};

const filterMovies = (movies: Movie[], query: string): Movie[] => {
  return movies.filter(movie => {
    const titleMatch = movie.title.toLowerCase().includes(query.toLowerCase());
    const descriptionMatch = movie.overview.toLowerCase().includes(query.toLowerCase());
    return titleMatch || descriptionMatch;
  });
};

const filterMoviesByGenre = (movies: Movie[], genres: string[]): Movie[] => {
  return movies.filter(movie =>
    genres.some(genre => movie.genres?.includes(genre as any))
  );
};

const sortMovies = (movies: Movie[], orderBy: OrderBy, direction: Direction): Movie[] => {
  const sortedMovies = [...movies];

  sortedMovies.sort((a, b) => {
    if (orderBy === "release_date") {
      return direction === "ASC" ? a.release_date.getTime() - b.release_date.getTime() :
        b.release_date.getTime() - a.release_date.getTime();
    } else if (orderBy === "vote_average") {
      return direction === "ASC" ? (a.vote_average || 0) - (b.vote_average || 0) :
        (b.vote_average || 0) - (a.vote_average || 0);
    } else {
      return direction === "ASC" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    }
  });

  return sortedMovies;
};
