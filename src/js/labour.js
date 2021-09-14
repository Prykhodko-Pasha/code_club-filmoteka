
// import getMoviesDataById from './fetchMovies';
import filmCard from '../templates/film-card.hbs';
import getGenres from './movies-genres.json';
import CardsApiService from './apiService'

// inner genres obj
const genres = JSON.stringify(getGenres);
const getObj = JSON.parse(genres);


const refs = {
  filmGallery: document.querySelector('.film-gallery'),
};

const API_KEY = '23824187957955af0aa1cb82b26c80b5';
const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/week'; 

const urlForTrend = `${BASE_URL}?api_key=${API_KEY}&language=en-US&page=1`;


const fetchApi = new CardsApiService();

 export default fetchApi.fetchCards(urlForTrend)
  .then(results => {   
    // console.log(results)
      const change = results.map(movie => {
        // console.log(movie)
        return {
          ...movie,
          genre_ids: generateGenres(movie),
          release_date: generateData(movie),
        };
      });
      // console.log(change)
      return change;
    })
    .then(renderMoviesCard)
    .catch(error => console.log(error));



// разметка
function renderMoviesCard(movie) {
  console.log(movie,'this is from render')
  const markup = filmCard(movie);
  refs.filmGallery.innerHTML = markup;
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

// год
function generateData(movie) {
  if(movie.release_date == undefined){   
    // console.log("unknown") 
    return movie.release_date = "unknown";    
  }  else if(movie.release_date) { 
    const release_date = Number(movie.release_date.slice(0, 4));
    return release_date;
  }

}













// ====
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

