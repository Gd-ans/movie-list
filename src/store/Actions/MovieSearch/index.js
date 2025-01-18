import MovieSearchAction from "./actionType"
import dummyData from './dummyData.json'
const getMovieList = () => {
    return async (dispatch) => {
        const url = 'https://imdb236.p.rapidapi.com/imdb/top250-movies';
        const headers = {
            'x-rapidapi-key': 'd86a148661msh996dadcdc5f05c9p1d6f54jsnd9402192549c',
            'x-rapidapi-host': 'imdb236.p.rapidapi.com',
        };
        dispatch({ type: 'GET_MOVIE_LIST_LOADING' });
        try {
            const response = await fetch(url, { method: 'GET', headers });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            // setTimeout(() => {
            dispatch({ type: MovieSearchAction.GET_MOVIE_LIST_SUCCESS, payload: data });
            // }, 2000);
        } catch (error) {
            console.error('Error fetching movie list:', error);
            dispatch({ type: MovieSearchAction.GET_MOVIE_LIST_FAILURE, payload: error.message });
        }
    };
};

export { getMovieList, }