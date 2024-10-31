const { Class } = require('../models/Class')

const addClass = async classObj => {
  const res = await Class.create(classObj)
  return res.toJSON()
}

const updateClass = async (id, classObj) => {
  const res = await Class.update(classObj, {
    where: {
      id,
    },
  })
  // 返回的是一个数组
  return res
}

const deleteClass = async id => {
  const res = await Class.destroy({
    where: {
      id,
    },
  })
  return res
}
module.exports = { addClass, updateClass, deleteClass }
