import { Movie, Genre, SearchParams, SearchResults } from './models';
import { MovieService } from './services';

enum OrderBy {
  Title = 'title',
  VoteAverage = 'vote_average',
  ReleaseDate = 'release_date'
}

enum Direction {
  Asc = 'ASC',
  Desc = 'DESC'
}

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  try {
    let allMovies: Movie[] = await MovieService.getMovies();
    const {
      query,
      genre,
      orderBy = OrderBy.Title,
      direction = Direction.Asc,
      limit = 12,
      offset = 0
    } = params;


    if (query) {
      const queryLowerCase = query.toLowerCase();
      allMovies = allMovies.filter(movie =>
        movie.overview.toLowerCase().includes(queryLowerCase) || movie.title.toLowerCase().includes(queryLowerCase)
      );
    }

    if (genre) {
      allMovies = allMovies.filter(movie =>
        genre.every(g => movie.genres?.includes(g))
      );
    }

    allMovies.sort((a, b) => {
      switch (orderBy) {
        case OrderBy.Title:
          return direction === Direction.Asc ? a.title.localeCompare(b.title, 'hu-HU') : b.title.localeCompare(a.title, 'hu-HU');
        case OrderBy.VoteAverage:
          const voteAverage1 = a.vote_average || 0;
          const voteAverage2 = b.vote_average || 0;
          return direction === Direction.Asc ? voteAverage1 - voteAverage2 : voteAverage2 - voteAverage1;
        case OrderBy.ReleaseDate:
          const releaseDate1 = new Date(a.release_date).getTime() || 0;
          const releaseDate2 = new Date(b.release_date).getTime() || 0;
          return direction === Direction.Asc ? releaseDate1 - releaseDate2 : releaseDate2 - releaseDate1;
        default:
          return 0;
      }
    });

    const totalMovies = allMovies.length;
    const limitedMovies = allMovies.slice(offset, offset + limit);

    return {
      total: totalMovies,
      movies: limitedMovies
    };
  } catch (error) {

    return {
      total: 0,
      movies: []
    };
  }
};
