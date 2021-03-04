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

//获取任务详情
export function getTaskDetail(data) {
  return request({
    // url: 'getTasksList',
    // method: 'post',
    // data
    url: 'getTasksDetail',
    method: 'get',
    params: data
  })
}