import "./cast.styles.scss";
import LazyImage from "../Lazy/LazyImage";
const Cast = ({ data }) => {
  return (
    <div id="cast">
      <h2>Cast</h2>
      <div className="cast-wrapper">
        {" "}
        {data.slice(0, 4).map((item) => {
          return (
            <div key={item.id} className="cast-item">
              <LazyImage
                src={`https://image.tmdb.org/t/p/w185/${item.profile_path}.jpg`}
              />
              <p> {item.original_name} </p>
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
};

export default Cast;
