import useCharacterMovies from "../../hooks/useCharacterMovies";
import { useSearchParams } from "react-router-dom";

const Playground = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query"); // returns '28' if URL is ?genre=28
  console.log(query);

  const { data } = useCharacterMovies(query);
  console.log(data);
  return <div>Playground</div>;
};

export default Playground;
