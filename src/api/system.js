import request from '@/utils/request'
export function logoUpload(data) {
  return request({
    url: '/system/logo',
    method: 'post',
    data
  })
}
