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
  fetchApi.page = 1;
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
              console.log(filmcards);
              appendCardsMarkup(filmcards);
            });
          },
        },
      ),
    );
    appendCardsMarkup(filmcards);
  });
}
  // ===========================================================
//   const list = document.querySelector('.film-gallery');
//   list.addEventListener('click', renderCard);

//   function renderCard(e) {
//     e.preventDefault();
//     if (e.target.dataset.id.length == 5) {
//       const id = e.target.dataset.target.imdb_id;
//       console.log(id, 'imdb_id');
//       return id;
//     } else if (e.target.dataset.id) {
//       const id = e.target.dataset.id;
//       console.log(id, 'id');
//       return id;
//     }

//     const id = e.target.dataset.id;
//     const url = `https://api.themoviedb.org/3/movie/${id}?api_key=1d821060cfc3dc7c024273bf806840e9&language=en-US`;
//     return fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         console.log(data, 'hi from data');
//         return data;
//       });
//   }
// }
//   renderCard();

 // ===========================================================
function appendCardsMarkup(filmcards) {
  console.log(filmcards);
  clearCardsContainer();
  refs.cardsContainer.insertAdjacentHTML('beforeend', allcardsTpl(filmcards)); 
}
$(function () {
  $(domContainer).pagination({
      cssStyle: 'dark-theme',
      onInit: function () {
        trendFetch()
          .then(filmcards => {
              $(domContainer).pagination($.extend({}, { items: fetchApi.totalResults, itemsOnPage: 20, onPageClick: function (pageNumber, event) {
                fetchApi.page = pageNumber;
                console.log(fetchApi.page);
                trendFetch().then(filmcards => {console.log(filmcards); appendCardsMarkup(filmcards)  })
                } })); appendCardsMarkup(filmcards)
          })
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
    console.log(change)
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
    console.log(change)
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
  // console.log(movie, 'here')
  if(movie.release_date == undefined){
    return movie.release_date = 'Soon'
  }else if(movie.release_date) { 
    const release_date = Number(movie.release_date.slice(0, 4));
    return release_date;
  }
}

export { onSearch };
