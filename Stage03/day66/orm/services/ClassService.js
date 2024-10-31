const { Class } = require('../models/Class')

async function addClass(classObj) {
  const res = await Class.create(classObj)
  return res.toJSON()
}
async function updateClass(id, classObj) {
  const res = await Class.update(classObj, {
    where: {
      id,
    },
  })
  // 返回的是一个数组
  return res
}
async function deleteClass(id) {
  const res = Class.destroy({
    where: {
      id,
    },
  })
  return res
}
module.exports = { addClass, updateClass, deleteClass }
