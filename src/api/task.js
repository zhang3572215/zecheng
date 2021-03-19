import request from '@/utils/request'

export function getTaskList(data) {
  return request({
    url: 'getTasksList',
    method: 'get',
    params: data
  })
}

//任务审核通过
export function postTaskVerifyData(data) {
  return request({
    url: 'auditTasks',
    method: 'post',
    data: data
  })
}

//任务审核失败（带原因）
export function postTaskFailedData(data) {
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

<<<<<<< HEAD
//新增任务
=======
//修改任务设置
>>>>>>> a73df13dc540b13ba1c521543b9d30b89148eb93
export function postNewTask(data) {
  return request({
    url: 'addsMandate',
    method: 'post',
    data: data
  })
}