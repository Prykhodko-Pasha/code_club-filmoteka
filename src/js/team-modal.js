const refs = {
  openModalA: document.querySelector('[data-action="open-modal"]'),
  closeModalBtn: document.querySelector('[data-action="close-modal"]'),
  backdrop: document.querySelector('.js-backdrop'),
};

// 1. Открыть по ссылке и закрыть по кнопке
// В _team-modal.scss есть класс show-modal, который необходимо добавить на body при открытии модалки

refs.openModalA.addEventListener('click', onOpenModal),
  refs.closeModalBtn.addEventListener('click', onCloseModal),
  refs.backdrop.addEventListener('click', onBackdropClick);

function onOpenModal() {
  window.addEventListener('keydown', onEscKeyPress);
  document.body.classList.add('show-modal');
  event.preventDefault();
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  document.body.classList.remove('show-modal');
}

function onBackdropClick() {
  if (event.currentTarget === event.target) {
    console.log('Кликнули именно в бекдроп!!!!');
    onCloseModal();
  }
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}
// const targetA = document.querySelector('.rights_info');
// targetA.addEventListener('click', onTargetAClick);
// function onTargetAClick(event) {
//   console.log('Клик по ссылке GoIT Students');
//   console.log(event);
//   event.preventDefault();
// }
