export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }


    fetchFilms(searchQuery) {

        return fetch(`https://api.themoviedb.org/3/search/movie?api_key=23824187957955af0aa1cb82b26c80b5&language=en-US&query=${this.searchQuery}&page=${this.page}&include_adult=false`)
            .then(response => response.json())
            .then(({ results }) => {
                this.incrementPage();
                return results;
            }).catch(error => Promise.reject(error));
    }

    incrementPage() {
        this.page += 1;
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
}