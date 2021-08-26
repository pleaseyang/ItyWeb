import request from '@/utils/request'
export function admins(data) {
  return request({
    url: '/admins',
    method: 'post',
    data
  })
}

export function admin(data) {
  return request({
    url: '/admin',
    method: 'post',
    data
  })
}

export function deleted(data) {
  return request({
    url: '/admin/delete',
    method: 'post',
    data
  })
}

export function create(data) {
  return request({
    url: '/admin/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/admin/update',
    method: 'post',
    data
  })
}

export function updateSelf(data) {
  return request({
    url: '/admin/updateSelf',
    method: 'post',
    data
  })
}

export function syncPermissions(data) {
  return request({
    url: '/admin/syncPermissions',
    method: 'post',
    data
  })
}

export function nav(data) {
  return request({
    url: '/nav',
    method: 'post',
    data
  })
}

export function navSetNoCache(data) {
  return request({
    url: '/nav/set/noCache',
    method: 'post',
    data
  })
}

export function navSetAffix(data) {
  return request({
    url: '/nav/set/affix',
    method: 'post',
    data
  })
}
