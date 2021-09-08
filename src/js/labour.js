
import fetchMoviesCards from './fetchMovies';
import filmCard from '../templates/film-card.hbs';

import getGenres from './movies-genres.json';
    
// inner genres obj 
const genres = JSON.stringify(getGenres);
const getObj = JSON.parse(genres);

const refs ={
    filmGallery: document.querySelector('.film-gallery'),   
    genresMarkup: document.querySelector('.film-gallery__genre'),
    dataMarkup: document.querySelector('.film-gallery__year'),
}

// fetchMoviesCards()
// .then(renderMoviesCard)
// //   .then(renderMoviesCard)
//   .catch(error => console.log(error))
 
fetchMoviesCards()
.then(movies => {  
    const change =  movies.results.map(movie => {
    // console.log(movie)
    const x = generateGenres(movie)
    // console.log(x)
    // return {...movie, generateGenres}
    //     generateGenres(movie)
    // generateData(movie)
    
    })
    // console.log(change)
  })
//   .then(renderMoviesCard => {console.log(renderMoviesCard)})

function renderMoviesCard(movie){
    const markup = filmCard(movie);
    refs.filmGallery.innerHTML= markup;     
}
// markup
function generateGenres(movie){   
    // console.log(movie)
    let idsGenre = movie.genre_ids;
    // console.log(idsGenre, 'x')
        // if (idsGenre.length > 2){
        //     const genres = idsGenre.slice(0, 2);                               
            // console.log(genres)
        
        return idsGenre.map(genre_ids => { 
            // console.log(getObj)  
        const y =  getObj.filter( el => {
             if(el.id == genre_ids){
                 
                return el.name
             }
           
            // if(genre_ids== el.id ){
            
                // genre_ids = el.name               
                
                //   return el.name  
            // refs.filmGallery.insertAdjacentHTML('beforend', `<span>{{id}} &#124;</span>`);
            } )
            console.log(y)
            console.log(genre_ids)

        }); 
    
    // })
    // }    
}

function generateData(movie){
    // movies.results.map(movie => {
        // console.log(movies.release_date)
        if(movie.release_date){
        const release_date = Number(movie.release_date.slice(0, 4));
        // refs.generateData.insertAdjacentHTML('beforeend', 
        // `<span class='film-gallery__year'>
        //  {{date}}
        // </span>` )
        return release_date
        }
    // })
}











// ==== even
// fetchMoviesCards()
// .then(movies => {    
//     movies.results.map(movie => {
//         console.log((movie))
//        const markup =`li class='film-gallery__item'>
//        <img class="film-gallery__img" src=https://image.tmdb.org/t/p/w500/${movie.poster_path} alt=${movie.title}/>      
//        <div class='film-gallery__desc'>
//          <p class='film-gallery__name'>
//              ${movie.original_title}
//              </p>
//          <p class='film-gallery__genre'>
           
//          </p>      
//        </div>
//      </li>`
//      console.log(markup)
    
   
//         const markup = filmCard(movie);  
//         refs.filmGallery.innerHTML= markup; 
//         console.log(markup)
//         generateGenres(movie)
//         console.log(movie.release_date)
//         let idsGenre = movie.genre_ids;
//         if (idsGenre.length > 2){
//             const genres = idsGenre.slice(0, 2);                               
//             // console.log(genres)

//         genres.map(id => {   
//         const getId = getObj.map( el => {                       
//             if(id == el.id ){
//                 id = el.name               
//                 // console.log(id)           
//                 // refs.filmGallery.innerHTML =  `<span>{{id}} &#124;</span>`;
//         } 
//         }    
// )
// })
//         }
//     })
   
// })
// .catch(error => console.log(error));
// ===


// function corectsGenres(movies){
   
//     movies.results.map(el =>{ 
//         let idsGenre = el.genre_ids
//         if(idsGenre.length > 2){
//             const genres = idsGenre.slice(0, 2);                               
            
//             genres.map(id => {   
//             const getId = getObj.map( el => {                       
//                 if(id == el.id ){
//                     id = el.name                          
//                     return id
//                     } 
//                 })
//             })
//             }            
//         })  
// }

 // movies.results.map(el =>{
    //     let idsGenre = el.genre_ids
    //     // console.log(idsGenre)
    //     idsGenre.map(id =>{
    //         const getId = getObj.map( el => {                       
    //         if(id == el.id ){
    //             // console.log(id)
    //             id = el.name   
    //             // console.log(id)                       
    //             return id
    //             } 
    //         })
    //     })
    // })