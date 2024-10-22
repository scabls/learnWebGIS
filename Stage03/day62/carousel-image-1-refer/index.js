const doms = {
  carouselList: document.querySelector('.carousel-list'),
  arrowLeft: document.querySelector('.left'),
  arrowRight: document.querySelector('.right'),
  dots: document.querySelectorAll('.dot span'),
}
// [img1,img2,img3]
// 设置显示的图片的index
let currentIndex = 0
const initClone = () => {
  // 获取第一个图片的dom, 深度克隆一份, 并添加到最后
  // 获取最后一个图片的dom, 深度克隆一份, 并添加到第一个
  const firstClone = doms.carouselList.firstElementChild.cloneNode(true)
  const lastClone = doms.carouselList.lastElementChild.cloneNode(true)
  doms.carouselList.appendChild(firstClone)
  doms.carouselList.insertBefore(lastClone, doms.carouselList.firstElementChild)
  // 将lastClone向左平移自身的宽度,但transform平移后, 在标准流中占据的空间位置不变
  lastClone.style.transform = 'translateX(-100%)'
  // 为了腾出位置, 将lastClone设置绝对定位,脱离标准流, 这样在视觉上index为0时画框仍显示原第一张图片
  lastClone.style.position = 'absolute'
}
initClone() // 现在是[copy3,img1,img2,img3,copy1],显示img1
// 定义切换图片的函数
const switchImage = index => {
  // 根据index计算平移距离
  // 当index为0是, translateX为0, 显示第一张图片
  // 当index为1是, translateX为-100%, 显示第二张图片
  // 当index为2是, translateX为-200%, 显示第三张图片
  // 所以平移距离是-index*100%
  // 因为图片宽度就等于容器宽度,所以平移距离就是indexDiff*自身宽度的100%
  doms.carouselList.style.transform = `translateX(${-index * 100}%)`
  // 设置过渡效果
  doms.carouselList.style.transition = '0.5s'
  // 更新当前显示的index
  currentIndex = index
  // 更新dot样式
  const activeDot = document.querySelector('.active')
  if (activeDot) activeDot.classList.remove('active')
  doms.dots[index].classList.add('active')
}
// 为每个dot注册点击事件处理器,点击时切换图片
doms.dots.forEach((dot, index) => {
  dot.addEventListener('click', function () {
    switchImage(index)
  })
})
// 克隆前图片数量,即dot数量
const imgCount = doms.dots.length
// 设置左右箭头点击事件处理器,点击时切换图片
doms.arrowLeft.addEventListener('click', function () {
  // [copy3,img1,img2,img3,copy1]
  // 处理边缘情况, 当现在展示的是img1是,点击时以无过渡的方式平移切换到copy1
  // 再从copy1过渡平移切换到img3
  if (currentIndex === 0) {
    // img1的平移距离是0
    // 从img1的位置到copy1要平移的距离是未克隆前图片的总宽度
    doms.carouselList.style.transform = `translateX(${-imgCount * 100}%)`
    doms.carouselList.style.transition = 'none'
    //浏览器渲染原理的知识 在这里告诉浏览器 刷新一下 通知浏览器重绘
    //可以通过访问dom的位置属性触发重排并重绘
    // 最好访问刚修改过的
    doms.carouselList.offsetLeft //访问offsetLeft属性 触发重排并重绘
    // 实际上现在展示图片的index是imgCount
    // 下一个要展示的图片是imgCount-1
    switchImage(imgCount - 1)
  } else switchImage(currentIndex - 1)
})
doms.arrowRight.addEventListener('click', function () {
  // [copy3,img1,img2,img3,copy1]
  // 处理边缘情况, 当现在展示的是img3时,点击时以无过渡的方式平移切换到copy3
  // 再从copy3过渡平移切换到img1
  if (currentIndex === imgCount - 1) {
    // 从img1到copy3要平移的距离是100%
    doms.carouselList.style.transform = `translateX(${100}%)`
    doms.carouselList.style.transition = 'none'
    doms.carouselList.offsetLeft //访问offsetLeft属性 触发重排并重绘
    // 下一个要展示的图像index是0
    switchImage(0)
  } else switchImage(currentIndex + 1)
})
