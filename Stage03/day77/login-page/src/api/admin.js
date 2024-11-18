import request from './request'

const adminLogin = ({ loginId, loginPwd } = {}) =>
  request.post('/admin/login', { loginId, loginPwd })

const adminRegister = ({ loginId, loginPwd } = {}) =>
  request({
    method: 'POST',
    url: '/admin/register',
    data: { loginId, loginPwd },
  })

const getAdminProfile = () => request.get('/admin/profile')

export { adminLogin, adminRegister, getAdminProfile }
