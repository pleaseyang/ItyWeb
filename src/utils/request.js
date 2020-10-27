import axios from 'axios'
import { MessageBox, Message, Notification } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    switch (store.getters.language) {
      case 'zh':
        config.headers['Lang'] = 'zh-CN'
        break
      default :
        config.headers['Lang'] = 'en'
    }
    if (store.getters.token) {
      // let each request carry token
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    return response.data
  },
  error => {
    const { data } = error.response
    if (data.code === 401) {
      MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        confirmButtonText: 'Re-Login',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    } else if (data.code === 500) {
      Notification.error({
        title: data.message,
        dangerouslyUseHTMLString: true,
        message: `<p>ErrorNumber:${data.data.errorId}</p> We'll deal with it as soon as possible`,
        duration: 0
      })
    } else {
      Message({
        message: data.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
