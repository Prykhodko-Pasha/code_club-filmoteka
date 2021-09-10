
import { fetchApi } from './fetchMovies';

fetchApi();


// import fetchMoviesCards from './fetchMovies';
// import filmCard from '../templates/film-card.hbs';

// import getGenres from './movies-genres.json';

// // inner genres obj
// const genres = JSON.stringify(getGenres);
// const getObj = JSON.parse(genres);

// const refs = {
//   filmGallery: document.querySelector('.film-gallery'),
//   genresMarkup: document.querySelector('.film-gallery__genre'),
//   dataMarkup: document.querySelector('.film-gallery__year'),
// };

// fetchMoviesCards()
//   .then(movies => {
//     const change = movies.results.map(movie => {
//       return {
//         ...movie,
//         genre_ids: generateGenres(movie),
//         release_date: generateData(movie),
//       };
//     });
//     console.log(change);
//     return change;
//   })
//   .then(renderMoviesCard)
//   .catch(error => console.log(error));

// разметка
// function renderMoviesCard(movie) {
//   const markup = filmCard(movie);
//   refs.filmGallery.innerHTML = markup;
// }

// жанры
// function generateGenres(movie) {
//   let idsGenre = movie.genre_ids.map(id => {
//     return getObj.find(ganre => ganre.id === id).name;
//   });
//   if (idsGenre.length > 2) {
//     return [...idsGenre.slice(0, 2), 'Other'];
//   }
//   return idsGenre;
// }

// год
// function generateData(movie) {
//   if (movie.release_date) {
//     const release_date = Number(movie.release_date.slice(0, 4));
//     return release_date;
//   }
// }

