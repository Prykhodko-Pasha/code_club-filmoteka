import Header from '../templates/hpmeHeader.hbs';
import Library from '../templates/library.hbs';

const renderHeader = document.querySelector('#headerHome');
const renderLibrary = document.querySelector('#headLibr');

renderHeader.insertAdjacentHTML('beforeend', Header());
renderLibrary.insertAdjacentHTML('beforeend', Library());

const btnLibrary = document.querySelector('#library');
console.log({ btnLibrary });

btnLibrary.addEventListener('click', onLibrary);
btnHome.addEventListener('click', onHome);

const btnHome = document.querySelector('#home');
console.log('Хоме');

function onLibrary() {
  renderLibrary.insertAdjacentHTML('beforeend', Library());
  renderHeader.innerHTML = '';
  console.log('Либрари');
}
function onHome() {
  console.log('Хоме');
  renderHeader.insertAdjacentHTML('beforeend', Header());
  renderLibrary.innerHTML = '';
}

// ===============================
