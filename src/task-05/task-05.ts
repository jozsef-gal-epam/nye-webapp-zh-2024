import { Movie, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
    try {
        // Alapértelmezett értékek beállítása
        const { query = '', genre = [], orderBy = 'title', direction = 'ASC', offset = 0, limit = 12 } = params;

        // Filmek lekérése a külső szolgáltatásból
        const movies: Movie[] = await MovieService.getMovies();

        // Szűrés a keresési feltételek alapján
        let filteredMovies = movies.filter(movie => {
            // Keresés a cím és a leírás alapján
            const matchTitle = movie.title.toLowerCase().includes(query.toLowerCase());
            const matchDescription = movie.overview.toLowerCase().includes(query.toLowerCase());

            // Ha nincs megadva keresési kifejezés, vagy a film címe vagy leírása megfelel a keresési feltételnek
            if (!query || matchTitle || matchDescription) {
                // Műfajszűrés: legalább az egyik kiválasztott műfajnak meg kell felelnie
                if (genre.length === 0 || genre.some(genre => movie.genres?.includes(genre))) {
                    return true;
                }
            }
            return false;
        });

        // Rendezés
        filteredMovies.sort((a, b) => {
            if (orderBy === 'title') {
                return direction === 'ASC' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
            } else if (orderBy === 'release_date') {
                const dateA = new Date(a.release_date).toISOString();
                const dateB = new Date(b.release_date).toISOString();
                return direction === 'ASC' ? dateA.localeCompare(dateB) : dateB.localeCompare(dateA);
            } else if (orderBy === 'vote_average') {
                // Ellenőrizzük, hogy a vote_average mező definiált-e mindkét filmben
                if (a.vote_average !== undefined && b.vote_average !== undefined) {
                    return direction === 'ASC' ? a.vote_average - b.vote_average : b.vote_average - a.vote_average;
                } else {
                    // Ha a mező egyik vagy mindkét filmnél nincs definiálva, akkor ne vegyük figyelembe a rendezés során
                    return 0;
                }
            } else {
                return 0;
            }
        });

        // Lapozás
        const total = filteredMovies.length;
        filteredMovies = filteredMovies.slice(offset, offset + limit);

        // Visszatérés az eredménnyel
        return {
            total,
            movies: filteredMovies
        };
    } catch (error) {
        // Üres eredmény visszaadása hiba esetén
        return {
            total: 0,
            movies: []
        };
    }
};
