const slider = document.getElementById("settingsRange");
const output = document.getElementById("settingsValue");
const playButton = document.getElementById('playButton');
// const URL = 'http://rop.robinverona.com' 
const URL = 'http://127.0.0.1:5500' 
let valueToSave = 10;

localStorage.clear();
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
  valueToSave = this.value; 
  saveUserInput();
}

saveUserInput();

function saveUserInput() {
    localStorage.setItem(
        "quotesNumber",
        valueToSave
    )
}

// const squares = [squareOne.value, squareTwo.value, squareThree.value, squareFour.value]
// const persos = [persoOne.value, persoTwo.value, persoThree.value, persoFour.value, persoFive.value, persoSix.value]

// const random = (min: number, max: number) => {
//   return Math.floor(Math.random() * (max - min + 1)) + min
// }

// squares.forEach((el) => {
//   const actualRotation = el.style.transform.split('rotate(')[1].split('deg)')[0]
//   tl.to(el, {
//     transform: `translate(-50%, -50%) rotate(${parseInt(actualRotation) + random(-360, -900)}deg)`,
//     scale: 8,
//     translateZ: 1,
//     duration: 3,
//     ease: 'expo.inOut'
//   }, '<')
// })
// const tl = gsap.timeline()
// const squares = document.querySelectorAll('.square');

// const random = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1)) + min
// }

// squares.forEach((el) => {
//   tl.from(el, {
//     transform: `translate(-50%, -50%) rotate(${random(0, 360)}deg)`,
//     opacity: 0,
//     duration: 2,
//     ease: 'expo.inOut'
//   }, '<')
// })



function playAnimation() {
  gsap.to('main', 0.5, {
    opacity: 0
  })       
  // console.log('e dans event listerner :: ', e);
  document.querySelector('.curtain').classList.toggle('open');
  setTimeout(() => {
      // console.log('e dans settimeout :: ', e);

      window.location.replace(`${URL}/app.html`)
    }, 1000);
}

playButton.addEventListener('click', () => {
  playAnimation()
})