import request from '@/utils/request'

//获取接单情况列表
export function getAcceptList(data) {
    return request({
      url: '/getTasksSubList',
      method: 'get',
      params: data
    })
}