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


        // COMMENT THIS FOR SEE DUMMY DATA--------->
        //start 
        try {
            const response = await fetch(url, { method: 'GET', headers });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            dispatch({ type: MovieSearchAction.GET_MOVIE_LIST_SUCCESS, payload: data });

        } catch (error) {
            dispatch({ type: MovieSearchAction.GET_MOVIE_LIST_FAILURE, payload: error.message });
        }

        //End

        // COMMENT OUT THIS FOR SEE DUMMY DATA--------->

        // try {
        //     setTimeout(() => {
        //         dispatch({ type: MovieSearchAction.GET_MOVIE_LIST_SUCCESS, payload: dummyData });
        //     }, 1000);
        // } catch (error) {
        //     dispatch({ type: MovieSearchAction.GET_MOVIE_LIST_FAILURE, payload: error.message });
        // }
    };
};

export { getMovieList, }