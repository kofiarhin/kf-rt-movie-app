import { useParams } from "react-router-dom";
import useSearch from "../../hooks/useSearchQuery";
import { useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import Spinner from "../../components/Spinner/Spinner";

// searh page
const SearchPage = () => {
  const params = useParams();
  const { query, pageNumber: searchPageNumber } = useParams();
  const [pageNumber, setPageNumber] = useState(searchPageNumber);
  const { data: searchData, error, isLoading } = useSearch(query, pageNumber);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <h1 className="heading"> You are searching {query} </h1>
      {searchData && <MovieList data={searchData} />}
      <button
        classNeme="btn btn-default"
        onClick={() => setPageNumber((prev) => prev + 1)}
      >
        Load More
      </button>
    </div>
  );
};

export default SearchPage;
