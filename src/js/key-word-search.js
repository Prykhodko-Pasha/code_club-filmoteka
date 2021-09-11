import filmCardTpl from '../templates/film-key-word-card.hbs';
import NewsApiService from './apiService';


const refs = {
    searchForm: document.querySelector('.header__search-form'),
    searchBtn: document.querySelector('.header__btn'),
    galleryContainer: document.querySelector('.film-gallery'),
    
}

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
    e.preventDefault();

    newsApiService.query = e.currentTarget.elements.query.value;

    if (newsApiService.query === '') {
        return alert('Введите запрос');
    }
    
    newsApiService.resetPage();
    // оставить fetchCardsonSearch!!!!
    newsApiService.fetchCardsonSearch().then(results => {
        clearGalleryContainer();
        appendFilmsMarkup(results);
    });
}

function appendFilmsMarkup(results) {
    if (results.length !== 0) {
        refs.galleryContainer.insertAdjacentHTML('afterbegin', filmCardTpl(results));
    }
    }

    function clearGalleryContainer() {
    refs.galleryContainer.innerHTML = '';
}