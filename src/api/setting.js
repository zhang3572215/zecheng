import request from '@/utils/request'

// 上传banner
export function postBannerPic (data) {
  return request({
    url: '/XXX',
    method: 'post',
    data
  })
}

// 上传图片(缩略图)
export function postThumb (data) {
  return request({
    url: '/layeditUpload',
    method: 'post',
    data
  })
}

// 获取活动列表
export function getActivitiesList (data) {
  return request({
    url: '/getActivitiesList',
    method: 'get',
    params: data
  })
}
