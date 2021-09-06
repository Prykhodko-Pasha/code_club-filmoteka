const modalOpen = document.querySelectorAll('.film-gallery__item');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');

modalOpen.forEach((elem) => {
  elem.addEventListener('click', (e) => {
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
  });
});

modalClose.addEventListener('click', () => {
  modal.style.opacity = '0';
  modal.style.visibility = 'hidden';
});

modal.addEventListener('click', (e) => {
    e.preventDefault();
  if(e.target == modal) {
    modal.style.opacity = '0';
    modal.style.visibility = 'hidden';
  }
});