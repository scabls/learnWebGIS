const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('express_practice', 'root', 'Danger08@me21!', {
  host: 'localhost', // 默认localhost
  dialect: 'mysql', // sql方言，默认mysql
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
