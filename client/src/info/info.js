(() => {
  const movieId = 63770;
  const pageNumber = 1;

  // "/f7JYJxF8AjdKRPfEfQRZOX8S29v.jpg"
  const imageUrl = `https://image.tmdb.org/t/p/w1280/f7JYJxF8AjdKRPfEfQRZOX8S29v.jpg`;
  const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=ca357c71903c409f2ce08d61e75700a6&language=en-US`;
  const moviesUrl = `https://api.themoviedb.org/3/tv/popular?api_key=ca357c71903c409f2ce08d61e75700a6&language=en-US&page=${pageNumber}`;

  //   get movies
  const getMovies = async () => {
    const res = await fetch(movieUrl);
    const data = await res.json();
    console.log(data);
  };
  getMovies();
})();
