import i18n from '@/lang'
import store from '@/store'

export default async function getPageTitle(key) {
  const { title = '' } = store.state.user.systemSetting
  if (title === '') {
    const { title2 } = await store.dispatch('user/setting')
    return returnTitle(key, title2)
  } else {
    return returnTitle(key, title)
  }
}

function returnTitle(key, title) {
  if (key !== undefined && title !== undefined) {
    const hasKey = i18n.te(`route.${key}`)
    if (hasKey) {
      const pageName = i18n.t(`route.${key}`)
      return `${pageName} - ${title}`
    }
    return `${title}`
  }
  return 'Loading...'
}
