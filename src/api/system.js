import request from '@/utils/request'
export function logoUpload(data) {
  return request({
    url: '/system/logo',
    method: 'post',
    data
  })
}

export function getConfig(data) {
  return request({
    url: '/system/getConfig',
    method: 'post',
    data
  })
}

export function dingTalk(data) {
  return request({
    url: '/system/dingTalk',
    method: 'post',
    data
  })
}

export function wechat(data) {
  return request({
    url: '/system/wechat',
    method: 'post',
    data
  })
}

export function aliOss(data) {
  return request({
    url: '/system/aliOss',
    method: 'post',
    data
  })
}

export function wechatPay(data) {
  return request({
    url: '/system/wechatPay',
    method: 'post',
    data
  })
}

export function wechatPayCheck(data) {
  return request({
    url: '/system/wechatPayCheck',
    method: 'post',
    data
  })
}

export function wechatPayTest(data) {
  return request({
    url: '/system/wechatPayTest',
    method: 'post',
    data
  })
}

export function randomKey(data) {
  return request({
    url: '/system/randomKey',
    method: 'post',
    data
  })
}
