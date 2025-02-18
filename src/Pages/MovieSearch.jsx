import React, { useEffect, useState } from 'react';
import "./movieSearch.css";
import { useDispatch, useSelector } from 'react-redux';
import { getMovieList } from '../store/Actions/MovieSearch';
import Pagination from '../CommonComponents/Pagination/Pagination';
import usePageListData from '../CustomHooks/usePageListData';

const MovieSearch = () => {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [pageNumber, setPageNumber] = useState(1);

    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.movieSearch);

    useEffect(() => {
        dispatch(getMovieList());
    }, [dispatch]);

    // Debounce logic  
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 200);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    // Filter movies  
    const filteredData = data?.filter((movie) =>
        movie?.primaryTitle?.toLowerCase()?.includes(debouncedQuery?.toLowerCase())
    );

    // Get data for the current page
    const dataForCurrentPage = usePageListData(filteredData, pageNumber);

    return (
        <div className="movie-search">
            <h1>Movie Search Application</h1>
            <Pagination
                data={filteredData}
                shows={filteredData?.length < 20 ? filteredData?.length : "20"}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
            />
            <input
                type="search"
                placeholder="Search for movies..."
                value={query}
                onChange={(e) => { return setQuery(e.target.value), setPageNumber(1) }}
            />
            {loading ? (
                <div className="three-dots-loader">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>


            ) : error ? (
                <div className="error-message">Error: {error}</div>
            ) : (
                <div className="movie-list">
                    {dataForCurrentPage?.length ? dataForCurrentPage?.map((movie) => (
                        <div key={movie.id} className="movie-item">
                            <img
                                src={movie?.primaryImage && movie?.primaryImage}
                                alt={movie?.primaryImage && movie?.primaryImage}
                                loading="lazy"
                                className="movie-image"
                            />
                            <div className="movie-details">
                                <h2 className="movie-title">{movie?.primaryTitle && movie?.primaryTitle}</h2>
                                <p className="movie-description">{movie?.description && movie?.description}</p>
                            </div>
                        </div>
                    )) : <p className="movie-description">No data found !</p>
                    }
                </div>
            )}

        </div>
    );
};

export default MovieSearch;
