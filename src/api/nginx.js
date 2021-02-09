import request from '@/utils/request'

export function logs(data) {
  return request({
    url: '/nginx/logs',
    method: 'post',
    timeout: 10 * 1000,
    data
  })
}
