const header = document.querySelector('.header')


window.addEventListener('scroll', () => {
    if (scrollY >= header.offsetHeight) {
        header.classList.remove('noactive')
        header.classList.add('active')
    } else if(header.classList.contains('active')) {
        header.classList.remove('active')
        header.classList.add('noactive')
    }
})