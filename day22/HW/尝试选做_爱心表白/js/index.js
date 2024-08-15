// 询问
const ask = document.querySelector('.ask')
const options = document.querySelectorAll('.option span')
// 半透明遮罩
const bg = document.querySelector('.bg')
// 死缠烂打
const stalker = document.querySelector('.stalker')
const content = document.querySelector('.content')
const button = document.querySelector('.button')
// 死缠烂打的稿子
const neverGiveUp = [
    '我喜欢你！',
    '我知道你在等我这一句话',
    '请您不要拒绝我',
    '拒绝我，不存在的',
    '这辈子都不可能让你离开我',
    '跟我走吧',
    '房产证上写你名',
    '我会做饭',
    '爱你。么么哒！',
    '行，我们去民政局登记吧',
]
// 打字机深情表白
const confession = document.querySelector('.confession')

// 给深情表白腾地方函数
function makeRoom() {
    ask.style.display = 'none'
    bg.style.display = 'none'
    stalker.style.display = 'none'
    confession.style.display = 'block'
}
// 深情表白函数
function typewriter() {
    const str = '有人说，人的一生会遇到2920万人，而两个人相爱的概率只有0.000049。在这茫茫人海中，两个人能相遇就值得感激，能相爱更是一种难得。所以，我很庆幸上天让我遇见了你。我希望有个如你一般的人，能看完我写过的所有状态，读完我所有的日志，看完我从小到大的照片，试着听我喜欢的歌。如果可以，甚至陪我去我喜欢的地方，只想弥补错过你的青春'
    let i = 1
    const len = str.length

    confession.textContent = str.slice(0, i) + '_'
    const s = setInterval(function () {
        i++
        confession.textContent = str.slice(0, i) + '_'
        if (i == len) {
            clearInterval(s)
        }
    }, 100)
}

// 表白开始
options.forEach(option => {
    // 无论成功还是失败，都要为下一步做准备
    option.addEventListener('click', () => {
        bg.style.display = 'block'
        stalker.style.display = 'block'
    })
    // 如果成功了，深情表白
    if (option.classList.contains('agree')) {
        option.addEventListener('click', () => {
            button.addEventListener('click', () => {
                makeRoom()
                typewriter()
            })
        })
    }
    // 如果失败了
    if (option.classList.contains('refuse')) {
        option.addEventListener('click', () => {
            // 不慌，先背句稿子
            content.textContent = '明人不说暗话！'
            button.addEventListener('click', () => {
                // 接着背稿子，稿子背一句少一句
                if (neverGiveUp.length > 0) {
                    content.textContent = neverGiveUp.shift()
                } else {
                    //背完了就当对方同意了，深情表白
                    makeRoom()
                    typewriter()
                }
            })
        })
    }
})