'use strict'; 
const cardDeck = document.querySelector('.card-deck');
const rapButton = document.getElementById('rap');
const poetryButton = document.getElementById('poetry');
const QUOTES_LIMIT = localStorage.getItem('quotesNumber');
// const URL = 'http://rop.robinverona.com'; 
const URL = 'http://localhost:5500';
let counterHtml = document.querySelector('.counter');
let loadedQuotes = [];
let quotes = [];
let availableQuotes = [];
let i = 0;
let card; // reference to current card
let counter = 0;
let randomIndex;
let bounds;
let prevBgColors = []; 
let colorIndex = -1;

// get all quotes from JSON
fetch('../data/quotes.json')
    .then(res => {
        return res.json()
    })
    .then(quotesFromJSON => {
        loadedQuotes = quotesFromJSON
        init();     
    })
    .catch(err => {
        console.error(err)
});

function init() {
    availableQuotes = [...loadedQuotes];
    shuffle(availableQuotes)
    quotes = pick(availableQuotes);
    setTimeout(() => {
        createCounter();
        createCard(quotes[i]);
        
    }, 100);

    setTimeout(() => {
        document.querySelector('.curtain').classList.remove('open')
    }, 200);
}

function pick(arr) {
    let newQuotes = [];
    for (let index = 0; index < QUOTES_LIMIT; index++) {
        newQuotes.push(arr[index]);
        delete arr[index]; 
    }
    console.log(newQuotes);
    return newQuotes;
}

function createCard(question) {
    const colors = ['green', 'orange', 'purple', 'yellow', 'grey', 'blue', 'pink', 'skyblue', 'brown', 'black', 'nightblue'];
    // const colors = ['black', 'nightblue', 'yellow']; // for testing
    let randomNumber = Math.floor(Math.random() * colors.length);
    let currentColor = colors[randomNumber];
    // prevBgColors.push(currentColor);
    // document.body.classList.add(`bg-${prevBgColor}`);
    document.body.classList.add(`bg-${prevBgColors[colorIndex]}`)

    // Create card block
    card = document.createElement('div');
    card.classList.add('card');

    // Create inner card wrapper
    let cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    card.appendChild(cardInner);
    
    // Create card front
    let cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.classList.add(colors[randomNumber]);

    // In case i need it 
    switch (colors[randomNumber]) {
        case 'yellow':
            console.log("IT'S BLACK !!!")
            document.querySelector(':root').style.setProperty('--color-on-bg', '#111')
            break;
        case 'pink':
            console.log("IT'S Night !!!")
            document.querySelector(':root').style.setProperty('--color-on-bg', '#111')
            break;    
        default:
            document.querySelector(':root').style.setProperty('--color-on-bg', '#F5F5F5')
            break;
    }

    // if (colors[randomNumber] === 'black') {
    //     document.querySelector(':root').style.setProperty('--color-on-bg', '#F5F5F5')
    // } if (colors[randomNumber] === 'nightblue') {
    //     document.querySelector(':root').style.setProperty('--color-on-bg', '#F5F5F5')
    // } else {
    //     document.querySelector(':root').style.setProperty('--color-on-bg', '#11111')
    // }

    // WIP: Change bg color with same color with lower opacity
    console.log(prevBgColors)
    console.log(prevBgColors[colorIndex])
    let dot = document.querySelector('#dot')
    dot.className= "";
    dot.classList.add(`bg-${currentColor}`);
    gsap.fromTo('#dot', {
        scale: 1,
        height: '0',
        width: '0',
    }, {
        scale: 1,
        height: '142vmax',
        width: '142vmax',
        duration: 0.75,
    })
    // setTimeout(() => {
    //     document.body.classList = ""
    // }, 100);
    cardInner.appendChild(cardFront);

    let cardFrontPara = document.createElement('p');
    cardFrontPara.innerHTML = question.quote;
    cardFrontPara.classList.add('card-text');
    cardFront.appendChild(cardFrontPara);

    // Create card back
    let cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardInner.appendChild(cardBack);

    let cardBackAuthor = document.createElement('span');
    cardBackAuthor.innerHTML = question.author;
    cardBackAuthor.classList.add('card-author');
    cardBack.appendChild(cardBackAuthor);

    let cardBackOrigin = document.createElement('span');
    cardBackOrigin.innerHTML = question.origin;
    cardBackOrigin.classList.add('card-origin');
    cardBack.appendChild(cardBackOrigin);

    // create glow div for effect
    // let glowHtml = document.createElement('div');
    // glowHtml.classList.add('glow');
    // cardFront.appendChild(glowHtml);

    // cardDeck.appendChild(card)
    cardDeck.insertBefore(card, cardDeck.children[1]);
    gsap.from('.card', {
        top: '-250px'
    }) 
    colorIndex++;

    updateCounter()
}

