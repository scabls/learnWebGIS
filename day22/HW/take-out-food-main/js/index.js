// 获取headr元素
const header = document.querySelector('.header')

// 监听页面滚动
window.addEventListener('scroll', () => {
    // 根据滚动设置样式
    if (scrollY >= header.offsetHeight) {
        header.classList.remove('noactive')
        header.classList.add('active')
    } else if (header.classList.contains('active')) {
        header.classList.remove('active')
        header.classList.add('noactive')
    }
})

// 获取要添加动画的元素
const reveal = document.querySelectorAll('[data-reveal]')

// 将复位元素的操作单独提取出
function resetItem() {
    // 遍历所有的动画元素,添加复位样式
    reveal.forEach(item => {
        // 
        if (item.getBoundingClientRect().top < window.innerHeight - 100) {
            item.classList.add('reset')
        }
    })
}

window.addEventListener('load',resetItem)

window.addEventListener('scroll',resetItem)