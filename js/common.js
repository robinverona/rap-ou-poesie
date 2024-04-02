const links = document.querySelectorAll('.link');

console.log(links);

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation(); 
        gsap.to('main', 0.5, {
            opacity: 0
        })       
        console.log('e dans event listerner :: ', e);
        document.querySelector('.curtain').classList.toggle('open');
        setTimeout(() => {
            console.log('e dans settimeout :: ', e);

            window.location = e.target.attributes['data-url'].value;
        }, 1000);
    })
});


setTimeout(() => {
    document.querySelector('.curtain').classList.remove('open')
}, 200);

const tl = gsap.timeline()
const squares = document.querySelectorAll('.square');

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

squares.forEach((el) => {
  tl.from(el, {
    transform: `translate(-50%, -50%) rotate(${random(0, 360)}deg)`,
    opacity: 0,
    duration: 2,
    ease: 'expo.inOut'
  }, '<')
})
