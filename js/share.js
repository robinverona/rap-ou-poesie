const closeShare = document.getElementById('closeShare');

closeShare.addEventListener('click', (e) => {
    // e.preventDefault();
    // e.stopImmediatePropagation();
    gsap.to('.share__window', 2, {
        opacity: 0, 
        transform: 'rotate(50deg)'
    })    
    document.querySelector('.curtain').classList.toggle('open');

    setTimeout(() => {
        history.back();
    }, 1000);
})

setTimeout(() => {
    document.querySelector('.curtain').classList.remove('open')
}, 200);