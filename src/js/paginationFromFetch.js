import CardsApiService from '../js/apiService';
import allcardsTpl from '../templates/film-card';
import getGenres from './movies-genres.json';
const domContainer = document.querySelector('#js-pagination');

const refs = {
    input: document.querySelector('.header__search-form'),
    cardsContainer: document.querySelector('.gallery'),
    paginateContainer: document.querySelector('#dark-pagination'),
}

refs.input.addEventListener('submit', handleInput);
const fetchApi = new CardsApiService();

function handleInput(e) {
  e.preventDefault();
  fetchApi.query = e.currentTarget.elements.query.value.trim();
    onSearch();
}

function clearCardsContainer() {
  refs.cardsContainer.innerHTML = '';
}

function onSearch() {
  fetchApi.resetPage();
       searchFetch() 
         .then(filmcards => {
          
            $(domContainer).pagination($.extend({}, { items: fetchApi.totalResults, itemsOnPage: 20, onPageClick: function (pageNumber, event) {
        fetchApi.page = pageNumber;
        searchFetch() 
          .then(filmcards => {  appendCardsMarkup(filmcards)  })
				
				} })); appendCardsMarkup(filmcards) })
          
}

function appendCardsMarkup(filmcards) {
//   console.log(filmcards);
  clearCardsContainer();
  refs.cardsContainer.insertAdjacentHTML('beforeend', allcardsTpl(filmcards)); 
}

export default function homePage() {
  fetchApi.resetPage();
  trendFetch()
          .then(filmcards => {
              $(domContainer).pagination($.extend({}, { items: fetchApi.totalResults, itemsOnPage: 20, onPageClick: function (pageNumber, event) {
                fetchApi.page = pageNumber;
                
                trendFetch().then(filmcards => { appendCardsMarkup(filmcards)  })
                } })); appendCardsMarkup(filmcards)
          })
          renderHomePage()
}

$(function () {
  $(domContainer).pagination({
      cssStyle: 'dark-theme',
      onInit: function () {
        homePage()
      },
    });
});



const genres = JSON.stringify(getGenres);
const getObj = JSON.parse(genres);

function trendFetch() {
 return fetchApi.fetchCards()
  .then(results => {
    const change = results.map(movie => {
      return {
        ...movie,
        genre_ids: generateGenres(movie),
        release_date: generateData(movie),
      };
    });
//     console.log(change)
    return change;
  })
  .catch(error => console.log(error));
}


function searchFetch() {
 return fetchApi.fetchCardsonSearch()
  .then(results => {
    const change = results.map(movie => {
      return {
        ...movie,
        genre_ids: generateGenres(movie),
        release_date: generateData(movie),
      };
    });
//     console.log(change)
    return change;
  })
  .catch(error => console.log(error));
}


// жанры
function generateGenres(movie) {
  let idsGenre = movie.genre_ids.map(id => {
    return getObj.find(ganre => ganre.id === id).name;
  });
  if (idsGenre.length > 2) {
    return [...idsGenre.slice(0, 2), 'Other'];
  }
  return idsGenre;
}

// год
function generateData(movie) {
  if(movie.release_date == undefined){
    return movie.release_date = 'Soon'
  }else if(movie.release_date) { 
    const release_date = Number(movie.release_date.slice(0, 4));
    return release_date;
  }
}

// export { onSearch };
function renderHomePage() {
  const renderLibrary = document.querySelector('#headLibr');
const includeHeader = document.querySelector('.header__main');
  renderLibrary.innerHTML = '';
  includeHeader.style.cssText = `display: block`;
}