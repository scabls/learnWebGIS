const siderBar = document.querySelector('.slider-bar')
const goBack = document.querySelector('.goBack')
const banner = document.querySelector('.banner')
const main = document.querySelector('.main')
const siderBarY = siderBar.offsetTop

window.addEventListener('scroll', () => {
    // 反正事件也是window触发的
    if (this.scrollY > banner.offsetTop) {
        siderBar.style.position = 'fixed'
        siderBar.style.top = `${siderBarY - banner.offsetTop}px`
    } else {
        siderBar.style.position = 'absolute'
        siderBar.style.top = `300px`
    }
    
    if (this.scrollY > main.offsetTop) {
        goBack.style.display = 'block'
    } else {
        goBack.style.display = 'none'
    }
})