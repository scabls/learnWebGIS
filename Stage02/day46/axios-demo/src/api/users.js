import request from './request'

// 获取用户列表 GET /users
// const getUsersApi = () => request.get('/users')
const getUsersApi = () =>
  request({
    method: 'GET',
    url: '/users',
  })

// 根据id获取单个用户信息 GET /users/:id
const getUserByIdApi = id =>
  request({
    method: 'GET',
    url: `/users/${id}`,
  })

// 添加用户 POST /users data: { name: 'xxx', age: 18 }
const addUserApi = data =>
  request({
    method: 'POST',
    url: '/users',
    data,
  })

// 修改用户 PUT /user/:id data: { name: 'xxx', age: 18 }
const editUserApi = (id, data) =>
  request({
    method: 'PUT',
    url: `/users/${id}`,
    data,
  })

// 删除用户 DELETE /users/:id
const deleteUserApi = id =>
  request({
    method: 'DELETE',
    url: `/users/${id}`,
  })

// 统一导出
export { getUsersApi, getUserByIdApi, addUserApi, editUserApi, deleteUserApi }
