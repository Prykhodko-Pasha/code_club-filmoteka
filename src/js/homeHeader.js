import { getMoviesDataById } from './fetchMovies';
import homePage from './paginationFromFetch';
import Library from '../templates/library.hbs';

const renderLibrary = document.querySelector('#headLibr');
const includeHeader = document.querySelector('.header__main');
const librarySection = document.querySelector('.js-librarySection');
const libraryList = librarySection.querySelector('ul');

const btnHome = document.querySelector('.js-homeButton');
btnHome.addEventListener('click', homePage);

async function renderLibraryPage(moviesWatched, moviesQueue) {
  //Pasha
  const preloaderEl = document.querySelector('.preloader');
  const preloaderImg = document.querySelector('.preloader__img');
  // console.log('!!!!!!!!!!!!');
  preloaderEl.classList.remove('hide');

  setTimeout(() => (preloaderImg.style.opacity = '1'), 100); //скрываем скачок изображения при перезагрузке
  //======

  includeHeader.style.cssText = `display: none`;
  renderLibrary.innerHTML = Library();
  const markupWatched = await getMoviesDataById(moviesWatched);
  const markupQueue = await getMoviesDataById(moviesQueue);

  const logoHomePageLibrary = document.querySelector('.header-library-logo');
  logoHomePageLibrary.addEventListener('click', homePage);

  libraryList.innerHTML = markupWatched;
  //=============== Pasha ===============
  changeWatchBtns();
  onPopulateQueueList();
  setTimeout(function () {
    preloaderEl.classList.add('hide');
  }, 1900);
  //====================================

  const btnHome = document.querySelector('.js-homeButton');
  btnHome.addEventListener('click', homePage);

  const buttonWatched = document.querySelector('.js-buttonWatched');
  const buttonQueue = document.querySelector('.js-buttonQueue');

  buttonWatched.addEventListener('click', () => {
    buttonWatched.classList.add('current-btn');
    buttonQueue.classList.remove('current-btn');

    libraryList.innerHTML = markupWatched;

    //=============== Pasha ===============
    changeWatchBtns();
    onPopulateRemovedFromWatchedList();
    onPopulateQueueList();
    //====================================
  });
  buttonQueue.addEventListener('click', () => {
    buttonQueue.classList.add('current-btn');
    buttonWatched.classList.remove('current-btn');

    libraryList.innerHTML = markupQueue;

    //=============== Pasha ===============
    const btnsQueue = document.querySelectorAll('.toQueue');
    btnsQueue.forEach(btn => {
      btn.innerHTML = '<i class="material-icons js-removeFromQueue"> delete_sweep </i></button>';
      btn.title = 'Remove from Queue';
    });
    onPopulateRemovedFromQueueList();
    onPopulateWatchedList();
    //======================================
  });
}
export { renderLibraryPage };

// ==============Юля
// const btnLibrary = document.querySelector('#library')
// btnLibrary.addEventListener('click', console.log('bum'))

// function removeFromQueue(btnsAddQueue) {
//   btnsAddQueue.forEach(el => {
//     if (el.classList.contains('js-addToQueue')) {
//       el.classList.remove('js-addToQueue');
//       el.classList.add('js-remove');
//       el.title = 'Remove from Queue';
//       // el.innerHTML = '<i class="material-icons"> delete_sweep </i></button>';
//     }
//   });
// }

// function removeFromWatch(btnsAddWatched) {
//   btnsAddWatched.forEach(el => {
//     if (el.classList.contains('js-addToWatched')) {
//       el.classList.remove('js-addToWatched');
//       el.classList.add('js-remove');
//       el.textContent = 'Remove from Watched';
//     }
//   });
// }

// function addHidden(arr) {
//   arr.forEach(el => {
//     el.classList.add('visually-hidden');
//   });
// }

//Pasha
function onPopulateWatchedList() {
  if (localStorage.getItem('WatchedList')) {
    const watchedArr = JSON.parse(localStorage.getItem('WatchedList'));
    const btnsWatchedList = document.querySelectorAll('.toWatched');
    btnsWatchedList.forEach(btn => {
      if (watchedArr.includes(btn.dataset.id)) {
        btn.disabled = true;
      }
    });
  }
}
function onPopulateQueueList() {
  if (localStorage.getItem('QueueList')) {
    const QueueArr = JSON.parse(localStorage.getItem('QueueList'));
    const btnsQueueList = document.querySelectorAll('.toQueue');
    btnsQueueList.forEach(btn => {
      if (QueueArr.includes(btn.dataset.id)) {
        btn.disabled = true;
      }
    });
  }
}

function changeWatchBtns() {
  const btnsWatched = document.querySelectorAll('.toWatched');
  btnsWatched.forEach(btn => {
    btn.innerHTML = '<i class="material-icons js-removeFromWatched"> visibility_off </i></button>';
    btn.title = 'Remove from Watched';
  });
}

function onPopulateRemovedFromWatchedList() {
  if (localStorage.getItem('WatchedList')) {
    const watchedArr = JSON.parse(localStorage.getItem('WatchedList'));
    const btnsWatchedList = document.querySelectorAll('.toWatched');
    btnsWatchedList.forEach(btn => {
      if (!watchedArr.includes(btn.dataset.id)) {
        btn.disabled = true;
      }
    });
  }
}
function onPopulateRemovedFromQueueList() {
  if (localStorage.getItem('QueueList')) {
    const queueArr = JSON.parse(localStorage.getItem('QueueList'));
    const btnsQueueList = document.querySelectorAll('.toQueue');
    btnsQueueList.forEach(btn => {
      if (!queueArr.includes(btn.dataset.id)) {
        btn.disabled = true;
      }
    });
  }
}
