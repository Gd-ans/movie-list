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
            const response = await fetch(url, { method: 'GET', headers }); // COMMENT THIS FOR SEE DEMO DATA
            if (!response.ok) {  // COMMENT THIS FOR SEE DEMO DATA
                throw new Error(`HTTP error! Status: ${response.status}`); // COMMENT THIS FOR SEE DEMO DATA
            }  // COMMENT THIS FOR SEE DEMO DATA

            const data = await response.json(); // COMMENT THIS FOR SEE DEMO DATA
            // setTimeout(() => { // COMMENT out THIS
            dispatch({ type: MovieSearchAction.GET_MOVIE_LIST_SUCCESS, payload: data }); // COMMENT THIS FOR SEE DEMO DATA
            //  dispatch({ type: MovieSearchAction.GET_MOVIE_LIST_SUCCESS, payload: dummyData }); // COMMENT out THIS
            // }, 1000); // COMMENT out THIS
        } catch (error) {
            // console.error('Error fetching movie list:', error);
            dispatch({ type: MovieSearchAction.GET_MOVIE_LIST_FAILURE, payload: error.message });
        }
    };
};

export { getMovieList, }