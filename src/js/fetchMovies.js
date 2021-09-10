


import filmCard from '../templates/film-card.hbs';
import getGenres from './movies-genres.json';

const refs = {
  filmGallery: document.querySelector('.film-gallery'),
};

// inner genres obj
const genres = JSON.stringify(getGenres);
const getObj = JSON.parse(genres);

const API_KEY = '23824187957955af0aa1cb82b26c80b5';
const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/week'; 
const BASE_MOVIE_URL = 'https://api.themoviedb.org/3/movie';

const url = `${BASE_URL}?api_key=${API_KEY}&language=en-US&page=1`;
const url_movie = `${BASE_MOVIE_URL}/{movie_id}?api_key=${API_KEY}&language=en-US&page=1`;

function getMoviesDataById(movie_ids) {
  const movies = { results: [] };
  const fetchList = [];
  movie_ids.forEach(movie_id => {
    fetchList.push(
      fetch(url_movie.replace('{movie_id}', movie_id))
        .then(response => response.json())
        .then(movie => {

          // ===
          movie.genre_ids = movie.genres.map(genre => genre.id);
          movies.results.push(movie);
        })
        .catch(error => console.log(error)),
    );
  });
  return Promise.all(fetchList).then(() => {
    return filmCard(movies);
  });
}

export { getMoviesDataById};