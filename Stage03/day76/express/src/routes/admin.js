const express = require('express')
const router = express.Router()
const {
  addAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminById,
  getAllAdmin,
  hasLoginId,
} = require('../services/AdminService')
// router可以理解为对管理员操作相关的路由操作
router.get('/get/:id(\\d+)', async (req, res) => {
  const id = req.params.id
  res.send(await getAdminById(id))
})
router.get('/get/all', async (req, res) => {
  res.send(await getAllAdmin())
})
router.post('/post', async (req, res) => {
  const { loginId, loginPwd } = req.body
  // 避免重复添加, 根据loginId查询数据库
  const hasOrNot = await hasLoginId(loginId)
  if (hasOrNot) res.status(400).send('管理员已存在')
  else res.status(200).send(await addAdmin({ loginId, loginPwd }))
})
router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id
  await deleteAdmin(id)
  res.status(200).send('删除成功')
})
module.exports = router
