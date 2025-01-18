const initialState = {
    data: [],
    loading: false,
    error: null,
};

const movieSearch = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_MOVIE_LIST_LOADING':
            return { ...state, loading: true, };
        case 'GET_MOVIE_LIST_SUCCESS':
            return { ...state, data: action.payload, loading: false };
        case 'GET_MOVIE_LIST_FAILURE':
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};


export default movieSearch