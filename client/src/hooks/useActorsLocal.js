import { useEffect, useState } from "react";

const useActorsLocal = (user) => {
  const [actorsData, setActorsData] = useState([]);

  useEffect(() => {
    if (user) {
      const data = JSON.parse(localStorage.getItem("actors"));
      setActorsData(data);
    }
  }, [user]);
  return { data: actorsData };
};

export default useActorsLocal;
