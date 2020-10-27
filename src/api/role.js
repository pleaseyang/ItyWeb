import request from '@/utils/request'
export function roles(data) {
  return request({
    url: '/roles',
    method: 'post',
    data
  })
}

export function role(data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

export function all(data) {
  return request({
    url: '/role/all',
    method: 'post',
    data
  })
}

export function syncPermissions(data) {
  return request({
    url: '/role/syncPermissions',
    method: 'post',
    data
  })
}

export function syncRoles(data) {
  return request({
    url: '/role/syncRoles',
    method: 'post',
    data
  })
}

export function create(data) {
  return request({
    url: '/role/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/role/update',
    method: 'post',
    data
  })
}

export function deleted(data) {
  return request({
    url: '/role/delete',
    method: 'post',
    data
  })
}
