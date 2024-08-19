function getData(url) {
  return new Promise(function (resolve) {
    //创建XMLHttpRequest对象
    const xhr = new XMLHttpRequest()
    //设置请求
    xhr.open('GET', url)
    //发送请求
    xhr.send()
    //通过xhr的一个事件监听来获取请求的响应状态和数据
    xhr.onreadystatechange = function () {
      //readyState这个状态会从0逐渐变化到4 如果变到了4说明请求响应成功了
      if (xhr.readyState === 4) {
        //说明请求数据成功了 可以将当前的Promise修改为成功态 并且存储数据
        resolve(xhr.response)
      }
    }
  })
}

//发送请求，获取所有英雄数据，将数据渲染到页面上
async function fn() {
  const res = await getData('http://project.x-zd.net:3001/apis/herolist')
  // 转成js对象，获取英雄数组
  const heroArr = JSON.parse(res).data.reverse()
  //调用渲染方法，将数据渲染到页面
  displayHero(heroArr)
  // 实现渲染数据到页面的方法
  function displayHero(heroArr) {
    // 获取外层容器
    const list = document.querySelector('.list')
    // 填充之前先对容器进行清空
    list.innerHTML = ''
    // 遍历数组
    for (const { ename, cname } of heroArr) {
      list.innerHTML += `
        <a href="https://pvp.qq.com/web201605/herodetail/${ename}.shtml" target="_blank">
          <img src="https://game.gtimg.cn/images/yxzj/img201606/heroimg/${ename}/${ename}.jpg"/>
          <span>${cname}</span>
        </a>`
    }
  }
}
fn()
