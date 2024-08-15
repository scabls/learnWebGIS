// 询问
const ask = document.querySelector('.ask')
// 半透明遮罩环境
const bg = document.querySelector('.bg')
// 死缠烂打
const stalker = document.querySelector('.stalker')
// 打字机深情表白
const confession = document.querySelector('.confession')

// 营造死缠烂打环境函数
function atmosphere() {
    bg.style.display = 'block'
    stalker.style.display = 'block'
}
// 给深情表白腾地方函数
function makeRoom() {
    ask.style.display = 'none'
    bg.style.display = 'none'
    stalker.style.display = 'none'
    confession.style.display = 'block'
}
// 深情表白函数
function typewriter() {
    const str =
        '有人说，人的一生会遇到2920万人，而两个人相爱的概率只有0.000049。在这茫茫人海中，两个人能相遇就值得感激，能相爱更是一种难得。所以，我很庆幸上天让我遇见了你。我希望有个如你一般的人，能看完我写过的所有状态，读完我所有的日志，看完我从小到大的照片，试着听我喜欢的歌。如果可以，甚至陪我去我喜欢的地方，只想弥补错过你的青春'
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
// 以上两者代表成功函数
function success() {
    makeRoom()
    typewriter()
}
// 深情表白需要弹窗喊话函数
function model(content, fn) {
    //fn代表将来要传递进来的函数
    atmosphere()
    //定义自定义弹框中的内容
    stalker.innerHTML = `<p class="content">${content}</p>
                        <button type="button" class="button">确定</button>`

    //给自定义弹框中的按钮添加点击事件
    document.querySelector('button').addEventListener('click', function () {
        fn()
    })
}

// 对方同意了
document.querySelector('.agree').addEventListener('click', function () {
    model('我就知道小姐姐您一定会愿意的。(^_^)', success)
})

// 被拒绝了
document.querySelector('.refuse').addEventListener('click', function () {
    model('明人不说暗花', f1)
})

function f1() {
    model('我喜欢你！', f2)
}
function f2() {
    model('我知道你在等我这一句话', f3)
}
function f3() {
    model('请您不要拒绝我', f4)
}
function f4() {
    model('拒绝我，不存在的', f5)
}
function f5() {
    model('这辈子都不可能让你离开我', f6)
}
function f6() {
    model('跟我走吧', f7)
}
function f7() {
    model('房产证上写你名', f8)
}
function f8() {
    model('我会做饭', f9)
}
function f9() {
    model('爱你。么么哒！', f10)
}
function f10() {
    model('行，我们去民政局登记吧', success)
}
