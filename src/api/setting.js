import request from '@/utils/request'

// 上传banner
export function postBannerPic (data) {
  return request({
    url: '/XXX',
    method: 'post',
    data
  })
}
