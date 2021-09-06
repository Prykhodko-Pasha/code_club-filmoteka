// import Header from '../templates/hpmeHeader.hbs';
// import Library from '../templates/library.hbs';
// const renderHeader = document.querySelector('#headerHome');
// const renderLibrary = document.querySelector('#headLibr');

// renderHeader.insertAdjacentHTML('beforeend', Header());

// const btnLibrary = document.querySelector('#library');
// btnLibrary.addEventListener('click', onLibrary);

// function onLibrary() {
//   renderLibrary.insertAdjacentHTML('beforeend', Library());
//   renderHeader.innerHTML = '';
//   console.log('Либрари');

//   const btnHome = document.querySelector('#home');
//   console.log(btnHome, 'добвил кнопку ХОМЕ');
//   btnHome.addEventListener('click', onHome);
// }

// function onHome() {
//   renderHeader.insertAdjacentHTML('beforeend', Header());
//   renderLibrary.innerHTML = '';
//   console.log('Хоме');
// }

import Library from '../templates/library.hbs';
const renderLibrary = document.querySelector('#headLibr');
const includeHeader = document.querySelector('.header__main');

const btnLibrary = document.querySelector('#library');
btnLibrary.addEventListener('click', onLibrary);

function onLibrary() {
  renderLibrary.insertAdjacentHTML('beforeend', Library());
  includeHeader.style.cssText = `display: none`;
  const btnHome = document.querySelector('#home');
  btnHome.addEventListener('click', onHome);
}

function onHome() {
  renderLibrary.innerHTML = '';
  includeHeader.style.cssText = `display: block`;
}
