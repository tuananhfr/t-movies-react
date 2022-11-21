const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "23d4843f040e380e60ae6f1b20e79648",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
