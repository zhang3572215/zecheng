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
//获取充值列表
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

//上传充值信息
export function postRechargeInfoData (data) {
  return request({
    // url: 'getTasksList',
    // method: 'post',
    // data
    url: 'paymentUpload',
    method: 'post',
    data: data
  })
}

//提现通过审核
export function postPassCashData (data) {
  return request({
    url: 'cashAudit',
    method: 'post',
    data: data
  })
}

//提现通过审核
export function postNoPassCashData (data) {
  return request({
    url: 'refuseCash',
    method: 'post',
    data: data
  })
}
