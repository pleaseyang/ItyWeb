import request from '@/utils/request'

export function testDbList(data) {
  return request({
    url: '/testDbs',
    method: 'post',
    data
  })
}

export function testDbInfo(data) {
  return request({
    url: '/testDb',
    method: 'post',
    data
  })
}

export function testDbSelect(data) {
  return request({
    url: '/testDb/select',
    method: 'post',
    data
  })
}

export function testDbCreate(data) {
  return request({
    url: '/testDb/create',
    method: 'post',
    data
  })
}

export function testDbUpdate(data) {
  return request({
    url: '/testDb/update',
    method: 'post',
    data
  })
}

export function testDbDelete(data) {
  return request({
    url: '/testDb/delete',
    method: 'post',
    data
  })
}
