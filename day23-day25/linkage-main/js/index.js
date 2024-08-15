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
  const province = document.querySelector('.province')
  const city = document.querySelector('.city')
  const area = document.querySelector('.area')
  const btns = [province, city, area]
  const lists = document.querySelectorAll('.options')

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

  addToponym(dataArr, province)

  btns.forEach(element => {
    element.firstElementChild.addEventListener('click', function () {
      if (!this.parentElement.classList.contains('disabled')) {
        btns.forEach(element => {
          if (element != this.parentElement) element.classList.remove('clicked')
        })
        this.parentElement.classList.toggle('clicked')
      }
    })
  })

  function findChildren(placeArr, name) {
    return placeArr.find(place => place.label == name).children
  }

  lists.forEach(ul => {
    ul.addEventListener('click', function (e) {
      if (e.target.tagName === 'LI') {
        ;[...this.children].forEach(li => li.classList.remove('selected'))
        e.target.classList.add('selected')
        this.parentElement.firstElementChild.firstElementChild.textContent = e.target.textContent
        if (!this.parentElement.classList.contains('area')) {
          const newArr = []
          if (this.parentElement.classList.contains('province')) {
            this.parentElement.nextElementSibling.firstElementChild.firstElementChild.textContent =
              '请选择城市'
            this.parentElement.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild.textContent =
              '请选择地区'
            this.parentElement.nextElementSibling.nextElementSibling.classList.add('disabled')
            findChildren(dataArr, e.target.textContent).forEach(city => newArr.push(city))
          }
          if (this.parentElement.classList.contains('city')) {
            this.parentElement.nextElementSibling.firstElementChild.firstElementChild.textContent =
              '请选择地区'
            const cities = findChildren(
              dataArr,
              this.parentElement.previousElementSibling.firstElementChild.firstElementChild
                .textContent
            )
            const areas = findChildren(cities, e.target.textContent)
            if (areas != undefined) areas.forEach(area => newArr.push(area))
            if (areas == undefined) {
              this.parentElement.nextElementSibling.classList.add('disabled')
            }
          }
          if (newArr.length != 0) {
            addToponym(newArr, this.parentElement.nextElementSibling)
            this.parentElement.nextElementSibling.classList.remove('disabled')
          }
        }
        this.parentElement.classList.remove('clicked')
      }
    })
  })
})('GET', 'http://project.x-zd.net:3001/apis/citylist')
