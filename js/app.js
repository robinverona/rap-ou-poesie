"use strict";
const QUOTES_LIMIT = 10;
let card; // reference to current card
let i = 0;
let counterHtml = document.querySelector('.counter');
let counter = 0;

// Counter 

const createCounter = () => {
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

const updateCounter = () => {
    counter++
    // counterHtml.innerHTML = `${counter} / ${quotes.length}`
    let counterCurrent = document.querySelector('.counter-current')
    counterCurrent.innerHTML = `${counter}`
    gsap.from('.counter-current', {
        y: -100,
        opacity: 0
    })
}


// Handle background color changes

const hexToHsl = (H) => {
     // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
        r = "0x" + H[1] + H[1];
        g = "0x" + H[2] + H[2];
        b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
        r = "0x" + H[1] + H[2];
        g = "0x" + H[3] + H[4];
        b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta == 0)
        h = 0;
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    else if (cmax == g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
        h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return "hsl(" + h + "," + s + "%," + l + "%)";
}

const changeLightness = (hslStr) => {
    const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  
    const newLightness = 25;
  
    return `hsl(${hue}, ${saturation}%, ${newLightness}%)`;
  };

const getRandomColor = () => {
    let randomColorIndex = Math.floor(Math.random() * colors.length);
    let pickedColor = hexToHsl(colors[randomColorIndex]);

    return pickedColor;
}

const setBgColor = (color) => {
    let bgColor = changeLightness(color);
    gsap.to("#root", {
        backgroundColor: bgColor,
    });
}

const setCardColor = (color) => {
    gsap.set(".card-front", {
        backgroundColor: color,
    });

}

const setCircleTransitionColor = (color = getRandomColor()) => {
    let circleColor = color;

    gsap.fromTo("#circleTransition", {
        scale: 1,
        height: "0",
        width: "0",
        backgroundColor: circleColor,
        filter: "brightness(85%)",
    }, {
        scale: 1,
        height: "142vmax",
        width: "142vmax",
        duration: 0.75,
        // filter: "brightness(85%)",

        onStart: () => {
            setCardColor(circleColor);
        },
        onComplete: () => {
            setBgColor(circleColor);
            console.log("bg color ::", circleColor);
        }
    });
}

const pick = (arr) => {
    let newQuotes = [];
    for (let index = 0; index < QUOTES_LIMIT; index++) {
        newQuotes.push(arr[index]);
        delete arr[index]; 
    }
    return newQuotes;
}

const shuffle = (arr) => {
    let currentIndex = arr.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex], arr[currentIndex]];
    }
  
    return arr;
}

const init = () => {
    availableQuotes = [...loadedQuotes];
    shuffle(availableQuotes)
    quotes = pick(availableQuotes);
    setTimeout(() => {
        createCounter();
        createCard(quotes[i]);
        console.log("app start");
    }, 100);
}

const createCard = (question) => {
    // Create card block
    card = document.createElement("div");
    card.classList.add("card");

    // Create inner card wrapper
    let cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    card.appendChild(cardInner);
    
    // Create card front
    let cardFront = document.createElement("div");
    cardFront.classList.add("card-front");

    cardInner.appendChild(cardFront);

    let cardFrontPara = document.createElement("p");
    cardFrontPara.innerHTML = question.quote;
    cardFrontPara.classList.add("card-text");
    cardFront.appendChild(cardFrontPara);
    // Create card back
    let cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    cardInner.appendChild(cardBack);

    let cardBackAuthor = document.createElement("span");
    cardBackAuthor.innerHTML = question.author;
    cardBackAuthor.classList.add("card-author");
    cardBack.appendChild(cardBackAuthor);

    let cardBackOrigin = document.createElement("span");
    cardBackOrigin.innerHTML = question.origin;
    cardBackOrigin.classList.add("card-origin");
    cardBack.appendChild(cardBackOrigin);

    cardDeck.insertBefore(card, cardDeck.children[1]);
    setCardColor(currentColor);
    gsap.from('.card', {
        top: '-250px'
    }) 
    updateCounter();

}

const checkAnswer = (answer) => {
    if (quotes[i].answer === answer) {
        quotes[i].userAnswer = true
        gsap.to('.card-back', {
            backgroundColor: '#16B84E',
            color: '#F5F5F5',
        });
        let successColor = hexToHsl("#16B84E")
        setCircleTransitionColor(successColor);        
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
        let errorColor = hexToHsl("#FE1B00")
        setCircleTransitionColor(errorColor);     
        // setCircleTransitionColor("#FE1B00");        

        gsap.to('.card-back', {
            backgroundColor: '#FE1B00',
            color: '#F5F5F5',
        });
        

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
            opacity: 0
        })
        nextCard()
    }, 1500);
}

const removeCard = (card) => {
    card.remove();
}

const flipCard = () => {
    card.classList.add('translated');
}

const nextCard = () => {
    i++;
    setCircleTransitionColor();
    console.log("Quotes ::", quotes);      

    if (i === quotes.length) {
        console.log("END");
        // saveCard(quotes)

        // document.querySelector('.curtain').classList.toggle('open')


        // setTimeout(() => {
        //     window.location.replace(`${URL}/results.html`)
        // }, 1000);
    } else {
        removeCard(card)
        createCard(quotes[i])
    }
}

// App
const colors = ["#439a7c", "#fb6832", "#7064a5", "#111", "#535150", "#588dcf", "#4c8ec2", "#b78e68"];
let currentColor = getRandomColor(); 

let loadedQuotes = [];
let quotes = [];
let availableQuotes = [];

const cardDeck = document.querySelector(".card-deck");
const rapButton = document.getElementById("rap");
const poetryButton = document.getElementById("poetry");
const circleTransition = document.getElementById("circleTransition");

document.addEventListener("DOMContentLoaded", () => {


    fetch("../data/quotes.json")
    .then(res => {
        return res.json()
    })
    .then(quotesFromJSON => {
        loadedQuotes = quotesFromJSON

        init();    
        setBgColor(currentColor);
    })
    .catch(err => {
        console.error(err)
    });

});


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