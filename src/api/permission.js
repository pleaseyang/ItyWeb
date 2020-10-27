import request from '@/utils/request'
export function tree(data) {
  return request({
    url: '/permission/tree',
    method: 'post',
    data
  })
}

export function create(data) {
  return request({
    url: '/permission/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/permission/update',
    method: 'post',
    data
  })
}

export function permission(data) {
  return request({
    url: '/permission',
    method: 'post',
    data
  })
}

export function drop(data) {
  return request({
    url: '/permission/drop',
    method: 'post',
    data
  })
}

export function deleted(data) {
  return request({
    url: '/permission/delete',
    method: 'post',
    data
  })
}
