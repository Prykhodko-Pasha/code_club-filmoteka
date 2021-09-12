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
  renderLibrary.insertAdjacentHTML('beforeend', Library());
  const markupWatched = await getMoviesDataById(moviesWatched);
  const markupQueue = await getMoviesDataById(moviesQueue);

  libraryList.innerHTML = markupWatched;
  includeHeader.style.cssText = `display: none`;

  // const btnHome = document.querySelector('.js-homeButton');
  // btnHome.addEventListener('click', renderHomePage);

  const buttonWatched = document.querySelector('.js-buttonWatched');
  const buttonQueue = document.querySelector('.js-buttonQueue');

  buttonWatched.addEventListener('click', () => {
    buttonWatched.classList.add('current-btn');
    buttonQueue.classList.remove('current-btn');

    libraryList.innerHTML = markupWatched;
  });
  buttonQueue.addEventListener('click', () => {
    buttonQueue.classList.add('current-btn');
    buttonWatched.classList.remove('current-btn');

    libraryList.innerHTML = markupQueue;
  });
}
// function renderHomePage() {
//   renderLibrary.innerHTML = '';
//   libraryList.innerHTML = onSearch();
//   includeHeader.style.cssText = `display: block`;
// }
export { renderLibraryPage };

// =================
// import Library from '../templates/library.hbs';
// const renderLibrary = document.querySelector('#headLibr');
// const includeHeader = document.querySelector('.header__main');
// const includeMain = document.querySelector('.film-gallery-section');

// const btnLibrary = document.querySelector('#library');
// btnLibrary.addEventListener('click', onLibrary);

// function onLibrary() {
//   renderLibrary.insertAdjacentHTML('beforeend', Library());
//   const btnHome = document.querySelector('#home');
//   btnHome.addEventListener('click', onHome);
//   includeHeader.style.cssText = `display: none`;
//   includeMain.style.cssText = `display: none`;
//   function onHome() {
//     renderLibrary.innerHTML = '';
//     includeHeader.style.cssText = `display: block`;
//     includeMain.style.cssText = `display: block`;
//   }
// }

// ============
