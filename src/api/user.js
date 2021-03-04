import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'dologin',
    method: 'post',
    data: data,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    // url: '/vue-element-admin/user/login',
    // method: 'post',
    // data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function testToken(token) {
  return request({
    url: 'dotoken',
    method: 'post',
    data: { token:token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
