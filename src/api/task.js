import request from '@/utils/request'

export function getTaskList(data) {
  return request({
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
    url: 'getTasksDetail',
    method: 'get',
    params: data
  })
}

//修改任务设置
export function postDataToEditTask(data) {
  return request({
    url: 'updateTasksIsData',
    method: 'post',
    data: data
  })
}

//修改任务设置
export function postNewTask(data) {
  return request({
    url: 'addsMandate',
    method: 'post',
    data: data
  })
}