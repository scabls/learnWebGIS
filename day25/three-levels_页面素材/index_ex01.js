;(async function getData(url) {
  // 改进了上一个案例冗余的做法，不再使用函数返回新的promise，而是直接创建新的promie
  const dataJSON = await new Promise(function (resolve) {
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
  /* ==========获取并将数据填充到省市区对应的列表容器内 */
  const dataArr = JSON.parse(dataJSON).data
  // 定义一个填充函数，用于省市区分别调用
  /**
   * 将数组渲染到指定位置
   * @param {*} dataArr 省市区数组，我们需要获取里面的label属性作为地名
   * @param {*} position 位置，选择框，用于定位选择框下的列表容器
   */
  function fillSelect(dataArr, position) {
    // 获取指定位置下的列表容器
    const ul = position.querySelector('ul')
    // 使用map方法对数组元素进行批处理，返回包含指定格式dom字符串的数组，再使用join()将数组转为一个无分隔符的字符串
    // 将字符串作为html插入到列表容器中
    ul.innerHTML = dataArr.map(item => `<li>${item.label}</li>`).join('') /* 不要忘了join */
    // 如果有数据填充，将选择框的禁用状态取消。没有则重新设为禁用状态
    // 修剪一下空格更保险
    position.className = `select ${ul.innerHTML.trim() == '' ? 'disabled' : ''}`
  }
  // 获取省市区
  const province = document.querySelector('#selProvince')
  const city = document.querySelector('#selCity')
  const area = document.querySelector('#selArea')
  // 定义省市区地名数组
  let provinceList = dataArr
  let cityList = []
  let areaList = []
  // 填充省市区
  fillSelect(provinceList, province)
  // 其实现在市和区没必要填充，此处的唯一效果就是将disabled类添加到选择框，将初始状态变成禁用
  // 但这一点可以直接在html上实现
  fillSelect(cityList, city)
  fillSelect(areaList, area)

  // 将添加点击事件封装成一个函数，省市区分别调用
  /**
   * 为指定位置下的title区域和ul容器注册点击事件
   * @param {*} position 位置，选择框，用于定位选择框下的title区域
   */
  function registerEvent(position) {
    /* ==========给选择框的title区域添加点击事件========= */
    // 获取指定位置下的title区域
    const title = position.querySelector('.title')
    title.addEventListener('click', function () {
      // 如果选择框是禁用状态，直接返回，中断事件处理器
      if (position.classList.contains('disabled')) return
      // 点击之后，切换展开状态，取消非本选择框的其他选择框的展开状态
      const preExpand = document.querySelector('.select.expand')
      // 如果存在展开的选择框且不是本选择框，关闭它
      if (preExpand && preExpand != position) preExpand.classList.remove('expand')
      // 最好先排他再设置
      position.classList.toggle('expand')
    })
    /* ==========给选择框的ul区域内的li添加点击事件(事件代理)========= */
    // 获取指定位置下的列表容器
    const ul = position.querySelector('ul')
    ul.addEventListener('click', function (e) {
      // 如果事件源对象不是li元素，结束事件处理函数
      if (e.target.tagName != 'LI') return
      const li = e.target
      // 为被点击的li添加样式，在此之前，先取消上一个有样式的li的样式
      // 注意，限制在当前下拉框内
      const preActive = position.querySelector('li.active')
      if (preActive) preActive.classList.remove('active')
      // 给当前点击的li添加选中状态
      li.classList.add('active')
      // 将下拉选择框的展示文本变成所选的地名
      title.querySelector('span').textContent = li.textContent
      // 收起选择框
      position.classList.remove('expand')
    })
  }
  // 给省市区注册事件
  registerEvent(province)
  registerEvent(city)
  registerEvent(area)
  /* ==========根据选择框内的值更新下一个选择框ul的展示数据 */
  // 定义一个查询函数，查询获得某个地区的下级区域数组
  /**
   * 获得下级区域数组
   * @param {*} dataArr
   * @param {*} name
   */
  function findChildren(dataArr, name) {
    const children = dataArr.find(item => item.label == name).children
    // 有的元素没有children属性，会接收到undefined
    if (children == undefined) return []
    else return children
  }
  function updateCity() {
    const ul = province.querySelector('ul')
    // 当点击省份的li时，根据li文本为城市添加数据
    ul.addEventListener('click', function (e) {
      // 如果事件源对象不是li元素，结束事件处理函数
      if (e.target.tagName != 'LI') return
      const li = e.target
      cityList = findChildren(provinceList, e.target.textContent)
      areaList = []
      // 重新设置当前省份对应的城市和地区数据
      fillSelect(cityList, city)
      fillSelect(areaList, area)
      // 重新设置城市和地区的title内容
      city.querySelector('.title span').textContent = '请选择城市'
      area.querySelector('.title span').textContent = '请选择地区'
    })
  }
  updateCity()
  function updateArea() {
    const ul = city.querySelector('ul')
    // 当点击城市的li时，根据li文本为区域添加数据
    ul.addEventListener('click', function (e) {
      // 如果事件源对象不是li元素，结束事件处理函数
      if (e.target.tagName != 'LI') return
      const li = e.target
      areaList = findChildren(cityList, e.target.textContent)
      // 重新设置当前城市对应的地区数据
      fillSelect(areaList, area)
      // 重新设置地区的title内容
      area.querySelector('.title span').textContent = '请选择地区'
    })
  }
  updateArea()
})('http://project.x-zd.net:3001/apis/citylist')
