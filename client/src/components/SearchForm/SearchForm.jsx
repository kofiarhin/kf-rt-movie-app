import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { reset as pageReset } from "../../redux/Pages/pageSlice";
import { setSearch } from "../../redux/search/searchSlice";
import {
  toggleSideNav,
  closeSideNav,
} from "../../redux/navigation/navigationSlice";
import { BASE_IMAGE_URL } from "../../constants/constants";
import { FaSearch } from "react-icons/fa";
import useSearchQuery from "../../hooks/useSearchQuery";
import { Link } from "react-router-dom";
import "./searchForm.styles.scss";

// search form
const SearchForm = ({ showSuggestion = true }) => {
  const { isOpen } = useSelector((state) => state.navigation);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pageNumber } = useSelector((state) => state.page);

  const [query, setQuery] = useState("");
  const { data: searchData } = useSearchQuery(query);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query) return;
    dispatch(setSearch(query));
    dispatch(pageReset());
    if (isOpen) {
      dispatch(toggleSideNav());
    }
    navigate(`/search?query=${query}`);

    setQuery("");
    // dispatch(reset());
    // navigate(`/search/${query}/1`);
  };

  const handleChange = async (e) => {
    setQuery(e.target.value);
  };
  return (
    <div className="search-form">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <div className="suggestions">
        {showSuggestion && searchData?.length > 0 ? (
          <>
            {searchData.slice(0, 2).map((item) => {
              return (
                <Link
                  to={`/movies/${item.id}`}
                  className="suggestion-unit"
                  onClick={() => dispatch(closeSideNav())}
                >
                  <h2> {item.original_title} </h2>
                  <img src={`${BASE_IMAGE_URL}${item.backdrop_path}`} />
                </Link>
              );
            })}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SearchForm;
