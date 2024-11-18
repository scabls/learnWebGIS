// 作为同步数据库的入口文件
const sequelize = require('./db') // 导入数据库连接实例

require('./ListItem') // 导入ListItem模型文件

// 同步数据库
sequelize.sync({ alter: true }).then(() => {
  console.log('数据库同步成功')
})
