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

  const logoHomePageLibrary = document.querySelector('.header-library-logo');
  logoHomePageLibrary.addEventListener('click', homePage);

  libraryList.innerHTML = markupWatched;
  includeHeader.style.cssText = `display: none`;

  const btnHome = document.querySelector('.js-homeButton');
  btnHome.addEventListener('click', homePage);

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

export { renderLibraryPage };

