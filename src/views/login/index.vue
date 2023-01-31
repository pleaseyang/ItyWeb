<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <div class="logo">
          <el-avatar :src="logo" size="large" class="logo-image" />
          <label class="title">{{ title }}</label>
        </div>
        <lang-select class="set-language" />
      </div>

      <el-form-item prop="username" :error="error.name ? error.name[0] : ''">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          :placeholder="$t('login.username') + '/' + $t('admin.email')"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" :content="$t('common.capsLock')" placement="right" manual>
        <el-form-item prop="password" :error="error.password ? error.password[0] : ''">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            :placeholder="$t('login.password')"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">
        {{ $t('login.logIn') }}
      </el-button>
      <div v-if="dingTalkOpen || wechatOpen" class="login-oauth">
        <el-divider content-position="center">{{ $t('login.thirdparty') }}</el-divider>
        <el-button v-if="dingTalkOpen" type="primary" circle @click="dingTalkLogin">
          <svg-icon icon-class="dingtalk" style="font-size: 18px" />
        </el-button>
        <el-button v-if="wechatOpen" type="success" circle @click="wechatLogin">
          <svg-icon icon-class="wechat" style="font-size: 18px" />
        </el-button>
      </div>
    </el-form>
    <el-dialog
      :visible.sync="visible"
    >
      <div id="login_container" />
    </el-dialog>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi'
import LangSelect from '@/components/LangSelect'
import {
  dingTalk,
  dingTalkCheckState,
  dingTalkCorpId,
  dingTalkDD,
  dingTalkUrl, wechat, wechatCheckState,
  wechatUrl,
  wechatUrlOffiaccount
} from '@/api/user'
import { getQueryObject, loadJS } from '@/utils'

export default {
  name: 'Login',
  components: { LangSelect },
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      error: {},
      title: 'Loading...',
      logo: '',
      visible: false,
      dingTalkOpen: false,
      wechatOpen: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
          this.wechatLoginCallBack()
        }
      },
      immediate: true
    }
  },
  created() {
    this.dingTalkLoginCallBack()
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
    this.getSetting()
  },
  destroyed() {

  },
  methods: {
    getSetting() {
      this.loading = true
      document.title = this.title
      this.$store.dispatch('user/setting').then(res => {
        this.title = res.title
        this.logo = res.logo
        this.dingTalkOpen = res.ding_talk_open
        this.wechatOpen = res.wechat_open
        document.title = this.title
      }).finally(() => {
        this.loading = false
      })
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.loading = true
      this.error = {}
      this.$store.dispatch('user/login', this.loginForm)
        .then(() => {
          this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
          this.loading = false
        })
        .catch((reason) => {
          this.loading = false
          if (reason.response !== undefined) {
            const { data } = reason.response
            if (data.code === 422) {
              this.error = data.data
            }
          }
        })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    wechatLogin() {
      const ua = navigator.userAgent.toLowerCase()
      const is = /micromessenger/.test(ua)
      if (!is) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        wechatUrl().then(response => {
          loadJS('//res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js', 'WxLogin').then(() => {
            this.visible = true
            this.$nextTick(() => {
              const { data } = response
              // eslint-disable-next-line no-undef
              new WxLogin({
                self_redirect: false,
                id: 'login_container',
                appid: data.appid,
                scope: 'snsapi_login',
                redirect_uri: data.redirect_uri,
                state: data.state,
                style: '',
                href: ''
              })
            })
          })
        }).finally(() => {
          loading.close()
        })
      } else {
        wechatUrlOffiaccount().then(response => {
          const { url } = response.data
          window.location.href = url
        })
      }
    },
    wechatLoginCallBack() {
      const query = getQueryObject(window.location.href)
      this.visible = false
      if (Object.prototype.hasOwnProperty.call(query, 'code')) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        wechatCheckState({
          state: query.state.replace('#/login', '')
        }).then(response => {
          const { check } = response.data
          if (check) {
            let type = ''
            const ua = navigator.userAgent.toLowerCase()
            const is = /micromessenger/.test(ua)
            if (!is) {
              type = 'oplatform'
            } else {
              type = 'offiaccount'
            }
            wechat({
              state: query.state.replace('#/login', ''),
              code: query.code,
              type: type
            }).then(response => {
              this.$store.dispatch('user/loginByCode', response)
                .then(() => {
                  this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                  this.loading = false
                })
            }).finally(() => {
              loading.close()
            })
          } else {
            loading.close()
          }
        })
      }
    },
    dingTalkLogin() {
      if (dd.env.platform === 'notInDingTalk') {
        dingTalkUrl().then(response => {
          const { url } = response.data
          window.location.href = url
        })
      } else {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        dingTalkCorpId().then(response => {
          const { corpId } = response.data
          dd.runtime.permission.requestAuthCode({
            corpId: corpId
          }).then(res => {
            dingTalkDD({
              code: res.code,
              state: 'state'
            }).then(response => {
              this.$store.dispatch('user/loginByCode', response)
                .then(() => {
                  this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                  this.loading = false
                })
            }).finally(() => {
              loading.close()
            })
          })
        })
      }
    },
    dingTalkLoginCallBack() {
      const query = getQueryObject(window.location.href)
      if (Object.prototype.hasOwnProperty.call(query, 'authCode')) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        dingTalkCheckState({
          state: query.state.replace('#/login', '')
        }).then(response => {
          const { check } = response.data
          if (check) {
            dingTalk({
              state: query.state.replace('#/login', ''),
              code: query.authCode
            }).then(response => {
              this.$store.dispatch('user/loginByCode', response)
                .then(() => {
                  this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                  this.loading = false
                })
            }).finally(() => {
              loading.close()
            })
          } else {
            loading.close()
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    .login-oauth {
      text-align: center;
      justify-content: space-around;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .logo{
      height: 50px;
      position: relative;
      margin-bottom: 25px;
      .logo-image{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 100%;
        margin: auto;
      }
      .title{
        line-height: 50px;
        margin-left: 50px;
        font-size: 26px;
        color: $light_gray;
        font-weight: bold;
      }
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }

  .el-divider{
    background-color: $light_gray;
    .el-divider__text{
      background-color: $bg;
      color: $light_gray;
    }
  }
}

#login_container {
  text-align: center;
}
</style>
