const popUp = document.querySelector('header a')
const bg = document.querySelector('.bg')
const form = document.querySelector('main')
const closeBtn = document.querySelector('#close')
popUp.addEventListener('click', e => {
    e.preventDefault()
    bg.style.display = 'block'
    form.style.display = 'block'
    form.style.transform = 'none'
    form.style.left = `${form.offsetLeft - 0.5 * form.offsetWidth}px`
    form.style.top = `${form.offsetTop - 0.5 * form.offsetHeight}px`
})

closeBtn.addEventListener('click', () => {
    bg.style.display = 'none'
    form.style.display = 'none'
    form.style.transform = 'translate(-50%, -50%)'
    form.style.left = '50%'
    form.style.top = '50%'
})

form.addEventListener('mousedown', function (e) {
    this.style.cursor = 'move'
    const mouseOffsetX = e.pageX - this.offsetLeft
    const mouseOffsetY = e.pageY - this.offsetTop
    const maxX = window.innerWidth
    const maxY = window.innerHeight
    const formWidth = this.offsetWidth
    const formHeight = this.offsetHeight
    const formOffset = e => {
        let formX = e.pageX - mouseOffsetX
        let formY = e.pageY - mouseOffsetY
        if (formX < 50 - formWidth) { formX = 50 - this.offsetWidth }
        if (formY < 50 - formHeight) { formY = 50 - this.offsetHeight }
        if (formX > maxX - 50) { formX = maxX - 50 }
        if (formY > maxY - 50) { formY = maxY - 50 }
        this.style.left = `${formX}px`
        this.style.top = `${formY}px`
    }
    document.addEventListener('mousemove', formOffset)
    document.addEventListener('mouseup', () => {
        this.style.cursor = 'auto'
        document.removeEventListener('mousemove', formOffset)
    })

})

