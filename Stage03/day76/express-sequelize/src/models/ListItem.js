const sequelize = require('./db') //引入sequelize实例
const { DataTypes } = require('sequelize') //引入sequelize的 DataTypes 类

// 定义ListItem模型, 即sql里的表的结构
const ListItem = sequelize.define(
  'ListItem',
  {
    // 表字段定义(每列的类型和约束)
    itemContent: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    itemHasDone: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    // 表选项定义
    paranoid: true, // 软删除
  }
)

module.exports = ListItem //导出ListItem模型
