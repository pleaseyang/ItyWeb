import { login, logout, getInfo, setting } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  accessedRoutes: [],
  unreadNotificationCount: 0,
  systemSetting: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ACCESSEDROUTES: (state, accessedRoutes) => {
    state.accessedRoutes = accessedRoutes
  },
  SET_UNREADNOTIFICATIONCOUNT: (state, unreadNotificationCount) => {
    state.unreadNotificationCount = unreadNotificationCount
  },
  SET_SYSTEM_SETTING: (state, setting) => {
    state.systemSetting = setting
  }
}

const actions = {
  setting({ commit }) {
    return new Promise((resolve, reject) => {
      setting().then(response => {
        commit('SET_SYSTEM_SETTING', response.data)
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ name: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.access_token)
        setToken(data.access_token, data.expires_in)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  loginByCode({ commit }, response) {
    return new Promise((resolve, reject) => {
      const { data } = response
      commit('SET_TOKEN', data.access_token)
      setToken(data.access_token, data.expires_in)
      resolve()
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { roles, name, avatar, email, accessedRoutes, permissions, unreadNotificationCount } = data.item
        // roles must be a non-empty array
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles or permissions must be a non-null array!')
        }
        if (permissions && permissions.length > 0) {
          accessedRoutes.push({
            hidden: true,
            name: 'user-perimissions',
            path: 'user-perimissions',
            children: permissions
          })
        }
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', email)
        commit('SET_ACCESSEDROUTES', accessedRoutes)
        commit('SET_UNREADNOTIFICATIONCOUNT', unreadNotificationCount)
        resolve(data.item)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_ACCESSEDROUTES', [])
        commit('SET_UNREADNOTIFICATIONCOUNT', 0)
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_ACCESSEDROUTES', [])
      commit('SET_UNREADNOTIFICATIONCOUNT', 0)
      removeToken()
      resolve()
    })
  },

  notificationCount({ commit }, count) {
    commit('SET_UNREADNOTIFICATIONCOUNT', count)
  },

  name({ commit }, name) {
    commit('SET_NAME', name)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
