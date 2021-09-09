import { getMoviesDataById } from './fetchMovies';
import Library from '../templates/library.hbs';

const renderLibrary = document.querySelector('#headLibr');
const includeHeader = document.querySelector('.header__main');
const includeMain = document.querySelector('.film-gallery-section');
const librarySection = document.querySelector('.js-librarySection');
const libraryList = librarySection.querySelector('ul');

const btnHome = document.querySelector('.js-homeButton');
btnHome.addEventListener('click', renderHomePage);

async function renderLibraryPage(moviesWatched, moviesQueue) {
  renderLibrary.insertAdjacentHTML('beforeend', Library());
  const markupWatched = await getMoviesDataById(moviesWatched);
  const markupQueue = await getMoviesDataById(moviesQueue);

  libraryList.insertAdjacentHTML('beforeend', markupWatched);
  includeHeader.style.cssText = `display: none`;
  includeMain.style.cssText = `display: none`;
  librarySection.style.cssText = `display: block`;

  const btnHome = document.querySelector('.js-homeButton');
  btnHome.addEventListener('click', renderHomePage);

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
function renderHomePage() {
  renderLibrary.innerHTML = '';
  libraryList.innerHTML = '';
  includeHeader.style.cssText = `display: block`;
  includeMain.style.cssText = `display: block`;
  librarySection.style.cssText = `display: none`;
}
export { renderLibraryPage };
