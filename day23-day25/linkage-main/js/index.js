;(async (method, url) => {
  const dataJson = await ((method, url) =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState == 4 && this.status == 200) {
          resolve(this.responseText)
        }
      })
      xhr.send()
    }))(method, url)

  const dataArr = JSON.parse(dataJson).data
  const levels = document.querySelectorAll('.level')
  const selectors = document.querySelectorAll('.selector')
  const lists = document.querySelectorAll('.list')

  function addToponym(placeArr, position) {
    position.lastElementChild.innerHTML = ''
    const fragment = document.createDocumentFragment()
    for (const { label } of placeArr) {
      const li = document.createElement('li')
      li.textContent = label
      fragment.appendChild(li)
    }
    position.lastElementChild.appendChild(fragment)
  }

  addToponym(dataArr, levels[0])

  levels.forEach(element => {
    element.firstElementChild.addEventListener('click', function () {
      if (!this.parentElement.classList.contains('disabled')) {
        levels.forEach(element => {
          if (element != this.parentElement) element.classList.remove('clicked')
        })
        this.parentElement.classList.toggle('clicked')
      }
    })
  })

  function findChildren(placeArr, name) {
    const children = placeArr.find(place => place.label == name).children
    if (children == undefined) return []
    else return children
  }

  lists.forEach((ul, index) => {
    ul.addEventListener('click', function (e) {
      if (e.target.tagName === 'LI') {
        ;[...this.children].forEach(li => li.classList.remove('selected'))
        e.target.classList.add('selected')
        selectors[index].textContent = e.target.textContent
        if (index != 2) {
          const newArr = []
          if (index == 0) {
            selectors[index + 1].textContent = '请选择城市'
            selectors[index + 2].textContent = '请选择地区'
            levels[index + 2].classList.add('disabled')
            findChildren(dataArr, e.target.textContent).forEach(city => newArr.push(city))
          }
          if (index == 1) {
            selectors[index + 1].textContent = '请选择地区'
            const cities = findChildren(dataArr, selectors[index - 1].textContent)
            const areas = findChildren(cities, e.target.textContent)
            if (areas.length != 0) areas.forEach(area => newArr.push(area))
            if (areas.length == 0) levels[index + 1].classList.add('disabled')
          }
          if (newArr.length != 0) {
            addToponym(newArr, levels[index + 1])
            levels[index + 1].classList.remove('disabled')
          }
        }
        levels[index].classList.remove('clicked')
      }
    })
  })
})('GET', 'http://project.x-zd.net:3001/apis/citylist')
