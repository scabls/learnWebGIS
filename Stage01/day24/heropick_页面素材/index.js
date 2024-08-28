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

/* ==========发送请求，获取所有英雄数据，将数据渲染到页面上========== */
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
        <li>
          <a href="https://pvp.qq.com/web201605/herodetail/${ename}.shtml" target="_blank">
            <img src="https://game.gtimg.cn/images/yxzj/img201606/heroimg/${ename}/${ename}.jpg"/>
            <span>${cname}</span>
          </a>
        </li>`
    }
  }
  /* ==========实现上层单选框的单选效果========== */
  const radios = document.querySelectorAll('.radio')
  // 遍历每一个自定义单选框
  radios.forEach(radio => {
    // 添加点击事件，实现单选效果
    radio.addEventListener('click', function () {
      // 实现点击哪一个则选中，其余的取消选中
      // 排他思想：先清除所有radio样式
      radios.forEach(radio => radio.classList.remove('checked'))
      // 再给当前按钮添加样式
      this.classList.add('checked')
      /* ==========实现页面上层区域自定义单选框的数据筛选========== */
      // 先获取当前单选框radio的自定义属性的值
      const type = this.dataset.type
      const value = this.dataset.value
      // 根据type的不同，根据对应value过滤heroArr的数据
      let filterArr = []
      if (type == 'all') filterArr = heroArr
      else if (type == 'pay_type') filterArr = heroArr.filter(item => item.pay_type == value)
      else filterArr = heroArr.filter(item => item.hero_type == value || item.hero_type2 == value)
      // 将过滤后的数据渲染到页面上
      displayHero(filterArr)
    })
  })
  /* ==========实现上层区域的搜索内容========== */
  // 获取搜索框
  const input = document.querySelector('.input input')
  input.addEventListener('input', function () {
    // 获取文本框内的内容
    const value = input.value
    // 到heroArr中查找包含这个字符的数据
    const heros = heroArr.filter(hero => hero.cname.includes(value))
    // 将过滤后的数据渲染到页面上
    displayHero(heros)
    // 获取ul容器中的标签体内容，将含有关键字的文本进行替换
    const ul = document.querySelector('.list')
    const content = ul.innerHTML.replaceAll(value, `<span style="color:red">${value}</span>`)
    ul.innerHTML = content
    // 如果没有输入，或者输入了空格，显示所有数据
    if (!value.trim()) displayHero(heroArr)
    // 再次使用排他思想，取消所有单选框选中状态，将全选单选框设为选中状态
    radios.forEach(radio => radio.classList.remove('checked'))
    document.querySelector('.radio[data-type=all]').classList.add('checked')
  })
}
fn()
