import { useEffect, useState } from 'react';
import movieDB from "../api/movieDB";
import { MovieDBMoviesResponse, Movie } from '../interfaces/movieInterface';

interface MoviesState {
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    upcoming: Movie[];
}

const useMovies = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [moviesState, setMoviesState] = useState<MoviesState>({
        nowPlaying: [],
        popular: [],
        topRated: [],
        upcoming: []
    });

    const getMovies = async () => {
        const nowPlayingPromise = movieDB.get<MovieDBMoviesResponse>('/now_playing');
        const popularPromise = movieDB.get<MovieDBMoviesResponse>('/popular');
        const topRatedPromise = movieDB.get<MovieDBMoviesResponse>('/top_rated');
        const upcomingPromise = movieDB.get<MovieDBMoviesResponse>('/upcoming');

        const resps = await Promise.all([
            nowPlayingPromise,
            popularPromise,
            topRatedPromise,
            upcomingPromise
        ]);

        setMoviesState({
            nowPlaying: resps[0].data.results,
            popular: resps[0].data.results,
            topRated: resps[2].data.results,
            upcoming: resps[3].data.results
        })
        setIsLoading(false);
    }
    useEffect(() => {
        // now_playing
        getMovies()
    }, [])
    // ↑ At first I just console.log to the resp.data to get a json to help me generate the interfaces using PasteJSONasCode.
    return {
        ...moviesState,
        isLoading
    }
}

export default useMovies