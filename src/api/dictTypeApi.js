import request from '@/utils/request'

export function dictTypeSelect(data) {
  return request({
    url: '/dictType/select',
    method: 'post',
    data
  })
}
