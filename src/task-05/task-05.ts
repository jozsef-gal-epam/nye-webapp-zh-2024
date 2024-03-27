import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  const LANG = 'hu-HU';

  try {
    let movies: Movie[] = await MovieService.getMovies();

    // filter  
    if (params.query) {
      const { query } = params
      movies = movies.filter((movie) => {
        return movie.title.toLocaleLowerCase(LANG).includes(query.toLocaleLowerCase(LANG)) ||
          movie.overview.toLocaleLowerCase(LANG).includes(query.toLocaleLowerCase(LANG));
      })
    }

    if (params.genre) {
      const { genre } = params
      movies = movies.filter((movie) => {
        return movie.genres?.some((tempgenre) => genre.includes(tempgenre));
      })
    }

    // sort
    const ordering = {
      orderBy: params.orderBy ? params.orderBy : "title",
      direction: params.direction ? params.direction : "ASC"
    }

    switch (ordering.orderBy) {
      case 'title':
        movies.sort((a, b) => {
          if (ordering.direction == "ASC")
            return a.title.localeCompare(b.title, LANG);
          else
            return b.title.localeCompare(a.title, LANG);
        })
        break;

      case 'release_date':
        movies.sort((a, b) => {
          const aDate = new Date(a.release_date)
          const bDate = new Date(b.release_date)

          if (ordering.direction == "ASC")
            return aDate.getTime() - bDate.getTime();
          else
            return bDate.getTime() - aDate.getTime();
        });
        break;
      case 'vote_average':
        movies.sort((a, b) => {
          const aRating = a.vote_average ? a.vote_average : 0;
          const bRating = b.vote_average ? b.vote_average : 0;
          /*
          if (aRating == 0 && bRating != 0) return bRating;
          if (bRating == 0 && aRating != 0) return aRating;
          if (aRating == 0 && bRating == 0) return 0;
          */
          if (ordering.direction == "DESC")
            return bRating - aRating;
          else
            return aRating - bRating;
        });
        break;

      default:
        break;
    }

    // offset and limit
    const offsetAndLimit = {
      offset: params.offset ? params.offset : 0,
      limit: params.limit ? params.limit : 12
    }

    let result: SearchResults = {
      total: movies.length,
      movies: movies
    }

    movies = movies.splice(offsetAndLimit.offset,
      offsetAndLimit.limit > movies.length ? movies.length : offsetAndLimit.limit);
    result.movies = movies

    return result;

  } catch (error) {
    return {
      total: 0,
      movies: []
    }
  }
};
