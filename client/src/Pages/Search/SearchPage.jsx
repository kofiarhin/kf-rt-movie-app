import { useLocation } from "react-router-dom";
import useSearchQuery from "../../hooks/useSearchQuery";
import MovieList from "../../components/MovieList/MovieList";
import Spinner from "../../components/Spinner/Spinner";
import { useState } from "react";
import "./searchPage.styles.scss";

// search page
const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query"); // → "terminator
  const [pageNumber, setPageNubmer] = useState(1);
  const { data, isLoading, error } = useSearchQuery(query, pageNumber);

  if (isLoading) return <Spinner />;

  const handlePageNumber = () => {
    setPageNubmer((prev) => prev + 1);
  };

  return (
    <div className="search">
      <h1 className="heading">
        {" "}
        You are searching <span>{query}</span>{" "}
      </h1>
      {data && <MovieList data={data} />}
      <button onClick={handlePageNumber}>Load More</button>
    </div>
  );
};

export default SearchPage;
