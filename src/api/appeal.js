import request from '@/utils/request'

//获取申诉列表
export function getHelpList(data) {
    return request({
      url: '/getHelpList',
      method: 'get',
      params: data
    })
}

//获取申诉列表
export function updateHelpList(data) {
    return request({
      url: '/updateHelp',
      method: 'post',
      data: data
    })
}