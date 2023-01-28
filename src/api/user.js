import request from '@/utils/request'

export function setting(data) {
  return request({
    url: '/setting',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/me',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function refresh() {
  return request({
    url: '/refresh',
    method: 'post'
  })
}

export function users(data) {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}

export function user(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export function deleted(data) {
  return request({
    url: '/user/delete',
    method: 'post',
    data
  })
}

export function create(data) {
  return request({
    url: '/user/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

export function dingTalkUrl(data) {
  return request({
    url: '/login/dingTalkUrl',
    method: 'post',
    data
  })
}

export function dingTalkCheckState(data) {
  return request({
    url: '/login/dingTalkCheckState',
    method: 'post',
    data
  })
}

export function dingTalk(data) {
  return request({
    url: '/login/dingTalk',
    method: 'post',
    data
  })
}

export function dingTalkCorpId(data) {
  return request({
    url: '/login/dingTalkCorpId',
    method: 'post',
    data
  })
}

export function dingTalkDD(data) {
  return request({
    url: '/login/dingTalkDD',
    method: 'post',
    data
  })
}

export function dingTalkInfo(data) {
  return request({
    url: '/bind/dingTalkInfo',
    method: 'post',
    data
  })
}

export function bindDingTalkUrl(data) {
  return request({
    url: '/bind/dingTalkUrl',
    method: 'post',
    data
  })
}

export function bindDingTalk(data) {
  return request({
    url: '/bind/dingTalk',
    method: 'post',
    data
  })
}

export function unbindDingTalk(data) {
  return request({
    url: '/unbind/dingTalk',
    method: 'post',
    data
  })
}

export function wechatUrl(data) {
  return request({
    url: '/login/wechatUrl',
    method: 'post',
    data
  })
}

export function wechatUrlOffiaccount(data) {
  return request({
    url: '/login/wechatUrlOffiaccount',
    method: 'post',
    data
  })
}

export function wechatCheckState(data) {
  return request({
    url: '/login/wechatCheckState',
    method: 'post',
    data
  })
}

export function wechat(data) {
  return request({
    url: '/login/wechat',
    method: 'post',
    data
  })
}

export function wechatInfo(data) {
  return request({
    url: '/bind/wechatInfo',
    method: 'post',
    data
  })
}

export function bindWechatUrl(data) {
  return request({
    url: '/bind/wechatUrl',
    method: 'post',
    data
  })
}

export function bindWechat(data) {
  return request({
    url: '/bind/wechat',
    method: 'post',
    data
  })
}

export function unbindWechat(data) {
  return request({
    url: '/unbind/wechat',
    method: 'post',
    data
  })
}
