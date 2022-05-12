import request from '@/utils/request'

export function dictTypes(data) {
  return request({
    url: '/dictTypes',
    method: 'post',
    data
  })
}

export function dictType(data) {
  return request({
    url: '/dictType',
    method: 'post',
    data
  })
}

export function dictTypeSelect(data) {
  return request({
    url: '/dictType/select',
    method: 'post',
    data
  })
}

export function dictTypeCreate(data) {
  return request({
    url: '/dictType/create',
    method: 'post',
    data
  })
}

export function dictTypeUpdate(data) {
  return request({
    url: '/dictType/update',
    method: 'post',
    data
  })
}

export function dictTypeDelete(data) {
  return request({
    url: '/dictType/delete',
    method: 'post',
    data
  })
}

export function dictDataList(data) {
  return request({
    url: '/dictData/list',
    method: 'post',
    data
  })
}

export function dictData(data) {
  return request({
    url: '/dictData',
    method: 'post',
    data
  })
}

export function dictDataCreate(data) {
  return request({
    url: '/dictData/create',
    method: 'post',
    data
  })
}

export function dictDataUpdate(data) {
  return request({
    url: '/dictData/update',
    method: 'post',
    data
  })
}

export function dictDataDelete(data) {
  return request({
    url: '/dictData/delete',
    method: 'post',
    data
  })
}

export function dictDataListClass(data) {
  return request({
    url: '/dictData/listClass',
    method: 'post',
    data
  })
}
