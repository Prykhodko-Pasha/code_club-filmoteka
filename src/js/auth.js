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
        // throw new Error('Доступ запрещён. Такой пользователь не найден(');
        throw new Error('Please login to be able to use the library.');
        // throw alert('Ввойдите пожалуйста, чтоб иметь возможность использовать библиотеку.')
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
  async removeFromWatched(movieId) {
    const movieList = await this._getList('watched');
    const elToDel = movieList.indexOf(movieId);
    movieList.splice(elToDel, 1);

    return new Promise((resolve, reject) => {
      this._database.ref('watched/' + this._hashUserId).set(movieList, error => {
        // console.log(movieList, this._hashUserId);
        if (error) {
          reject(error);
        }
        resolve(movieList);
      });
    });
  }
  async removeFromQueue(movieId) {
    const movieList = await this._getList('queue');
    const elToDel = movieList.indexOf(movieId);
    movieList.splice(elToDel, 1);

    return new Promise((resolve, reject) => {
      this._database.ref('queue/' + this._hashUserId).set(movieList, error => {
        // console.log(movieList, this._hashUserId);
        if (error) {
          reject(error);
        }
        resolve(movieList);
      });
    });
  }
}

// export FirebaseWork;

(() => {
  const refs = {
    authButton: document.querySelector('.js-authButton'),
    includeMain: document.querySelector('.film-gallery'),
  };
  const fw = new FirebaseWork(firebaseConfig, hashLib);
  refs.includeMain.addEventListener('click', event => {
    if (event.target.classList.contains('js-addToWatched')) {
      event.target.parentElement.disabled = true;
      addWatchedIdToLS(event.target.parentElement.dataset.id);
      fw.addToWatched(event.target.parentElement.dataset.id);
    } else if (event.target.classList.contains('js-addToQueue')) {
      event.target.parentElement.disabled = true;
      addQueueIdToLS(event.target.parentElement.dataset.id);
      fw.addToQueue(event.target.parentElement.dataset.id);
    }
  });

  refs.includeMain.addEventListener('click', e => {
    if (e.target.classList.contains('js-removeFromWatched')) {
      e.target.parentElement.disabled = true;
      removeWatchedIdFromLS(e.target.parentElement.dataset.id);
      fw.removeFromWatched(e.target.parentElement.dataset.id);
    }
  });
  refs.includeMain.addEventListener('click', e => {
    if (e.target.classList.contains('js-removeFromQueue')) {
      e.target.parentElement.disabled = true;
      removeQueueIdFromLS(e.target.parentElement.dataset.id);
      fw.removeFromQueue(e.target.parentElement.dataset.id);
    }
  });

  //========= Pasha =========
  function addWatchedIdToLS(id) {
    // console.log(id);
    if (localStorage.getItem('WatchedList')) {
      const WatchedArr = JSON.parse(localStorage.getItem('WatchedList'));
      WatchedArr.push(id);
      localStorage.setItem('WatchedList', JSON.stringify(WatchedArr));
    } else {
      const WatchedArr = [id];
      localStorage.setItem('WatchedList', JSON.stringify(WatchedArr));
    }
  }
  function addQueueIdToLS(id) {
    console.log(id);
    if (localStorage.getItem('QueueList')) {
      const QueueArr = JSON.parse(localStorage.getItem('QueueList'));
      QueueArr.push(id);
      localStorage.setItem('QueueList', JSON.stringify(QueueArr));
    } else {
      const QueueArr = [id];
      localStorage.setItem('QueueList', JSON.stringify(QueueArr));
    }
  }

  function removeWatchedIdFromLS(id) {
    const watchedArr = JSON.parse(localStorage.getItem('WatchedList'));
    const elToDel = watchedArr.indexOf(id);
    console.log(elToDel);
    watchedArr.splice(elToDel, 1);
    localStorage.setItem('WatchedList', JSON.stringify(watchedArr));
  }
  function removeQueueIdFromLS(id) {
    const queueArr = JSON.parse(localStorage.getItem('QueueList'));
    const elToDel = queueArr.indexOf(id);
    queueArr.splice(elToDel, 1);
    localStorage.setItem('QueueList', JSON.stringify(queueArr));
  }
  //===============================

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
