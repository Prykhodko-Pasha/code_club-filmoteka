const preloaderEl = document.querySelector('.preloader');
const preloaderImg = document.querySelector('.preloader__img');

setTimeout(() => (preloaderImg.style.opacity = '1'), 100); //скрываем скачок изображения при перезагрузке

document.body.onload = function () {
  setTimeout(function () {
    preloaderEl.classList.add('hide');
  }, 2900);
};
