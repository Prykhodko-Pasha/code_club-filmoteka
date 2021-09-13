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
  includeHeader.style.cssText = `display: none`;
  renderLibrary.innerHTML = Library();
  const markupWatched = await getMoviesDataById(moviesWatched);
  const markupQueue = await getMoviesDataById(moviesQueue);
  
  const logoHomePageLibrary = document.querySelector('.header-library-logo');
  logoHomePageLibrary.addEventListener('click', homePage);

  libraryList.innerHTML = markupWatched;

  const btnHome = document.querySelector('.js-homeButton');
  btnHome.addEventListener('click', homePage);

  const buttonWatched = document.querySelector('.js-buttonWatched');
  const buttonQueue = document.querySelector('.js-buttonQueue');

  buttonWatched.addEventListener('click', () => {
    buttonWatched.classList.add('current-btn');
    buttonQueue.classList.remove('current-btn');

    libraryList.innerHTML = markupWatched; 

    //buttons
    const btnsAddWatched = document.querySelectorAll('.toWatched');
    const btnsAddQueue = document.querySelectorAll('.toQueue')
    addHidden(btnsAddQueue);
    removeFromWatch(btnsAddWatched)
  });
  buttonQueue.addEventListener('click', () => {
    buttonQueue.classList.add('current-btn');
    buttonWatched.classList.remove('current-btn');

    libraryList.innerHTML = markupQueue; 

    //buttons    
    const btnsAddQueue = document.querySelectorAll('.toQueue'); 
    removeFromQueue(btnsAddQueue)
    
  });
}
export { renderLibraryPage };


// ==============Юля
// const btnLibrary = document.querySelector('#library')
// btnLibrary.addEventListener('click', console.log('bum'))


function removeFromQueue(btnsAddQueue){ 
  btnsAddQueue.forEach(el =>{
      if(el.classList.contains('js-addToQueue')){
        el.classList.remove('js-addToQueue')
        el.classList.add('js-remove')   
        el.textContent = "Remove from Queue"   
      }
    })
}

 function removeFromWatch(btnsAddWatched){   
  btnsAddWatched.forEach(el =>{
    if(el.classList.contains('js-addToWatched')){
      el.classList.remove('js-addToWatched')
      el.classList.add('js-remove')
      el.textContent = "Remove from Watched"
    }
  })
}
   
function addHidden(arr){
  arr.forEach(el =>{
    el.classList.add('visually-hidden');
  })
}    