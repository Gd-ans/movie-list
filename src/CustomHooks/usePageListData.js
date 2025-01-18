import { useMemo } from "react";

const usePageListData = (data = [], pageNumber = 1) => {
    // Ensure data is an array and pageNumber is a valid number
    const validData = Array.isArray(data) ? data : [];
    const validPageNumber = typeof pageNumber === 'number' && pageNumber > 0 ? pageNumber : 1;

    const showsPerPage = validData.length < 20 ? validData.length : 20; // Number of items to show per page
    const startIndex = (validPageNumber - 1) * showsPerPage;
    const endIndex = Math.min(validPageNumber * showsPerPage, validData.length);

    const dataForCurrentPage = useMemo(() => {
        return validData.slice(startIndex, endIndex);
    }, [validPageNumber, startIndex, endIndex, validData]);

    return dataForCurrentPage;
}

export default usePageListData;
