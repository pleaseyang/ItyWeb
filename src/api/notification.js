import request from '@/utils/request'
export function notifications(data) {
  return request({
    url: '/notifications',
    method: 'post',
    data
  })
}

export function notification(data) {
  return request({
    url: '/notification',
    method: 'post',
    data
  })
}

export function allRead(data) {
  return request({
    url: '/notification/allRead',
    method: 'post',
    data
  })
}

export function unReadCount(data) {
  return request({
    url: '/notification/unReadCount',
    method: 'post',
    data
  })
}

export function send(data) {
  return request({
    url: '/notification/send',
    method: 'post',
    data
  })
}

export function read(data) {
  return request({
    url: '/notification/read',
    method: 'post',
    data
  })
}

export function admins(data) {
  return request({
    url: '/notification/admins',
    method: 'post',
    data
  })
}
