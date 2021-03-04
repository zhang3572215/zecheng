import request from '@/utils/request'

export function getTaskList(data) {
  return request({
    // url: 'getTasksList',
    // method: 'post',
    // data
    url: 'getTasksList',
    method: 'get',
    params: data
  })
}
export function postTaskVerifyData(data) {
  return request({
    url: 'auditTasks',
    method: 'post',
    data: data
  })
}
