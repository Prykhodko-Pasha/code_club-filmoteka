const sentinelImg = document.querySelectorAll('.film-gallery__item')
const lazyImgs = document.querySelectorAll('.film-gallery__img')
const options ={}
const callback = lazyImgs =>{
  lazyImgs.forEach(img=>{    
    if(img.isIntersecting){
        img.src = img.dataset.src;
    }
  })
}
const observer = new IntersectionObserver(callback, options)
const el = sentinelImg.forEach(el => {observer.observe(el)})


// (async () => {
//   // console.log('hi')
// const sentinelImg = document.querySelectorAll('.film-gallery__item')
// const lazyImgs = document.querySelectorAll('.film-gallery__img')
// const options ={ }
//   const callback = lazyImgs =>{
//       lazyImgs.forEach(img=>{    
//         if(img.isIntersecting){
//           img.src = img.dataset.src;
//         }
//       })
//     }
//   const observer = new IntersectionObserver(callback, options)
//   const el = sentinelImg.forEach(el => {observer.observe(el)})
// })();

// // =++++
// // const observer = new IntersectionObserver(lazyImgs =>{
// //   lazyImgs.forEach(img =>{
// //     console.log('hi callback')
// //   })
// // })
// // observer.observe(sentinel)
// // lazyImgs.forEach(image => {
// //   image.addEventListener('load', onImgLoaded)
// // })
// // function onImgLoaded(e){
// //  console.log('hey')
// // }
