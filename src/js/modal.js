import modalTemplate from '../templates/modal.hbs';
import getGenres from './movies-genres.json';

const list = document.querySelector('.film-gallery');
const modalContainer = document.querySelector('.modal__container');

const modal = document.querySelector('[data-action="open-movie-modal"]');
const movieBack = document.querySelector('.movie-backdrop');
const modalCloseBtn = document.querySelector('[data-action="modal__close"]');

// list.addEventListener('click', openModal)
modalCloseBtn.addEventListener('click', closeMovieModal);
movieBack.addEventListener('click', eventOnBackdrop);

function closeMovieModal() {
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
  console.log('click');

  if (exit) {
    closeMovieModal();
  }
}

function onOpenModal() {
  modal.style.opacity = '1';
  modal.style.visibility = 'visible';
  // console.log('hey')
}

// ===================
list.addEventListener('click', openModal);
function openModal(e) {
  window.addEventListener('keydown', onEscKeyPress);
  e.preventDefault();

  if (e.target.classList.contains('film-gallery__img')) {
    document.body.classList.add('show-movie-modal');
    onOpenModal();

    const id = e.target.dataset.id;
    movieCard.fetchMovie(e.target.dataset.id).then(movie => {
      // console.log(movie)
      renderMarkup(movie);

      //Pasha
      onModalPopulateWatchedList(); //отмечаем просмотренные фильмы
      onModalPopulateQueueList(); //отмечаем фильмы в очереди
      // const addToWatchedBtn = document.querySelector('.modal-addToWatched');
      // const addToQueueBtn = document.querySelector('.modal-addToQueue');
      // addToWatchedBtn.addEventListener('click', e => {
      //   e.target.disabled = true;
      //   addWatchedIdToLS(id);
      // });
      // addToQueueBtn.addEventListener('click', e => {
      //   e.target.disabled = true;
      //   addQueueIdToLS(id);
      // });
    });
  }
}

//========= Pasha =========
function onModalPopulateWatchedList() {
  if (localStorage.getItem('WatchedList')) {
    const watchedArr = JSON.parse(localStorage.getItem('WatchedList'));
    const btnsWatchedList = document.querySelector('.modal-addToWatched');
    const btnsWatchedId = btnsWatchedList.dataset.id;
    if (watchedArr.includes(btnsWatchedId)) {
      btnsWatchedList.textContent = 'Watched';
      btnsWatchedList.disabled = true;
    }
  }
}
function onModalPopulateQueueList() {
  if (localStorage.getItem('QueueList')) {
    const QueueArr = JSON.parse(localStorage.getItem('QueueList'));
    const btnsQueueList = document.querySelector('.modal-addToQueue');
    const btnsQueueId = btnsQueueList.dataset.id;
    if (QueueArr.includes(btnsQueueId)) {
      btnsQueueList.textContent = 'In Queue';
      btnsQueueList.disabled = true;
    }
  }
}
//==========

function renderMarkup(movie) {
  modalContainer.innerHTML = '';
  modalContainer.insertAdjacentHTML('beforeend', modalTemplate(movie));
}
class renderMovieCard {
  constructor() {}

  // ++++++
  fetchMovie(id) {
    const KEY = '1d821060cfc3dc7c024273bf806840e9';
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US`;
    return (
      fetch(url)
        .then(response => response.json())
        //   .then(movie => movie)
        .then(movie => {
          //   console.log(movie)
          const change = {
            ...movie,
            // genres: generateGenres(movie),
            release_date: generateData(movie),
            vote_average: generateVote(movie),
          };
          return change;
        })
        .catch(error => Promise.reject(error))
    );
  }
}
const movieCard = new renderMovieCard();

const genres = JSON.stringify(getGenres);
const getObj = JSON.parse(genres);

// rate
function generateVote(movie) {
  if (movie.vote_average) {
    const vote_average = movie.vote_average.toFixed(1);
    return vote_average;
  }
}

// genres
function generateGenres(movie) {
  let idsGenre = movie.genres.map(id => {
    return getObj.find(ganre => ganre.id === id).name;
  });
  if (idsGenre.length > 2) {
    return [...idsGenre.slice(0, 2), 'Other'];
  }
  return idsGenre;
}

// year
function generateData(movie) {
  if (movie.release_date == undefined) {
    return Number(movie.first_air_date.slice(0, 4));
  } else if (movie.release_date) {
    const release_date = Number(movie.release_date.slice(0, 4));
    return release_date;
  }
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
