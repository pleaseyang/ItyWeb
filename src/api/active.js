import request from '@/utils/request'
export function logs(data) {
  return request({
    url: '/active/logs',
    method: 'post',
    data
  })
}
