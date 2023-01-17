<template>
  <el-form ref="form" :model="form" label-width="auto" label-position="top">
    <el-form-item :label="$t('system.wechat.open')" prop="open" class="form-item-required" :error="error.open ? error.open[0] : ''">
      <el-switch v-model="form.open" />
    </el-form-item>
    <el-form-item :label="$t('system.wechat.oplatform')" />
    <el-form-item :label="$t('system.wechat.oplatform_appid')" prop="oplatform_appid" class="form-item-required" :error="error.oplatform_appid ? error.oplatform_appid[0] : ''">
      <el-input v-model="form.oplatform_appid" clearable maxlength="18" show-word-limit />
    </el-form-item>
    <el-form-item :label="$t('system.wechat.oplatform_appsecret')" prop="oplatform_appsecret" class="form-item-required" :error="error.oplatform_appsecret ? error.oplatform_appsecret[0] : ''">
      <el-input v-model="form.oplatform_appsecret" clearable maxlength="32" show-word-limit />
    </el-form-item>
    <el-form-item :label="$t('system.wechat.oplatform_redirect_uri')" prop="oplatform_redirect_uri" class="form-item-required" :error="error.oplatform_redirect_uri ? error.oplatform_redirect_uri[0] : ''">
      <el-input v-model="form.oplatform_redirect_uri" clearable maxlength="100" show-word-limit />
    </el-form-item>
    <el-divider />
    <el-form-item :label="$t('system.wechat.offiaccount')" />
    <el-form-item :label="$t('system.wechat.offiaccount_appid')" prop="offiaccount_appid" class="form-item-required" :error="error.offiaccount_appid ? error.offiaccount_appid[0] : ''">
      <el-input v-model="form.offiaccount_appid" clearable maxlength="18" show-word-limit />
    </el-form-item>
    <el-form-item :label="$t('system.wechat.offiaccount_appsecret')" prop="offiaccount_appsecret" class="form-item-required" :error="error.offiaccount_appsecret ? error.offiaccount_appsecret[0] : ''">
      <el-input v-model="form.offiaccount_appsecret" clearable maxlength="32" show-word-limit />
    </el-form-item>
    <el-form-item :label="$t('system.wechat.offiaccount_redirect_uri')" prop="offiaccount_redirect_uri" class="form-item-required" :error="error.offiaccount_redirect_uri ? error.offiaccount_redirect_uri[0] : ''">
      <el-alert title="微信回调不要填写协议开头 http:// https://" type="warning" :closable="false" />
      <el-input v-model="form.offiaccount_redirect_uri" clearable maxlength="100" show-word-limit class="margin-t-5" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" @click="create">{{ $t('common.submit') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getConfig, wechat } from '@/api/system'

export default {
  name: 'wechatLogin',
  data() {
    return {
      form: {
        open: false,
        offiaccount_appid: '',
        offiaccount_appsecret: '',
        offiaccount_redirect_uri: '',
        oplatform_appid: '',
        oplatform_appsecret: '',
        oplatform_redirect_uri: ''
      },
      error: {},
      loading: false
    }
  },
  mounted() {
    this.getConfig()
  },
  methods: {
    getConfig() {
      getConfig({
        type: 'wechat'
      }).then(response => {
        const { config } = response.data
        const form = {}
        config.forEach(e => {
          if (e.key === 'open') {
            form.open = e.value === '1'
          } else {
            form[e.key] = e.value
          }
        })
        this.form = form
      })
    },
    create() {
      this.loading = true
      this.error = {}
      wechat(this.form).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
      }).catch(reason => {
        const { data } = reason.response
        if (data.code === 422) {
          this.error = data.data
        }
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
