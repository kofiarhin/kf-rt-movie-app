import "./searchPage.styles.scss";
import { useLocation } from "react-router-dom";
import useSearchQuery from "../../hooks/useSearchQuery";
import MovieList from "../../components/MovieList/MovieList";
import Spinner from "../../components/Spinner/Spinner";
import { useState } from "react";
import SearchForm from "../../components/SearchForm/SearchForm";

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
    <div id="search">
      {query ? (
        <>
          <h1 className="heading">
            {" "}
            You are searching <span>{query}</span>{" "}
          </h1>
          <SearchForm />

          {data && <MovieList data={data} />}
          <button onClick={handlePageNumber}>Load More</button>
        </>
      ) : (
        <>
          <h1 className="heading">Start movies search....</h1>
          <SearchForm />
        </>
      )}
    </div>
  );
};

export default SearchPage;
