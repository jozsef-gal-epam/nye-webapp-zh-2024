import { Movie, SearchParams, SearchResults, Direction, Genre } from './models';
import { MovieService } from './services';

// Default values definition
const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 12;

// Filter by title
const searchByTitle = (movies: Movie[], query: string): Movie[] => {
  const queryRegex = new RegExp(query, 'i');
  return movies.filter(movie => queryRegex.test(movie.title));
};

// Filter by genre
const searchByGenre = (movies: Movie[], genres: Genre[]): Movie[] => {
  return movies.filter(movie =>
    genres.some(genre => movie.genres && movie.genres.includes(genre))
  );
};

// Sorting
const sortByOrder = (movies: Movie[], orderBy: keyof Movie | undefined, direction: Direction): Movie[] => {
  return movies.sort((a: Movie, b: Movie) => {
    if (!orderBy) {
      return 0; // If orderBy is undefined, no sorting is applied
    }
    if (orderBy === 'title') {
      const orderA = a[orderBy].toLowerCase();
      const orderB = b[orderBy].toLowerCase();
      return direction === 'ASC' ? orderA.localeCompare(orderB) : orderB.localeCompare(orderA);
    } else if (orderBy === 'release_date') {
      const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
      const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
      return direction === 'ASC' ? dateA - dateB : dateB - dateA;
    } else if (orderBy === 'vote_average') {
      const voteA = typeof a.vote_average === 'number' ? a.vote_average : -Infinity; // Use -Infinity as default value for sorting
      const voteB = typeof b.vote_average === 'number' ? b.vote_average : -Infinity; // Use -Infinity as default value for sorting
      return direction === 'ASC' ? voteB - voteA : voteA - voteB;
    } else {
      // Handle other sorting cases if needed
      return 0; // Default to no sorting
    }
  });
};




// Pagination
const paginateResults = (movies: Movie[], offset: number = DEFAULT_OFFSET, limit: number = DEFAULT_LIMIT): Movie[] => {
  const startIndex = offset;
  const endIndex = offset + limit;
  return movies.slice(startIndex, endIndex);
};


// Main search function
export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  try {
    const movies = await MovieService.getMovies();

    let filteredMovies = [...movies]; // Make a copy for operations

    // Filter by title
    if (params.query) {
      filteredMovies = searchByTitle(filteredMovies, params.query.trim());
    }

    // Filter by genre
    if (params.genre && params.genre.length > 0) {
      filteredMovies = searchByGenre(filteredMovies, params.genre);
    }

    // Sorting
if (params.orderBy === 'vote_average') {
  // Sort by average vote
  filteredMovies = sortByOrder(filteredMovies, params.orderBy, params.direction || 'DESC'); // Set default direction to 'DESC'
} else {
  // Sort by other fields
  filteredMovies = sortByOrder(filteredMovies, params.orderBy, params.direction || 'ASC'); // Set default direction to 'ASC'
}


    // Pagination
    const total = filteredMovies.length;
    const paginatedMovies = paginateResults(filteredMovies, params.offset, params.limit);

    return {
      total,
      movies: paginatedMovies
    };
  } catch (error: any) {
    // Handle error by returning empty result set
    return {
      total: 0,
      movies: []
    };
  }
};
