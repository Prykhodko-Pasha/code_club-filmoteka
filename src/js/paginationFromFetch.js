import CardsApiService from '../js/apiService';
import allcardsTpl from '../templates/film-card.hbs';
import getGenres from './movies-genres.json';
const domContainer = document.querySelector('#js-pagination');

const refs = {
  input: document.querySelector('.header__search-form'),
  cardsContainer: document.querySelector('.gallery'),
  paginateContainer: document.querySelector('#dark-pagination'),
};

refs.input.addEventListener('submit', handleInput);
const fetchApi = new CardsApiService();

function handleInput(e) {
  e.preventDefault();
 if (e.currentTarget.elements.query.value === '') {
    return alert('Введите запрос');
  }
  else {
    fetchApi.query = e.currentTarget.elements.query.value.trim();
    onSearch();
    e.currentTarget.elements.query.value = '';
  }
}

function clearCardsContainer() {
  refs.cardsContainer.innerHTML = '';
}

function onSearch() {
  fetchApi.resetPage();
  searchFetch().then(filmcards => {
    $(domContainer).pagination(
      $.extend(
        {},
        {
          items: fetchApi.totalResults,
          itemsOnPage: 20,
          onPageClick: function (pageNumber, event) {
            fetchApi.page = pageNumber;
            searchFetch().then(filmcards => {
              appendCardsMarkup(filmcards);
            });
          },
        },
      ),
    );
    appendCardsMarkup(filmcards);
  });
}

function appendCardsMarkup(filmcards) {
  //   console.log(filmcards);
  clearCardsContainer();
  refs.cardsContainer.insertAdjacentHTML('beforeend', allcardsTpl(filmcards));
  onPopulateWatchedList(); //отмечаем просмотренные фильмы
  onPopulateQueueList(); //отмечаем фильмы в очереди
}

export default function homePage() {
  fetchApi.resetPage();
  trendFetch().then(filmcards => {
    $(domContainer).pagination(
      $.extend(
        {},
        {
          items: fetchApi.totalResults,
          itemsOnPage: 20,
          onPageClick: function (pageNumber, event) {
            fetchApi.page = pageNumber;

            trendFetch().then(filmcards => {
              appendCardsMarkup(filmcards);
            });
          },
        },
      ),
    );
    appendCardsMarkup(filmcards);
  });
  renderHomePage();
}

$(function () {
  $(domContainer).pagination({
    cssStyle: 'dark-theme',
    onInit: function () {
      homePage();
    },
  });
});

const genres = JSON.stringify(getGenres);
const getObj = JSON.parse(genres);

function trendFetch() {
  return fetchApi
    .fetchCards()
    .then(results => {
      // console.log(results)
      const change = results.map(movie => {
        return {
          ...movie,
          genre_ids: generateGenres(movie),
          release_date: generateData(movie),
          vote_average: generateVote(movie),
        };
      });
      //     console.log(change)
      return change;
    })
    .catch(error => console.log(error));
}

function searchFetch() {
  return fetchApi
    .fetchCardsonSearch()
    .then(results => {
      const change = results.map(movie => {
        return {
          ...movie,
          genre_ids: generateGenres(movie),
          release_date: generateData(movie),
          vote_average: generateVote(movie),
        };
      });
      //     console.log(change)
      return change;
    })
    .catch(error => console.log(error));
}

// rate
function generateVote(movie) {
  if (movie.vote_average) {
    const vote_average = movie.vote_average.toFixed(1);
    return vote_average;
  }
}

// genres
function generateGenres(movie) {
  let idsGenre = movie.genre_ids.map(id => {
    return getObj.find(ganre => ganre.id === id).name;
  });
  if (idsGenre.length > 2) {
    return [...idsGenre.slice(0, 2), 'Other'];
  }
  return idsGenre;
}

// year
function generateData(movie) {
  if (movie.release_date == undefined) {
    return  Number(movie.first_air_date.slice(0, 4));
  } else if (movie.release_date) {
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

//Pasha
function onPopulateWatchedList() {
  // console.log('!!!!!!!!!!!!!!!!!!!!!!');
  if (localStorage.getItem('WatchedList')) {
    const watchedArr = JSON.parse(localStorage.getItem('WatchedList'));
    // console.log(watchedArr);
    const btnsWatchedList = document.querySelectorAll('.toWatched');
    // console.log(btnsWatchedList);
    // const moviesIds = moviesList.map(item => item.dataset.id);
    btnsWatchedList.forEach(btn => {
      // console.log(btn.disabled);
      // console.log(btn.dataset.id);
      if (watchedArr.includes(btn.dataset.id)) {
        btn.disabled = true;
        // console.log(btn.disabled);
      }
    });
  }
}
function onPopulateQueueList() {
  // console.log('!!!!!!!!!!!!!!!!!!!!!!');
  if (localStorage.getItem('QueueList')) {
    const QueueArr = JSON.parse(localStorage.getItem('QueueList'));
    // console.log(watchedArr);
    const btnsQueueList = document.querySelectorAll('.toQueue');
    // console.log(btnsWatchedList);
    // const moviesIds = moviesList.map(item => item.dataset.id);
    btnsQueueList.forEach(btn => {
      // console.log(btn.disabled);
      // console.log(btn.dataset.id);
      if (QueueArr.includes(btn.dataset.id)) {
        btn.disabled = true;
        // console.log(btn.disabled);
      }
    });
  }
}
