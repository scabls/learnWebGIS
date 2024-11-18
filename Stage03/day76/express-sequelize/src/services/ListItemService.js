const { Op } = require('sequelize') //导入Sequelize的Op操作符
const ListItem = require('../models/ListItem') //导入ListItem模型

/**
 * 添加记录
 * @param {Object} param0 期望一个对象参数，包含itemContent和itemHasDone两个属性
 * @returns 添加的记录
 */
const addItem = async ({ itemContent, itemHasDone } = {}) => {
  const item = await ListItem.create({ itemContent, itemHasDone })
  return item.toJSON() //返回JSON格式数据
}
/**
 * 根据id更新记录
 * @param {*} id 查询的id
 * @param {*} param1 期望一个对象参数，至多包含itemContent和itemHasDone两个属性
 * @returns 更新的记录
 */
const updateItemById = async (id, { itemContent, itemHasDone } = {}) => {
  const res = await ListItem.update(
    { itemContent, itemHasDone },
    {
      where: {
        id,
      },
    }
  )
  return res
}
/**
 * 根据id删除记录
 * @param {Number} id 要删除的记录的id
 * @returns 删除的记录
 */
const deleteItemById = async id => {
  const res = await ListItem.destroy({
    where: {
      id,
    },
  })
  return res
}
/**
 * 根据id查找记录
 * @param {*} id
 * @returns
 */
const getItemById = async id => {
  const item = await ListItem.findByPk(id)
  if (item) return item.toJSON() //如果有记录, 则返回JSON格式数据
  else return item // 否则返回null
}
/**
 *
 * @param {String} keyword 查询关键字
 * @param {Number} limit 查询的记录条数
 * @param {Number} page 从第几页开始查询
 * @returns 查询结果, 包括总记录数和查询到的记录
 */
const searchByContentLikely = async (keyword, limit = 10, page = 1) => {
  const where = {}
  if (keyword) {
    where.itemContent = {
      [Op.like]: `%${keyword}%`, //模糊查询:包含关键字
    }
  }
  const { count, rows } = await ListItem.findAndCountAll({
    where,
    limit,
    offset: (page - 1) * limit,
  })
  return { count, items: JSON.parse(JSON.stringify(rows)) }
}
/**
 * 判断记录是否已存在
 * @param {String} itemContent 记录内容
 * @returns
 */
const hasAdded = async itemContent => {
  // 查询符合条件的第一条记录
  const item = await ListItem.findOne({
    where: {
      itemContent,
    },
  })
  // 根据返回结果的原型链上是否有ListItem的原型来判断, 若有, 则说明是记录且已存在, 否则不存在
  return item instanceof ListItem
}
/**
 *
 * @returns 所有记录
 */
const getAllItems = async () => {
  const items = await ListItem.findAll()
  return JSON.parse(JSON.stringify(items))
}

module.exports = {
  addItem,
  updateItemById,
  deleteItemById,
  getItemById,
  searchByContentLikely,
  hasAdded,
  getAllItems,
}
