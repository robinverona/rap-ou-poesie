const cardsList = document.querySelector('.cards__list');
const scoreHtml = document.getElementById('score');
const results = localStorage.getItem('quotes');

let score = 0;

console.log(results);
const resultsParsed = JSON.parse(results);

console.log(resultsParsed.length);

resultsParsed.forEach(item => {
    createResultCard(item);
    updateScore(item)
});

setTimeout(() => {
    document.querySelector('.curtain').classList.remove('open');

}, 200);


function updateScore(quote) {
    if (quote.userAnswer === true) {
        score++;
    }

    scoreHtml.innerHTML = `${score} / ${resultsParsed.length}`;
}

function createResultCard(quote) {
    let card = document.createElement('li');
    card.classList.add('results-card');

    let cardAnswer = document.createElement('div');
    cardAnswer.classList.add('results-card__answer');
    card.appendChild(cardAnswer)

    if (quote.answer === 'poetry') {
        cardAnswer.innerHTML = 'poésie';
    } else {
        cardAnswer.innerHTML = quote.answer;
    }

    if (quote.userAnswer === true) {
        card.style.backgroundColor = '#16B84E'

    } else {
        card.style.backgroundColor = '#FE1B00'
       

    }



    let cardQuote = document.createElement('p');
    cardQuote.classList.add('results-card__quote')
    cardQuote.innerHTML = quote.quote;
    card.appendChild(cardQuote);

    let cardInfos = document.createElement('div');
    cardInfos.classList.add('results-card__infos');

    let cardAuthor = document.createElement('p');
    cardAuthor.classList.add('results-card__author');
    cardAuthor.innerHTML = quote.author;
    cardInfos.appendChild(cardAuthor);

    let cardOrigin = document.createElement('p');
    cardOrigin.innerHTML = quote.origin;
    cardOrigin.classList.add('results-card__origin');

    cardInfos.appendChild(cardOrigin);


    card.appendChild(cardInfos);
    cardsList.appendChild(card);

}

let duration = 0.25; 
let stagger = duration; 
let repeatDelay = 0.075;

setTimeout(() => {
    gsap.fromTo('.results-card', 1, {
        opacity: 0,
        y: -50

    }, {
        y: 0,
        opacity: 1,
        duration: 1,
            stagger: {
            each: duration, 
        }
    })
}, 400);