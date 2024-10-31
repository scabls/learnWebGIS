const { Admin } = require('../models/Admin')
// ;(async () => {
//   // 定义对于admin的增删改查操作
//   // 增加记录
//   const admin1 = await Admin.create({
//     loginId: 'hahaha',
//     loginPwd: '123456',
//   })
//   console.log(admin1)
// })()

// 封装一个添加管理员的方法
/**
 * 添加记录
 * @param {*} adminObj 记录的内容
 * @returns 记录实例
 */
async function addAdmin(adminObj) {
  const res = await Admin.create(adminObj)
  return res.toJSON()
}
// addAdmin({
//   loginId: 'pupupu',
//   loginPwd: '3424234',
// })
// 封装一个修改管理员的方法
/**
 * 更新记录
 * @param {*} id 要更新的记录的id
 * @param {*} adminObj 要更新的内容
 * @returns 包含更新后的记录id的数组
 */
async function updateAdmin(id, adminObj) {
  const res = await Admin.update(adminObj, {
    where: {
      id, // id: id
    },
  })
  return res
}
// updateAdmin(1, {
//   loginPwd: '222222',
// })
// 封装一个删除管理员的方法
async function deleteAdmin(id) {
  const res = await Admin.destroy({
    where: {
      id,
    },
  })
  return res
}
// deleteAdmin(8)
module.exports = { addAdmin, updateAdmin, deleteAdmin }
