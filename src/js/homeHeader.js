import Library from '../templates/library.hbs';
const renderLibrary = document.querySelector('#headLibr');
const includeHeader = document.querySelector('.header__main');
const includeMain = document.querySelector('.film-gallery-section');

const btnLibrary = document.querySelector('#library');
btnLibrary.addEventListener('click', onLibrary);

function onLibrary() {
  renderLibrary.insertAdjacentHTML('beforeend', Library());
  const btnHome = document.querySelector('#home');
  btnHome.addEventListener('click', onHome);
  includeHeader.style.cssText = `display: none`;
  includeMain.style.cssText = `display: none`;
  function onHome() {
    renderLibrary.innerHTML = '';
    includeHeader.style.cssText = `display: block`;
    includeMain.style.cssText = `display: block`;
  }
}
