const { DataTypes } = require('sequelize')
const { sequelize } = require('./db')
const Admin = sequelize.define(
  'admin',
  {
    // 理解为表中的列
    // 会自动添加一个叫做Id的主键
    loginId: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    loginPwd: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    // 设置时间戳
    // 设置不自动添加创建时间和修改时间(不推荐)
    // createdAt: false, // 默认是true
    // updatedAt: false, // 默认是true

    // 阻止真正的删除并记录删除时间
    paranoid: true, // 默认是false
  }
)
module.exports = { Admin }
