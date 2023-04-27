import { useEffect, useState } from 'react';

export default function useDataTableParams() {
  const [pageNumber, setPageNumber] = useState(2);
  const [pageLimit, setPageLimit] = useState(50);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
  }, [pageNumber]);
  // setting tha initial pageNumber
  // we need to know if there is more data
  const nextPage = (res, students) => {
    setPageNumber((prevPageNumber) => (prevPageNumber + 1));
    setHasMore(students < res.count);
    setIsFetching(false);
  };
  // Change number of raw per pages
  function handleChangeRowPerPage(rowsPerPage) {
    setPageLimit(rowsPerPage);
    setPageNumber(1);
  }
  // Change pages on select next or previous
  function handlePageNumberChange(page) {
    setPageNumber(page);
  }
  /*
   * FilterData search the data and get the list data
   */
  return {
    pageNumber,
    pageLimit,
    isFetching,
    hasMore,
    nextPage,
    setHasMore,
    setIsFetching,
    handlePageNumberChange,
    setPageNumber,
    handleChangeRowPerPage,
  };
}
