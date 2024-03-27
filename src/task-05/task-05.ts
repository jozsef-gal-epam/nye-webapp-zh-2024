import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  try {
    
    let movies: Movie[] = await MovieService.getMovies();

   
    if (params.query || (params.genre && params.genre.length) || params.orderBy || params.direction) {
      movies = applyFilters(movies, params);
    }

   
    const total: number = movies.length;

    
    movies = Sort(movies, params.orderBy || 'title', params.direction || 'ASC');

    
    const moviesToReturn: Movie[] = applyPagination(movies, params);

    
    return {
      total,
      movies: moviesToReturn,
    };
  } catch (error) {
  
    return {
      total: 0,
      movies: [],
    };
  }
};

function applyFilters(movies: Movie[], params: SearchParams): Movie[] {
  const { query ='', genre =[], orderBy = 'title', direction = 'ASC' } = params;

  
  if (query) {
    movies = TermFilter(movies, query);
  }

 
  if (genre && genre.length) {
    movies = GenreFilter(movies, genre);
  }

  return movies;
}

function TermFilter(movies: Movie[], query: string): Movie[] {
  if (!query) return movies;
  const searchTerm = query.trim().toLowerCase();
  return movies.filter((movie) =>
  movie.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 || movie.overview.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
  );
}

function GenreFilter(movies: Movie[], genres: Genre[]): Movie[] {
  if (!genres ?? !genres.length) return movies;
  return movies.filter((movie) => {
    const movieGenres: Genre[] = movie.genres ?? [];
    return movieGenres.some((movieGenre) => genres.includes(movieGenre));

  });
}

function Sort(movies: Movie[], orderBy: OrderBy, direction: Direction): Movie[] {
  if (!orderBy) return movies;

  return movies.sort((a, b) => {
    const order: number = direction === 'DESC' ? -1 : 1;
    switch (orderBy) {
      case 'title':
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();
          return titleA.localeCompare(titleB) * order;
        case 'release_date':
          const dateA = new Date(a.release_date).getTime();
          const dateB = new Date(b.release_date).getTime();
          return (dateA - dateB) * order;
        case 'vote_average':
          const avgA = a.vote_average ?? 0;
          const avgB = b.vote_average ?? 0;
          return (avgA - avgB) * order;
      default:
        return 0;
    }
  });
}

function applyPagination(movies: Movie[], params: SearchParams): Movie[] {
  const { limit = 12, offset = 0 } = params;
  return movies.slice(offset, offset + limit);
}
