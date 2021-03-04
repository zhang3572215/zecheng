import request from '@/utils/request'

export function getCashList (data) {
  return request({
    // url: 'getTasksList',
    // method: 'post',
    // data
    url: 'getMemberCash',
    method: 'get',
    params: data
  })
}
//
export function getRechargeListBy (data) {
  return request({
    // url: 'getTasksList',
    // method: 'post',
    // data
    url: 'getMemberRecharge',
    method: 'get',
    params: data
  })
}
