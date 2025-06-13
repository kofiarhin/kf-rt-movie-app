import "./cast.styles.scss";
import LazyImage from "../Lazy/LazyImage";
import { Link } from "react-router-dom";
const Cast = ({ data }) => {
  return (
    <div id="cast">
      <div className="cast-wrapper">
        {" "}
        {data.slice(0, 4).map((item) => {
          return (
            <div key={item.id} className="cast-item">
              <Link to={`/actors/${item.original_name}`}>
                <LazyImage
                  src={`https://image.tmdb.org/t/p/w185/${item.profile_path}.jpg`}
                />
              </Link>
              <Link to={`/actors/${item.original_name}`}>
                {" "}
                <p> {item.original_name} </p>{" "}
              </Link>
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
};

export default Cast;
