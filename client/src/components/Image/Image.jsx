import LazyImage from "../Lazy/LazyImage";

const Image = ({ url }) => {
  const imgUrl = `https://image.tmdb.org/t/p/w1280${url}`;
  // return <img src={imgUrl} />;
  return <LazyImage src={imgUrl} />;
};

export default Image;
