const express = require('express')
// 引入service层
const {
  getAllItems,
  getItemById,
  addItem,
  updateItemById,
  deleteItemById,
  hasAdded,
} = require('../services/ListItemService')

const router = express.Router() // 路由器

// 路由
router.get('/', async (req, res) => {
  const items = await getAllItems()
  res.json({ msg: '所有记录', items, code: 1 })
})
router.get('/item/:id(\\d+)', async (req, res) => {
  const id = req.params.id //使用params获取路径参数
  const item = await getItemById(id)
  if (item) {
    res.json({ msg: '记录', item, code: 1 })
  } else {
    res.json({ msg: '记录不存在', code: 0 })
  }
})
router.post('/add', async (req, res) => {
  const { itemContent, itemHasDone } = req.body //使用body获取请求体
  const added = await hasAdded(itemContent)
  if (added) {
    res.json({ msg: '记录已存在', code: 0 })
  } else {
    const item = await addItem({ itemContent, itemHasDone })
    res.json({ msg: '记录添加成功', item, code: 1 })
  }
})
router.put('/edit/:id(\\d+)', async (req, res) => {
  const id = req.params.id
  // 先判断记录是否存在
  const item = await getItemById(id)
  if (item) {
    const { itemContent, itemHasDone } = req.body
    const updatedItem = await updateItemById(id, { itemContent, itemHasDone })
    res.json({ msg: '记录更新成功', updatedItem, code: 1 })
  } else {
    res.json({ msg: '记录不存在', code: 0 })
  }
})
router.delete('/delete/:id(\\d+)', async (req, res) => {
  const id = req.params.id
  // 先判断记录是否存在
  const item = await getItemById(id)
  if (item) {
    const deleted = await deleteItemById(id)
    res.json({ msg: '记录删除成功', deleted, code: 1 })
  } else {
    res.json({ msg: '记录不存在', code: 0 })
  }
})

module.exports = router // 导出路由器
