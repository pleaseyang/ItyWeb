import request from '@/utils/request'
export function logs(data) {
  return request({
    url: '/exception/logs',
    method: 'post',
    data
  })
}

export function amended(data) {
  return request({
    url: '/exception/amended',
    method: 'post',
    data
  })
}

export function files(data) {
  return request({
    url: '/exception/log/files',
    method: 'post',
    data
  })
}

export function file(data) {
  return request({
    url: '/exception/log/file',
    method: 'post',
    data
  })
}
