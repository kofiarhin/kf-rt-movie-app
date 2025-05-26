import { useSelector } from "react-redux";
import useSearchQuery from "../../hooks/useSearchQuery";
import { increasePageNumber } from "../../redux/Pages/pageSlice";
import { useDispatch } from "react-redux";
import MovieList from "../../components/MovieList/MovieList";
import Spinner from "../../components/Spinner/Spinner";

// search page
const SearchPage = () => {
  const dispatch = useDispatch();
  const { pageNumber } = useSelector((state) => state.page);
  const { search } = useSelector((state) => state.search);

  const { data, isLoading } = useSearchQuery(search, pageNumber);
  console.log(pageNumber, search, data);

  if (isLoading) return <Spinner />;
  return (
    <div>
      <h1 className="heading center">
        {" "}
        Searching ''{search} {pageNumber} ''{" "}
      </h1>
      <MovieList data={data} />

      <button>Load More</button>
    </div>
  );
};

export default SearchPage;
