import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
const SearchForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [query, setQuery] = useState("terminator");
  // handle submit
  const handleSubmit = async (e) => {
    // queryClient.invalidateQueries({ queryKey: ["search", 1] });
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
