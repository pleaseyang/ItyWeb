import request from '@/utils/request'

export function genTableList(data) {
  return request({
    url: '/genTables',
    method: 'post',
    data
  })
}

export function genTableInfo(data) {
  return request({
    url: '/genTable',
    method: 'post',
    data
  })
}

export function genTableSelect(data) {
  return request({
    url: '/genTable/select',
    method: 'post',
    data
  })
}

export function importTable(data) {
  return request({
    url: '/genTable/importTable',
    method: 'post',
    data
  })
}

export function columnConfig(data) {
  return request({
    url: '/genTable/columnConfig',
    method: 'post',
    data
  })
}

export function genTableCreate(data) {
  return request({
    url: '/genTable/create',
    method: 'post',
    data
  })
}

export function genTableUpdate(data) {
  return request({
    url: '/genTable/update',
    method: 'post',
    data
  })
}

export function genTableDelete(data) {
  return request({
    url: '/genTable/delete',
    method: 'post',
    data
  })
}

export function gen(data) {
  return request({
    url: '/genTable/gen',
    method: 'post',
    data
  })
}

export function download(data) {
  return request({
    url: '/genTable/download',
    method: 'post',
    responseType: 'blob',
    timeout: 0,
    data
  })
}
