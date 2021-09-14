import modalTemplate from '../templates/modal.hbs';
// import CardsApiService from './apiService';
const list = document.querySelector('.film-gallery');

const modal = document.querySelector('[data-action="open-movie-modal"]');
const movieBack = document.querySelector('.movie-backdrop')
const modalCloseBtn = document.querySelector('[data-action="modal__close"]');


list.addEventListener('click', openModal)
modalCloseBtn.addEventListener('click', closeMovieModal)
movieBack.addEventListener('click', eventOnBackdrop)

function closeMovieModal(){
    window.removeEventListener('keydown', onEscKeyPress);
    document.body.classList.remove('show-movie-modal');
}

function eventOnBackdrop(e) {
    if (e.currentTarget === e.target) {
      closeMovieModal();
    }
  }

  function onEscKeyPress(e) {
    const ESC_KEY_CODE = 'Escape';
    const exit = e.code === ESC_KEY_CODE;
    console.log('click')

    if (exit) {
    closeMovieModal();
    }
  }


function openModal(e){
    e.preventDefault();
    if (e.target.classList.contains('film-gallery__img')) { 
        document.body.classList.add('show-movie-modal');
        onOpenModal(e.target.dataset.id); 
      }     
}

// ===========
function onOpenModal(id) { 
    // console.log('Клик по карточке фильма'); 
    modal.style.opacity = '1'; 
    modal.style.visibility = 'visible';

  
}


function renderMovieCard(id){    
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=1d821060cfc3dc7c024273bf806840e9&language=en-US`;
      return fetch(url)
        .then(response => response.json())
        .then(data => data)
        .catch(error => Promise.reject(error))
}


     














// const list = document.querySelector('.film-gallery');
// list.addEventListener('click', renderCard);
// function renderCard(e) {
//   e.preventDefault();
//   if (e.target.dataset.id.length == 5) {
//     const id = e.target.dataset.target.imdb_id;
//     console.log(id, 'imdb_id');
//     return id;
//   } else if (e.target.dataset.id) {
//     const id = e.target.dataset.id;
//     console.log(id, 'id');
//     return id;
//   }

//   const id = e.target.dataset.id;
//   const url = `https://api.themoviedb.org/3/movie/${id}?api_key=1d821060cfc3dc7c024273bf806840e9&language=en-US`;
//   return fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data, 'hi from data');
//       return data;
//     });
// }

// modalOverlay.addEventListener('click', onCloseModal);
// function onCloseModal() {
//   modal.style.opacity = '0';
//   modal.style.visibility = 'hidden';
//   modal.innerHTML = '';
// }

// function onModalClose() {
//   modal.style.opacity = '0';
//   modal.style.visibility = 'hidden';
//   modal.innerHTML = '';
// }

// modalOpen.forEach((elem) => {
//   elem.addEventListener('click', () => {
//     modal.style.opacity = '1';
//     modal.style.visibility = 'visible';
//     modal.insertAdjacentHTML('beforeend', modalTemplate())
//   })
// });

// modalCloseBtn.addEventListener('click', modalClose);


// modal.addEventListener('click', (e) => {
//     e.preventDefault();
//   if(e.target == modal) {
//     modal.style.opacity = '0';
//     modal.style.visibility = 'hidden';
//   }
// });

// export default class CardsApiService {
//   constructor() {
//       this.movie.id = movie.id
//   }
//    fetchCard(){
       
//       return fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=23824187957955af0aa1cb82b26c80b5&language=en-US`)
//       .then(resp => resp.json()).catch(error => console.log(error))
//     }
//   }

//  const fetchCard = new CardsApiService()
// function renderOneMovie(e){
//   e.preventDefault

//   fetchCard.fetchCard().then(movie =>
//       return {
//         ...movie,
//         genre_ids: generateGenres(movie),
//         release_date: generateData(movie),
//         vote_average: generateVote(movie),
//       };
// })
 