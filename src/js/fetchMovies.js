
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

