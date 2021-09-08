const btnUp = document.querySelector('.flowing__scroll-up');
const btnDown = document.querySelector('.flowing__scroll-down')
const vwBody = document.querySelector('body')

window.addEventListener('scroll', hiddenScroll(btnUp));
btnUp.addEventListener('click', scrollUp);
btnDown.addEventListener('click', scrollDown)


function hiddenScroll() {
  const heightScroll = document.documentElement.clientHeight;
  return function onbtnUp() {
    if (scrollY < heightScroll) {
      btnUp.classList.add('hidden__scroll');
    } else {
      btnUp.classList.remove('hidden__scroll');
    }
  };
}

function scrollUp() {
  vwBody.scrollIntoView({
    block: 'start',
    behavior: 'smooth',
  });
}
//=============================
function scrollDown() {
   vwBody.scrollIntoView({
     block: 'end',
     behavior: 'smooth',
   });
}
