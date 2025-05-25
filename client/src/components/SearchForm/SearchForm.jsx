import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector, useSlector } from "react-redux";
import { reset } from "../../redux/Pages/pageSlice";
const SearchForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pageNumber } = useSelector((state) => state.page);

  const [query, setQuery] = useState("terminator");
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    queryClient.invalidateQueries({
      queryKey: ["search", query, pageNumber],
    });
    dispatch(reset());
    navigate(`/search/${query}/1`);
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
