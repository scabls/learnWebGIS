import request from './request'

const adminLogin = ({ loginName, loginPwd } = {}) =>
  request.post('/admin/login', { loginName, loginPwd })

const adminRegister = ({ loginName, loginPwd } = {}) =>
  request({
    method: 'POST',
    url: '/admin/register',
    data: { loginName, loginPwd },
  })

const getAdminProfile = () => request.get('/admin/profile')

export { adminLogin, adminRegister, getAdminProfile }
