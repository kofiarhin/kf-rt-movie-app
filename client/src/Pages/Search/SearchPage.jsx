import { useParams } from "react-router-dom";
import useSearch from "../../hooks/useSearchQuery";
import { useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import Spinner from "../../components/Spinner/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { increasePageNumber } from "../../redux/Pages/pageSlice";

// searh page
const SearchPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { query } = useParams();
  const { pageNumber: globalPageNumber } = useSelector((state) => state.page);
  const {
    data: searchData,
    error,
    isLoading,
  } = useSearch(query, globalPageNumber);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <h1 className="heading"> You are searching {query} </h1>
      {searchData && <MovieList data={searchData} />}
      <button
        classNeme="btn btn-default"
        onClick={() => dispatch(increasePageNumber())}
      >
        Load More
      </button>
    </div>
  );
};

export default SearchPage;
