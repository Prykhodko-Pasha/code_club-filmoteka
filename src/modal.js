// const modalOpen = document.querySelectorAll('.film-gallery__item');
// const modal = document.querySelector('.modal');
// const modalClose = document.querySelector('.modal__close');

// modalOpen.forEach((elem) => {
//   elem.addEventListener('click', (e) => {
//     modal.style.opacity = '1';
//     modal.style.visibility = 'visible';
//   });
// });

// modalClose.addEventListener('click', () => {
//   modal.style.opacity = '0';
//   modal.style.visibility = 'hidden';
// });

// modal.addEventListener('click', (e) => {
//     e.preventDefault();
//   if(e.target == modal) {
//     modal.style.opacity = '0';
//     modal.style.visibility = 'hidden';
//   }
// });

// const list = document.querySelector('.film-gallery');
// list.addEventListener('click', e => {
//   if (e.target.classList.contains('film-gallery__img')) {
//     onOpenModal(e.target.dataset.id);
//   }
// });

// function onOpenModal(id) {
//   console.log(id, 'imdb_id');
// e.preventDefault()
// if (e.target.dataset.id.length == 5) {
//   const id = e.target.dataset.target.imdb_id;
//   console.log(id, 'imdb_id');
//   return id;
// } else if (e.target.dataset.id) {
//   const id = e.target.dataset.id;
//   console.log(id, 'id');
//   return id;
// }

// const id = e.target.dataset.id;
// const url = `https://api.themoviedb.org/3/movie/${id}?api_key=1d821060cfc3dc7c024273bf806840e9&language=en-US`;
// return fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data, 'hi from data');
//     return data;
//   });
// }
