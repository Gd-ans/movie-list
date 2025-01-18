import React, { useEffect, useState } from 'react'
import './pagination.css'
const Pagination = ({ data, shows, pageNumber, setPageNumber }) => {
    const [total, setTotal] = useState(null)
    useEffect(() => {
        setTotal(data?.length)
    }, [data])
    const startIndex = (pageNumber - 1) * shows + 1;
    const endIndex = Math.min(pageNumber * shows, total);
    const handlerArrowBtns = (type) => {
        if (type === 'prev') {
            setPageNumber(prevPage => Math.max(prevPage - 1, 1));
        } else if (type === 'next') {
            setPageNumber(prevPage => Math.min(prevPage + 1, Math.ceil(total / shows)));
        }
    }
    return (
        <div className={`pagination-wrapper`}>
            <div className="pagination-item">
                <p className="text-wrapper">
                    {`${data?.length ? startIndex : 0} - ${endIndex} of ${total}`}
                </p>

                <div className="arrow-btn-wrap">
                    <button
                        className={`arrow left transparent mr-10`}
                        onClick={() => handlerArrowBtns('prev')}
                        disabled={pageNumber === 1}
                    >
                        <i className='icon'></i>
                    </button>
                    <button
                        className={`arrow right transparent`}
                        onClick={() => handlerArrowBtns('next')}
                        disabled={pageNumber * shows >= total}
                    >   <i ></i></button>
                </div>
            </div>
        </div>
    )
}

export default Pagination