// 导入模块
const mysql = require('mysql2/promise')

const main = async firstname => {
  // 创建一个数据库连接
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Danger08@me21!',
    database: 'xzd_practice',
  })

  // 查询员工中姓花的员工
  // const [result, fields] = await connection.execute(
  //   "select name 姓名 from employee where name like '花%'"
  // )
  const [result] = await connection.execute(
    "select `name` 员工姓名,case when ismale =1 then '男' else '女' end 员工性别 from employee  where `name` like concat(?,'%')",
    [firstname]
  )
  console.log(result)
}
main('花')
