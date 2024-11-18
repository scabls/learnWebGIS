# sequelize

## 查询记录

instanceof方法判断记录是否存在

```js
const hasLoginId = async (loginId, type) => {
  const admin = await Admin.findOne({
    where: {
      loginId,
    },
  })
  switch (type) {
    case 'instance':
      return admin
    default:
      // 判断查询返回的记录的原型链上是否有Admin的prototype, 若不在, 则说明查询结果不是Admin实例
      return admin instanceof Admin
  }
}
```

