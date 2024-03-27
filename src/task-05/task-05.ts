import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  //return Promise.reject('Not implemented');

  try {
    let osszesFilm: Movie[] = await MovieService.getMovies();
    const {
      query,
      genre,
      orderBy='title',
      direction='ASC',
      limit=12,
      offset=0
    } = params
  
      if(query)
      {
        const keresettErtek = query.toLocaleLowerCase();
        const keresett = osszesFilm.filter((film) => {
          return film.overview.toLocaleLowerCase().includes(keresettErtek)||film.title.toLocaleLowerCase().includes(keresettErtek);
        })
        osszesFilm = keresett;
      }

      if(genre) 
      {
      const keresett = osszesFilm.filter((film) => {
        genre.forEach(element => {
          if(film.genres?.includes(element))
          {
            return true;
          }
        });
        return false;
      })
      osszesFilm = keresett;
      }

    //osszesFilm.sort()

    if(orderBy == "title")
    {
      osszesFilm.sort((a,b) => {
        if(direction == "DESC")
        {
          return b.title.localeCompare(a.title, 'hu-HU');
        }
        else
        {
          return a.title.localeCompare(b.title, 'hu-HU');
        }
      })
    }
    else
    {
      if(orderBy == "vote_average")
      {
        osszesFilm.sort((a,b) => {
          let ertek1 = 0;
          let ertek2 = 0;
          if(a.vote_average)
          {
            ertek1 = a.vote_average;
          }
          if(b.vote_average)
          {
            ertek2 = b.vote_average;
          }
          const asc = ertek1 - ertek2;
          const desc = ertek2 - ertek1;
          return direction=="DESC"? desc : asc;
        })
      }
      else
      {
        if(orderBy == "release_date")
        {
          osszesFilm.sort((a,b) => {
            let datum1 : any = a.release_date;
            let datum2 : any = b.release_date;
            const asc = datum1 - datum2;
            const desc = datum2 - datum1;
            return direction=="DESC"? desc : asc;
          })
        }
      }
    }
    const talaltFilmSzama = osszesFilm.length;
    let eredmenyTomb : Movie[] = [];
    for(let i = offset; i<offset+limit; i++){
      if(osszesFilm.length>=i)
      {
        eredmenyTomb.push(osszesFilm[i]);
      }
      else
      {
        i=offset+limit;
      }
    }
    return {
      total: talaltFilmSzama,
      movies: eredmenyTomb
    }
  } catch (error) {
    return {
      total: 0,
      movies: []
    }
  }
};
