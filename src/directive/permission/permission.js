import store from '@/store'

function checkPermission(el, binding) {
  const { value } = binding
  const accessedRoutes = store.getters && store.getters.accessedRoutes
  if (value && typeof (value) === 'string') {
    if (value.length > 0) {
      const permissionRoles = value
      const hasPermission = function(accessedRoutes) {
        accessedRoutes.forEach(role => {
          if (role.children && role.children.length > 0) {
            hasPermission(role.children)
          } else {
            if (Object.prototype.hasOwnProperty.call(role, 'name') && role.name === permissionRoles) {
              throw new Error('hasPermission')
            }
          }
        })
      }

      let check = false
      try {
        hasPermission(accessedRoutes)
      } catch (e) {
        if (e.message === 'hasPermission') check = true
      }

      if (!check) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(`need permission! Like v-permission="'user.create'"`)
  }
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
