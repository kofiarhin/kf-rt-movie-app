import { useEffect, useState } from "react";

const useUserGenres = (user) => {
  const [userGenres, setUserGenres] = useState([]);
  useEffect(() => {
    if (user) {
      const genres = JSON.parse(localStorage.getItem("genres"));
      setUserGenres(genres);
    }
  }, [user]);
  return { data: userGenres };
};

export default useUserGenres;
