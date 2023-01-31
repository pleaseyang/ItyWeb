import Cookies from 'js-cookie'

const TokenKey = 'Ity-Authorization'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, expires_in) {
  // token 过期五分钟不操作 默认退出登录
  const leeway = 60 * 5
  const expires = new Date(new Date() * 1 + (expires_in + leeway) * 1000)
  return Cookies.set(TokenKey, token, { expires: expires })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
