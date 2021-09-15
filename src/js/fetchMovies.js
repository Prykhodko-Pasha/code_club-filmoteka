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
      vote_average: generateVote(movie),
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
// rate
function generateVote(movie){
  if(movie.vote_average){
    const vote_average = movie.vote_average.toFixed(1);
    return vote_average;
  }
}
export { getMoviesDataById };












// const getMoviesDataBy = new CardsApiService()


//   getMoviesDataBy.fetchCards(url_movie)
// .then(response => {
//   // console.log(response)
//   const movies = { results: [] };
//   const fetchList = [];  
//   response.forEach(obj => {
//     console.log(bj.id)
      
//   });
//   });
//   return Promise.all(fetchList).then(() => {
//     return filmCard(movies);
//   })
// .catch(error => console.log(error)),

 

// export default function fetchApi(){
//     fetch(url)
//     .then( response =>  response.json())    
//     .then(movie =>{
        
//         //id       
//         movie.results.map(el =>{ 
//             let idsGenre = el.genre_ids
//             idsGenre.map(id => {                    
//                     // console.log(id)
//                 const getId = getObj.map( el => {                       
//                     if(el.id == id){
//                         // console.log(id)
//                         id = el.name
//                         console.log(id)                           
//                         return id
//                     }
//                 })
//             })
//         })
//             // if(idsGenre.length > 1){
//             //     const genres = idsGenre.slice(0, 1); 
//             //     console.log(genres, 'Other')}
//         // year
//             movie.results.map(el => {
//                 if(el.release_date){
//                 const date = Number(el.release_date.slice(0, 4));
//                 // Number(el.release_date.slice(0, 4))
//                 // console.log(date)
//             }
//             })    
        
//         // markup cards
//         // const markup = filmCard(movie)
//         refs.filmGallery.innerHTML= markup; 
//         })
//     .catch(error => console.log(error))    
//     }



