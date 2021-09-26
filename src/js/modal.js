import modalTemplate from '../templates/modal.hbs';

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
    movieCard.fetchMovie(id).then(movie => {
      // console.log(movie);
      renderMarkup(movie);
      makeVideo.fetchVideo(id).then(movie => {
        const videoKey = movie.results[0].key;
        // console.log(movie.results);
        renderVideo(videoKey);
      });

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
const KEY = '1d821060cfc3dc7c024273bf806840e9';
class renderMovieCard {
  constructor() {}

  // ++++++
  fetchMovie(id) {
    // const KEY = '1d821060cfc3dc7c024273bf806840e9';
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US`;
    return (
      fetch(url)
        .then(response => response.json())
        //   .then(movie => movie)
        .then(movie => {
          //   console.log(movie)
          const change = {
            ...movie,
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

function renderVideo(videoKey) {
  const videoBox = document.querySelector('.video');
  videoBox.innerHTML = '';
  videoBox.insertAdjacentHTML('beforeend', modalTemplate(videoKey));
  console.log(videoBox.insertAdjacentHTML('beforeend', modalTemplate(videoKey)));
}

// ============
// rate
function generateVote(movie) {
  if (movie.vote_average) {
    const vote_average = movie.vote_average.toFixed(1);
    return vote_average;
  }
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
const options = {
  method: 'GET',
  headers: {
    // 'Access-Control-Allow-Origin': 'hhttps://api.themoviedb.org/3',
    'Content-Type': 'application/json; charset=UTF-8',
  },
};
class Video {
  constructor() {}

  fetchVideo(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}&language=en-US`;
    return fetch(url, options)
      .then(response => response.json())
      .then(movie => {
        return movie;
      })
      .catch(error => Promise.reject(error));
  }
}
const makeVideo = new Video();
