const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('xzd_school', 'root', 'Danger08@me21!', {
  host: 'localhost',
  dialect: 'mysql',
  // logging: false,//关闭sequelize的日志
})
;(async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})()
module.exports = sequelize
