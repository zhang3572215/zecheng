import request from '@/utils/request'

//获取用户提交任务的数据
export function getUserSubmitData (data) {
    return request({
      url: '/getTasksSubListDetail',
      method: 'get',
      params: data
    })
}