const Admin = require('../models/Admin')

/**
 * 添加记录
 * @param {*} adminObj 记录的内容
 * @returns 记录实例
 */
const addAdmin = async ({ loginId, loginPwd }) => {
  const res = await Admin.create({ loginId, loginPwd })
  return res.toJSON() // 返回json格式的记录
}

/**
 * 更新记录
 * @param {Number} id 要更新的记录的id
 * @param {*} adminObj 要更新的内容
 * @returns 包含更新后的记录id的数组
 */
const updateAdmin = async (id, adminObj) => {
  const res = await Admin.update(adminObj, {
    where: {
      id, // id: id
    },
  })
  return res
}

/**
 * 删除记录
 * @param {Number} id 要删除的记录的id
 * @returns
 */
const deleteAdmin = async id => {
  const res = await Admin.destroy({
    where: {
      id,
    },
  })
  return res
}

/**
 * 根据id查询记录
 * @param {Number} id 要查询记录的id
 * @returns id对应的记录
 */
const getAdminById = async id => {
  const res = await Admin.findByPk(id)
  return res.toJSON()
}

/**
 * 查询所有记录
 * @returns 所有记录
 */
const getAllAdmin = async () => {
  const res = await Admin.findAll()
  return JSON.parse(JSON.stringify(res))
}

/**
 * 根据loginId查找单个记录
 * @param {Number} loginId
 * @returns 记录
 */
const hasLoginId = async loginId => {
  const admin = await Admin.findOne({
    where: {
      loginId,
    },
  })
  // 判断查询返回的记录的原型链上是否有Admin的prototype, 若不在, 则说明查询结果不是Admin实例
  return admin instanceof Admin
}
module.exports = {
  addAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminById,
  getAllAdmin,
  hasLoginId,
}