function flipCard() {
    card.classList.add('translated');
}

function removeCard(card) {
    card.remove();
}


function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function nextCard() {
    i++;

    if (i === quotes.length) {
        console.log("END");
        saveCard(quotes)

        document.querySelector('.curtain').classList.toggle('open')


        setTimeout(() => {
            window.location.replace(`${URL}/results.html`)
        }, 1000);
    } else {
        removeCard(card)
        document.body.classList = ''

        createCard(quotes[i])
    }
}

function checkAnswer(answer) {
    if (quotes[i].answer === answer) {
        quotes[i].userAnswer = true
        gsap.to('.card-back', {
            backgroundColor: '#16B84E',
            color: '#F5F5F5',
        })
        dot.classList.add(`bg-success`);
        gsap.fromTo('#dot', {
            scale: 1,
            height: '0',
            width: '0',
        }, {
            scale: 1,
            height: '142vmax',
            width: '142vmax',
            duration: 0.4,
        })
        // document.body.classList.add(`bg-success`)
        prevBgColors.push(`success`);
        setTimeout(() => {
            gsap.to('.card', 
            {
                top: '-350px', 
                transform: 'scale(1.3) rotate(40deg) translateY(-80px)',
                opacity: 0,
                ease: Power1. easeOut,
            })
        }, 1000);
    } else {
        quotes[i].userAnswer = false
        gsap.to('.card-back', {
            backgroundColor: '#FE1B00',
            color: '#F5F5F5',


        })
        dot.classList.add(`bg-error`);
        gsap.fromTo('#dot', {
            scale: 1,
            height: '0',
            width: '0',
        }, {
            scale: 1,
            height: '150vmax',
            width: '150vmax',
            duration: 0.4,
        })
        // document.body.classList.add(`bg-error`)
        prevBgColors.push(`error`);

        setTimeout(() => {
            gsap.to('.card', {
                top: '-350px', 
                transform: 'scale(1.3) rotate(-40deg) translateY(-80px)',
                opacity: 0,
                ease: Power1. easeOut,
            })
        }, 1000);
    }

    setTimeout(() => {
        gsap.to('.card', {
            // opacity: 0
        })
        nextCard()
    }, 1500);
}

function saveCard(arr) {
    const sessionQuotes = JSON.stringify(arr);
    localStorage.setItem(
        "quotes",
        sessionQuotes
      )
}

function createCounter() {

    // counterHtml = document.createElement('div')
    // counterHtml.classList.add('counter')

    let counterCurrent = document.createElement('span')
    counterCurrent.classList.add('counter-current')
    counterCurrent.innerHTML = counter
    counterHtml.appendChild(counterCurrent)

    let totalCount = document.createElement('span')
    totalCount.innerHTML = ` / ${quotes.length}`
    counterHtml.appendChild(totalCount)

    // cardDeck.insertBefore(counterHtml, cardDeck.children[0])

    gsap.from('.counter', {
        opacity: 0
    })
}

function updateCounter() {
    counter++
    // counterHtml.innerHTML = `${counter} / ${quotes.length}`
    let counterCurrent = document.querySelector('.counter-current')
    counterCurrent.innerHTML = `${counter}`
    gsap.from('.counter-current', {
        y: -100,
        opacity: 0
    })

}


rapButton.addEventListener('click', () => {
    gsap.to('.card', {
        transform: 'rotate(0)'
    })
    flipCard()
    rapButton.disabled = true;
    checkAnswer('rap')
    
})

poetryButton.addEventListener('click', () => {
    gsap.to('.card', {
        transform: 'rotate(0)'
    })
    flipCard()
    poetryButton.disabled = true;
    checkAnswer('poetry')
    
})
