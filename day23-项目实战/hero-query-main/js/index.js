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

  const dataArr = JSON.parse(dataJson).data.reverse()
  const show = document.querySelector('.show')
  function showHero(heroArr) {
    const fragment = document.createDocumentFragment()
    for (const { ename: imgId, cname } of heroArr) {
      const a = document.createElement('a')
      a.href = `https://pvp.qq.com/web201605/herodetail/${imgId}.shtml`
      a.target = '_blank'
      const img = document.createElement('img')
      img.src = `https://game.gtimg.cn/images/yxzj/img201606/heroimg/${imgId}/${imgId}.jpg`
      const p = document.createElement('p')
      p.innerHTML = `${cname}`
      a.append(img, p)
      fragment.appendChild(a)
    }
    show.appendChild(fragment)
  }
  showHero(dataArr)

  const radioBtns = document.querySelectorAll('.radio')
  radioBtns.forEach(radio => {
    radio.addEventListener('click', function () {
      radioBtns.forEach(radio => radio.classList.remove('checked'))
      this.classList.add('checked')
      show.innerHTML = ''
      if (isNaN(this.dataset.value)) {
        showHero(dataArr)
      } else {
        const selected = dataArr.filter(
          hero =>
            hero[`${this.dataset.type}_type`] == this.dataset.value ||
            hero[`${this.dataset.type}_type2`] == this.dataset.value
        )
        showHero(selected)
      }
    })
  })

  const input = document.querySelector('.search input')
  function partCopy(heroArr) {
    const copy = []
    for (const { ename, cname } of heroArr) {
      copy.push({
        ename: ename,
        cname: cname,
      })
    }
    return copy
  }
  input.addEventListener('input', function () {
    radioBtns.forEach(radio => {
      radio.classList.remove('checked')
      if (isNaN(radio.dataset.value)) radio.classList.add('checked')
    })
    show.innerHTML = ''
    if (this.value != '') {
      const selected = partCopy(dataArr).reduce((heroes, hero) => {
        const strIndex = hero.cname.indexOf(this.value)
        const strLen = this.value.length
        if (strIndex != -1) {
          hero.cname = `${hero.cname.slice(0, strIndex)}<span style="color:red">${hero.cname.slice(
            strIndex,
            strIndex + strLen
          )}</span>${hero.cname.slice(strIndex + strLen)}`
          heroes.push(hero)
        }
        return heroes
      }, [])
      showHero(selected)
    } else {
      showHero(dataArr)
    }
  })
})('GET', 'http://project.x-zd.net:3001/apis/herolist')
