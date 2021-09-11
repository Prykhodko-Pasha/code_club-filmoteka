import { renderLibraryPage } from './homeHeader';

const hashLib = require('hash.js');
const firebaseConfig = {
  apiKey: 'AIzaSyDApnzLSghnRxqJ_2remxDb3MWoJuxFKlM',
  authDomain: 'goit-movie.firebaseapp.com',
  projectId: 'goit-movie',
  storageBucket: 'goit-movie.appspot.com',
  messagingSenderId: '509475829512',
  appId: '1:509475829512:web:39f2fa63efd7c7a1cf5ebd',
};

class FirebaseWork {
  constructor(config, oHash) {
    firebase.initializeApp(config);
    this._database = firebase.database();
    this._oHash = oHash;
    this._hashUserId = null;

    this.login().then(data => {
      this._hashUserId = this.getHash({
        login: data.login,
        password: data.password,
      });
    });
  }
  getHash(data) {
    return this._oHash.sha256().update(JSON.stringify(data)).digest('hex');
  }

  login(authData = null) {
    if (!authData) {
      authData = JSON.parse(localStorage.getItem('auth-data'));
      if (!authData) {
        authData = null;
      }
    }
    const hashAuth = this.getHash(authData);

    return this._database
      .ref('users')
      .child(hashAuth)
      .get()
      .catch(error => console.error(error))
      .then(snapshot => {
        if (snapshot.exists()) {
          localStorage.setItem('auth-data', JSON.stringify(authData));
          this._hashUserId = hashAuth;
          return snapshot.val();
        }
        throw new Error('Доступ запрещён. Такой пользователь не найден(');
      });
  }
  signUp(userData) {
    const tempData = Object.entries(userData).filter(
      pair => pair[0] === 'login' || pair[0] === 'password',
    );
    const authData = {};
    for (const pair of tempData) {
      authData[pair[0]] = pair[1];
    }
    const hashUserId = this.getHash(authData);

    return new Promise((resolve, reject) => {
      this._database.ref('users/' + hashUserId).set(userData, error => {
        if (error) {
          reject(error);
        }
        localStorage.setItem('auth-data', JSON.stringify(authData));
        this._hashUserId = hashUserId;
        resolve(userData);
      });
    });
  }
  _getList(listName) {
    return this._database
      .ref(listName)
      .child(this._hashUserId)
      .get()
      .catch(error => ({ exists: () => false }))
      .then(snapshot => {
        if (snapshot.exists()) {
          const movieList = snapshot.val();
          return movieList;
        }
        return [];
      });
  }
  getWatchedList() {
    return this._getList('watched');
  }
  getQueueList() {
    return this._getList('queue');
  }
  async addToWatched(movieId) {
    const movieList = await this._getList('watched');
    movieList.push(movieId);

    return new Promise((resolve, reject) => {
      this._database.ref('watched/' + this._hashUserId).set(movieList, error => {
        if (error) {
          reject(error);
        }
        resolve(movieList);
      });
    });
  }
  async addToQueue(movieId) {
    const movieList = await this._getList('queue');
    movieList.push(movieId);

    return new Promise((resolve, reject) => {
      this._database.ref('queue/' + this._hashUserId).set(movieList, error => {
        console.log(movieList, this._hashUserId);
        if (error) {
          reject(error);
        }
        resolve(movieList);
      });
    });
  }
}

(() => {
  const refs = {
    authButton: document.querySelector('.js-authButton'),
    includeMain: document.querySelector('.film-gallery-section'),
  };
  const fw = new FirebaseWork(firebaseConfig, hashLib);
  refs.includeMain.addEventListener('click', event => {
    if (event.target.classList.contains('js-addToWatched')) {
      fw.addToWatched(event.target.dataset.id);
    } else if (event.target.classList.contains('js-addToQueue')) {
      fw.addToQueue(event.target.dataset.id);
    }
  });
  refs.authButton.addEventListener('click', event => {
    event.preventDefault();
    fw.login()
      .then(async () => {
        renderLibraryPage(await fw.getWatchedList(), await fw.getQueueList());
      })
      .catch(error => {
        alert(error);
        const userDataTemplate = ['name', 'login', 'password'];
        const userData = {};
        userDataTemplate.forEach(item => {
          userData[item] = prompt('Input your ' + item);
        });
        fw.signUp(userData).then(async userData => {
          renderLibraryPage(await fw.getWatchedList(), await fw.getQueueList());
        });
      });
  });
})();
