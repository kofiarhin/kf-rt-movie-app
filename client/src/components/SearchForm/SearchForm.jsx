import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset as pageReset } from "../../redux/Pages/pageSlice";
import { setSearch } from "../../redux/search/searchSlice";
import { toggleSideNav } from "../../redux/navigation/navigationSlice";

// search form
const SearchForm = () => {
  const { isOpen } = useSelector((state) => state.navigation);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pageNumber } = useSelector((state) => state.page);

  const [query, setQuery] = useState("");
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
  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
