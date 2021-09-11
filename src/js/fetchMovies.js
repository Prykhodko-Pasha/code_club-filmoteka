import filmCard from '../templates/film-card.hbs';
import getGenres from './movies-genres.json';

const genres = JSON.stringify(getGenres);
const getObj = JSON.parse(genres);

const API_KEY = '23824187957955af0aa1cb82b26c80b5';
// const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/week';
const BASE_MOVIE_URL = 'https://api.themoviedb.org/3/movie';

const url_movie = `${BASE_MOVIE_URL}/{movie_id}?api_key=${API_KEY}&language=en-US&page=1`;

function getMoviesDataById(movie_ids) {
  let movies = { results: [] };
  const fetchList = [];
  movie_ids.forEach(movie_id => {
    fetchList.push(
      fetch(url_movie.replace('{movie_id}', movie_id))
        .then(response => response.json())
        .then(movie => {
          movie.genre_ids = movie.genres.map(genre => genre.id);
          movies.results.push(movie);
        })
        .catch(error => console.log(error)),
    );
  });
  return Promise.all(fetchList).then(() => {
    return filmCard(normaliseMovies(movies.results));
  });
}
function normaliseMovies(movies) {
  const result = [];
  for (const movie of movies) {
    result.push({
      ...movie,
      genre_ids: generateGenres(movie),
      release_date: generateData(movie),
    });
  }
  return result;
}

// год
function generateData(movie) {
  if (movie.release_date == undefined) {
    return (movie.release_date = 'Soon');
  } else if (movie.release_date) {
    const release_date = Number(movie.release_date.slice(0, 4));
    return release_date;
  }
}
// жанры
function generateGenres(movie) {
  let idsGenre = movie.genre_ids.map(id => {
    return getObj.find(ganre => ganre.id === id).name;
  });
  if (idsGenre.length > 2) {
    return [...idsGenre.slice(0, 2), 'Other'];
  }
  return idsGenre;
}

export { getMoviesDataById };
