import modalTemplate from '../templates/modal.hbs';


const modalOpen = document.querySelectorAll('.film-gallery');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');


modalOpen.forEach((elem) => {
  elem.addEventListener('click', () => {
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
    modal.insertAdjacentHTML('beforeend', modalTemplate())
  })
  });

modalClose.addEventListener('click', () => {
  modal.style.opacity = '0';
  modal.style.visibility = 'hidden';
  clearModal();
});

function clearModal() {
  modal.innerHTML = '';
}
// modal.addEventListener('click', (e) => {
//     e.preventDefault();
//   if(e.target == modal) {
//     modal.style.opacity = '0';
//     modal.style.visibility = 'hidden';
//   }
// });

// export default class CardsApiService {
//   constructor() {
//       this.movie.id = movie.id
//   }
//    fetchCard(){
       
//       return fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=23824187957955af0aa1cb82b26c80b5&language=en-US`)
//       .then(resp => resp.json()).catch(error => console.log(error))
//     }
//   }

//  const fetchCard = new CardsApiService()
// function renderOneMovie(e){
//   e.preventDefault

//   fetchCard.fetchCard().then(movie =>
//       return {
//         ...movie,
//         genre_ids: generateGenres(movie),
//         release_date: generateData(movie),
//         vote_average: generateVote(movie),
//       };
// })
 