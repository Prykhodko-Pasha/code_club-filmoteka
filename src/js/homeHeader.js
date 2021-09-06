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
