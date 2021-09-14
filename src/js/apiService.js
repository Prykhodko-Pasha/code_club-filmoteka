const TMD_KEY = "1d821060cfc3dc7c024273bf806840e9"

const domContainer = document.querySelector('#js-pagination');
export default class CardsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalResults = 20;
    this.currentPage = 1;
  }

  fetchCardsonSearch() {
    return fetch(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${TMD_KEY}&page=${this.page}`,
    )
      .then(response => response.json())
      .then(results => {
        // this.totalResults = results.total_results;
        return results.results;
      })
      .catch(error => Promise.reject(error));
    }
    
  fetchMovieDetails(movieId) {
      return fetch(`https://api.themoviedb.org/movie/${movieId}?api_key=${TMD_KEY}&language=en-US`,
      )
      .then(r => r.json())
      .then(data => {
        return data;
      })
      .catch(error => console.log(error));
  }

  fetchCards() {
    return fetch(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${TMD_KEY}&page=${this.page}`,
    )
      .then(response => response.json())
      .then(results => {
        this.totalResuls = results.total_results;
        return results.results;
      })
      .catch(error => Promise.reject(error));
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
};