function now() {
  const time = new Date()
  const weekDay = ['日', '一', '二', '三', '四', '五', '六']
  return `今天是${time.getFullYear()}年${time.getMonth() + 1}月${time.getDate()}号 星期${
    weekDay[time.getDay()]
  }`
}
module.exports.now = now
