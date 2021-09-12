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

    const btnsAddWatched = document.querySelectorAll('.toWatched'); 
    const btnsAddQueue = document.querySelectorAll('.toQueue')
    addHidden(btnsAddQueue);
    removeWatched(btnsAddWatched)
  });
  buttonQueue.addEventListener('click', () => {
    buttonQueue.classList.add('current-btn');
    buttonWatched.classList.remove('current-btn');

    libraryList.innerHTML = markupQueue; 
    const btnsAddQueue = document.querySelectorAll('.toQueue');      
    onQueue(btnsAddQueue) 
  });
}
export { renderLibraryPage };


// ==============Юля
const btnsAddWatched = document.querySelectorAll('.toWatched'); 
// const btnsAddQueue = document.querySelectorAll('.toQueue');  


const btnLibrary = document.querySelector('#library')
btnLibrary.addEventListener('click', console.log('bum'))


// function removeJsClass(arr){
//   arr.forEach(el =>{
//     if(el.classList.contains('js-addToWatched')){
//       el.classList.remove('js-addToWatched')
//     }else if(el.classList.contains('js-addToQueue')){
//       el.classList.remove('js-addToQueue')
//     }
//   })
// }
function removeWatched(arr){
  arr.forEach(el =>{
    el.textContent = "Remove from Watched"
  })
}
function onQueue(arr){
  arr.forEach(el =>{
    el.textContent = "Remove from Queue"
  })
}     
function addHidden(arr){
  arr.forEach(el =>{
    el.classList.add('visually-hidden');
  })
}    
// function onWatched(arr){
//   arr.forEach(el =>{
//     el.textContent = "Add to Watched"
//   })
// }

// function hiddenRemove(arr){
//   arr.forEach(el =>{
//     el.classList.remove('visually-hidden');
//   })
// }




