const { sequelize } = require('./db')
require('./Admin')
require('./Class')
require('./Student')
require('./Book')
require('./relate')
sequelize.sync({ alter: true }).then(() => {
  console.log('同步成功')
})
