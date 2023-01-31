<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-tabs type="border-card">
          <el-tab-pane :label="$t('system.config')">
            <el-form ref="form" :model="form" label-width="auto" label-position="top">
              <el-form-item :label="$t('system.title')" prop="title">
                <el-input v-model="form.title" disabled />
              </el-form-item>
              <el-form-item :label="$t('system.logo')" prop="logo">
                <el-image
                  class="image logo-image"
                  :src="form.logo"
                  :preview-src-list="[form.logo]"
                  fit="cover"
                />
                <el-upload
                  ref="logo"
                  action="#"
                  :auto-upload="false"
                  name="logo"
                  accept="image/png"
                  :show-file-list="false"
                  :on-change="onLogoChange"
                >
                  <el-button :loading="loading" type="default" icon="el-icon-upload">
                    {{ $t('common.change') }}
                  </el-button>
                </el-upload>
                <p class="text-help">{{ $t('common.uploadLogTip') }}</p>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane :label="$t('system.dingTalkLogin')">
            <ding-talk-login ref="dingTalkLogin" />
          </el-tab-pane>
          <el-tab-pane :label="$t('system.wechatLogin')">
            <wechat-login ref="wechatLogin" />
          </el-tab-pane>
          <el-tab-pane :label="$t('system.aliOssTitle')">
            <ali-oss ref="aliOss" />
          </el-tab-pane>
          <el-tab-pane :label="$t('system.wechatPayTitle')">
            <wechat-pay ref="wechatPay" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { setting } from '@/api/user'
import { logoUpload } from '@/api/system'

export default {
  name: 'systemConfig',
  components: {
    dingTalkLogin: () => import('@/views/system/dingTalkLogin'),
    wechatLogin: () => import('@/views/system/wechatLogin'),
    aliOss: () => import('@/views/system/aliOss'),
    wechatPay: () => import('@/views/system/wechatPay')
  },
  data() {
    return {
      form: {
        title: '',
        logo: ''
      },
      loading: false
    }
  },
  mounted() {
    this.getConfig()
  },
  methods: {
    getConfig() {
      setting().then(response => {
        this.form = response.data
      })
    },
    onLogoChange(file) {
      this.loading = true
      const formData = new FormData()
      formData.append('logo', file.raw)
      logoUpload(formData).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.getConfig()
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
.logo-image {
  width: 80px;
  height: 80px;
}
</style>
