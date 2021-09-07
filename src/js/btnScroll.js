import debounce from 'lodash.debounce';

const btnUp = document.querySelector('.flowing__scroll-up');

window.addEventListener('scroll', debounce(hiddenScroll(btnUp)));
btnUp.addEventListener('click', scrollUp);


function hiddenScroll(e) {
  return function hideOnScroll() {
    if (scrollY < document.documentElement.clientHeight) {
      e.classList.add('hidden__scroll');
    } else {
     e.classList.remove('hidden__scroll');
    }
  };
}

function scrollUp() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================

// const btnDown = document.querySelector('.flowing__scroll-down');

// window.addEventListener('scroll', debounce(hiddenScroll(btnDown)));
// btnDown.addEventListener('click', scrollUp);


// function hiddenScroll(e) {
//   return function hideOnScroll() {
//     if (scrollY < document.documentElement.clientHeight) {
//       e.classList.remove('hidden__scroll');
//       e.classList.add('hidden__scroll');
//     } else {
//     }
//   };
// }

// function scrollUp() {
//   window.scrollTo({ top: 0, behavior: 'smooth' });
// }