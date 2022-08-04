import request from '@/utils/request'
export function fileDownload(data) {
  return request({
    url: '/file/download',
    method: 'post',
    responseType: 'blob',
    timeout: 0,
    data
  })
}

export function files(data) {
  return request({
    url: '/files',
    method: 'post',
    data
  })
}

export function fileDelete(data) {
  return request({
    url: '/file/delete',
    method: 'post',
    data
  })
}

export function directoryDelete(data) {
  return request({
    url: '/file/deleteDirectory',
    method: 'post',
    data
  })
}

export function makeDirectory(data) {
  return request({
    url: '/file/makeDirectory',
    method: 'post',
    data
  })
}

export function fileUpload(data) {
  return request({
    url: '/file/upload',
    method: 'post',
    data
  })
}

export function fileUploadUnPermission(data) {
  return request({
    url: '/file/uploadUnPermission',
    method: 'post',
    data
  })
}

export function fileUploadImage(data) {
  return request({
    url: '/file/uploadImage',
    method: 'post',
    timeout: 0,
    data
  })
}

export function fileUploadFile(data) {
  return request({
    url: '/file/uploadFile',
    method: 'post',
    timeout: 0,
    data
  })
}

export function fileRemoveFile(data) {
  return request({
    url: '/file/removeFile',
    method: 'post',
    timeout: 0,
    data
  })
}
