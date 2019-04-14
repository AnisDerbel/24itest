export default {
  BASE_URL: 'http://api.themoviedb.org/3/',
  IMAGE_BASE_URL : 'https://image.tmdb.org/t/p/w342',
  API_KEY: '00f203d4949cc13fb4ced18309a6214a',
  POPULAR_MOVIES_URL: 'movie/popular?language=en-US&page=1',
  POPULAR_TV_URL: 'tv/popular?page=1',
  DOCUMENTARY_URL: 'discover/movie?sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=99',
  FAMILY_URL: 'discover/movie?sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=10751',
  SEARCH_URL: (query) => `https://api.themoviedb.org/3/search/multi?query=${query}&page=1&include_adult=false`,
  ASSET_DETAILS_URL: (type,id) => `https://api.themoviedb.org/3/${type}/${id}`
}