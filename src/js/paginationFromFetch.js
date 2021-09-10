// import './sass/main.scss';
import CardsApiService from '../js/apiService';
import allcardsTpl from '../templates/film-card';

const domContainer = document.querySelector('#js-pagination');

const refs = {
    input: document.querySelector('.header__search-form'),
    cardsContainer: document.querySelector('.gallery'),
    paginateContainer: document.querySelector('#dark-pagination'),
}

refs.input.addEventListener('submit', handleInput);

function handleInput(e) {
  e.preventDefault();
  cardsApiService.query = e.currentTarget.elements.query.value.trim();
    onSearch();
}

function clearCardsContainer() {
  refs.cardsContainer.innerHTML = '';
}
const cardsApiService = new CardsApiService();
function onSearch() {
  cardsApiService.page = 1;
       cardsApiService.fetchCardsonSearch() 
         .then(filmcards => {
          
            $(domContainer).pagination($.extend({}, { items: cardsApiService.totalResults, itemsOnPage: 20, onPageClick: function (pageNumber, event) {
        cardsApiService.page = pageNumber;
        cardsApiService.fetchCardsonSearch() 
          .then(filmcards => { appendCardsMarkup(filmcards)  })
				
				} })); appendCardsMarkup(filmcards) })
          
}

function appendCardsMarkup(filmcards) {
  clearCardsContainer();
  refs.cardsContainer.insertAdjacentHTML('beforeend', allcardsTpl(filmcards)); 
}

$(function () {
  
  $(domContainer).pagination({
           
      cssStyle: 'dark-theme',
         
    onInit: function () {
      cardsApiService.fetchCards()   
          .then(filmcards => { $(domContainer).pagination($.extend({}, { items: cardsApiService.totalResults, itemsOnPage: 20, onPageClick: function (pageNumber, event) {
            cardsApiService.page = pageNumber;
           console.log(cardsApiService.totalResults)
        cardsApiService.fetchCards() 
          .then(filmcards => { appendCardsMarkup(filmcards)  })
				
				} })); appendCardsMarkup(filmcards) })	
    },		
    });
});