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

async function fn() {
  //发送异步请求获得数据
  const result = await getData('http://project.x-zd.net:3001/apis/citylist')
  const allData = JSON.parse(result)
  // 文档注释：/**
  /**
   * 渲染方法，将list数组中的数据转成dom字符串，填充到对应的select下的ul中
   * @param {*} select 选择框（将来传递数据的时候，需要指定：省/市/区）
   * @param {*} list 数据源（对应选择框所需要的数据）
   */

  function fillSelect(select, list) {
    // 填充时做判断，如果list中没有数据，禁用对应的title
    select.className = `select ${list.length > 0 ? '' : 'disabled'}`
    // 获取对应select下的ul容器
    // querySelector不仅可以使用document调用，还可以使用元素调用。
    // 可以用于获取指定元素下的标签
    const ul = select.querySelector('.options')
    // 将list对象转为dom字符串数组，然后拼接成一个完整的字符串，填充到ul下
    ul.innerHTML = list.map(item => `<li>${item.label}</li>`).join('')
  }

  // 获取省市区的select标签
  const province = document.querySelector('#selProvince')
  const city = document.querySelector('#selCity')
  const area = document.querySelector('#selArea')

  // 获取省市区的数据源
  let provinceList = allData.data
  let cityList = []
  let areaList = []

  // 调用fillSelect给省份的select填充数据
  fillSelect(province, provinceList)
  fillSelect(city, cityList)
  fillSelect(area, areaList)

  /**
   * 封装 处理不同select的title和li的点击事件
   * @param {*} select 需要注册点击事件的下拉框
   */
  function registerSelectEvent(select) {
    /* ==============处理选择框中的title区域点击事件========== */
    const title = select.querySelector('.title')
    // 添加点击事件
    title.addEventListener('click', function () {
      // 如果标题区域是禁用状态，给出提示，直接返回，结束事件处理函数
      if (select.classList.contains('disabled')) return
      //展示之前，获取当前页面有没有已经展开的下拉选择框
      const selectExpand = document.querySelector('.select.expand')
      // 如果有，并且不是我点击的这个，就把它收起来
      if (selectExpand && selectExpand != select) selectExpand.classList.remove('expand')
      // 切换当前点击的option的展示状态
      select.classList.toggle('expand')

      /* ================处理展开的下拉选择框中li的点击事件（事件委托）========== */
      // 获取下拉选择框ul
      const ul = select.querySelector('.options')
      // 添加事件委托
      ul.addEventListener('click', function (e) {
        // 获取当前点击的li
        const li = e.target
        // 如果点击的不是li元素，就不做任何操作
        if (li.tagName != 'LI') return
        // 设置样式：将之前带有active类的li取消选中，给当前点击的li添加选中状态
        const preActiveLi = select.querySelector('li.active')
        if (preActiveLi) preActiveLi.classList.remove('active')
        li.classList.add('active')
        // 更改选择框title区域的文本数据
        select.querySelector('.title span').textContent = li.textContent
        // 点击之后，收起选择框
        select.classList.remove('expand')
      })
    })
  }

  // 注册每一个选择框的点击事件
  registerSelectEvent(province)
  registerSelectEvent(city)
  registerSelectEvent(area)

  // 单独处理点击不同的省份的特殊逻辑：根据选中的省份，重新设置省份对应的城市数据
  function registerProvinceLiEvent() {
    // 获取省份对应的ul容器
    const ul = province.querySelector('ul')
    // 使用事件委托给下面的li添加事件
    ul.addEventListener('click', function (e) {
      // 获取具体点击的li元素
      const li = e.target
      // 如果点击的不是li元素，就不做任何操作
      if (li.tagName != 'LI') return
      // 获取点击省份的名称
      const name = li.textContent
      // 在provinceList中查找省份对应的城市数据
      const obj = provinceList.find(item => item.label == name)
      cityList = obj.children
      // 重新设置当前省份对应的城市和地区数据
      fillSelect(city, cityList)
      fillSelect(area, [])
      // 重新设置城市和地区的title内容
      city.querySelector('.title span').textContent = '请选择城市'
      area.querySelector('.title span').textContent = '请选择地区'
    })
  }
  registerProvinceLiEvent()

  // 单独处理点击不同的城市的特殊逻辑：根据选中的城市，重新设置城市对应的地区数据
  function registerCityLiEvent() {
    // 获取城市对应的ul容器
    const ul = city.querySelector('ul')
    // 使用事件委托给下面的li添加事件
    ul.addEventListener('click', function (e) {
      // 获取具体点击的li元素
      const li = e.target
      // 如果点击的不是li元素，就不做任何操作
      if (li.tagName != 'LI') return
      // 获取点击城市的名称
      const name = li.textContent
      // 在cityList中查找城市对应的地区数据
      const obj = cityList.find(item => item.label == name)
      areaList = obj.children
      // 有的城市下面没有区域，没有children属性，获取出的是undefiend
      // 添加判断，如果areaList是undefined，赋值空数组
      if (areaList == undefined) areaList = []
      // 重新设置当前城市对应的地区数据
      fillSelect(area, areaList)
      // 重新设置地区的title内容
      area.querySelector('.title span').textContent = '请选择地区'
    })
  }
  registerCityLiEvent()
}
fn()
