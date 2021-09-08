const preloaderEl = document.querySelector('.preloader');
const preloaderImg = document.querySelector('.preloader__img');
const main_content = document.querySelector('.main_content');

setTimeout(() => (preloaderImg.style.opacity = '1'), 100); //скрываем скачок изображения при перезагрузке

main_content.style.opacity = '0'; //скрываем скачок рендеринга главного контента при перезагрузке

document.body.onload = function () {
  setTimeout(function () {
    preloaderEl.classList.add('hide');
    main_content.style.opacity = '1';
  }, 2900);
};
