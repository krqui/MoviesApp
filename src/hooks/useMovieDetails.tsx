import { useState, useEffect } from 'react';
import movieDB from '../api/movieDB';
import { MovieFull } from '../interfaces/movieInterface';
import { CreditsResponse, Cast } from '../interfaces/creditsInterface';

interface MovieDetails {
    cast: Cast[],
    isLoading: boolean,
    movieFull?: MovieFull
}

const useMovieDetails = (movieId: number) => {
    const [state, setState] = useState<MovieDetails>({
        isLoading: true,
        movieFull: undefined,
        cast: []
    });
    // console.log(movieId)
    const getMovieDetails = async () => {
        /*const resp = await movieDB.get<MovieFull>(`/${movieId}`)
        console.log(resp.data.overview)*/
        const movieDetailsPromise = movieDB.get<MovieFull>(`${movieId}`);
        const castPromise = movieDB.get<CreditsResponse>(`${movieId}/credits`);

        const [movieDetailsResp, castPromiseResp] = await Promise.all([movieDetailsPromise, castPromise])

        setState({
            isLoading: false,
            movieFull: movieDetailsResp.data,
            cast: castPromiseResp.data.cast
        })
    }
    useEffect(() => {
        getMovieDetails();
    }, []);

    return {
        ...state
    }
}


export default useMovieDetails
