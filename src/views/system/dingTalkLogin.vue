<template>
  <el-form ref="form" :model="form" label-width="auto" label-position="top">
    <el-form-item :label="$t('system.dingtalk.open')" prop="open" class="form-item-required" :error="error.open ? error.open[0] : ''">
      <el-switch v-model="form.open" />
    </el-form-item>
    <el-form-item :label="$t('system.dingtalk.need_permissions')">
      <el-tag>申请个人手机号信息</el-tag>
      <el-tag class="margin-l-5">通讯录个人信息读权限</el-tag>
      <el-tag class="margin-l-5">成员信息读权限</el-tag>
      <el-tag class="margin-l-5">企业员工手机号信息</el-tag>
      <el-tag class="margin-l-5">邮箱等个人信息</el-tag>
    </el-form-item>
    <el-form-item :label="$t('system.dingtalk.client_id')" prop="client_id" class="form-item-required" :error="error.client_id ? error.client_id[0] : ''">
      <el-input v-model="form.client_id" clearable maxlength="100" show-word-limit />
    </el-form-item>
    <el-form-item :label="$t('system.dingtalk.client_secret')" prop="client_secret" class="form-item-required" :error="error.client_secret ? error.client_secret[0] : ''">
      <el-input v-model="form.client_secret" clearable maxlength="200" show-word-limit />
    </el-form-item>
    <el-form-item :label="$t('system.dingtalk.corp_id')" prop="corp_id" class="form-item-required" :error="error.corp_id ? error.corp_id[0] : ''">
      <el-input v-model="form.corp_id" clearable maxlength="200" show-word-limit />
    </el-form-item>
    <el-form-item :label="$t('system.dingtalk.redirect_uri')" prop="redirect_uri" class="form-item-required" :error="error.redirect_uri ? error.redirect_uri[0] : ''">
      <el-alert title="https://domain.com/#/login  钉钉管理后台 -> 工作台 -> 应用管理 -> 应用 -> 应用功能 -> 登录与分享 请填写此项 (domain.com替换为正式地址)" type="warning" :closable="false" />
      <el-input v-model="form.redirect_uri" clearable maxlength="200" show-word-limit class="margin-t-5" />
    </el-form-item>
    <el-form-item :label="$t('system.dingtalk.redirect_bind_uri')" prop="redirect_bind_uri" class="form-item-required" :error="error.redirect_bind_uri ? error.redirect_bind_uri[0] : ''">
      <el-alert title="https://domain.com/#/profile/index  钉钉管理后台 -> 工作台 -> 应用管理 -> 应用 -> 应用功能 -> 登录与分享 请填写此项 (domain.com替换为正式地址)" type="warning" :closable="false" />
      <el-input v-model="form.redirect_bind_uri" clearable maxlength="200" show-word-limit class="margin-t-5" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" @click="create">{{ $t('common.submit') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getConfig, dingTalk } from '@/api/system'

export default {
  name: 'dingTalkLogin',
  data() {
    return {
      form: {
        open: false,
        client_id: '',
        client_secret: '',
        corp_id: '',
        redirect_uri: '',
        redirect_bind_uri: ''
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
        type: 'dingTalk'
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
      dingTalk(this.form).then(response => {
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
