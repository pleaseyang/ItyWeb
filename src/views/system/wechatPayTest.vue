<template>
  <el-dialog
    :title="$t('system.wechatPay.test.title')"
    :visible.sync="dialogVisible"
  >
    <el-form ref="form" :model="form" label-width="auto" label-position="top">
      <el-form-item :label="$t('system.wechatPay.test.appid')" prop="appid" class="form-item-required" :error="error.appid ? error.appid[0] : ''">
        <el-input v-model="form.appid" clearable maxlength="18" show-word-limit />
        <el-col :span="24" class="text-help">
          <el-link type="primary" :underline="false" href="https://kf.qq.com/faq/1801116VJfua1801113QVNVz.html" target="_blank">
            {{ $t('system.wechatPay.test.help1') }}
          </el-link>
        </el-col>
      </el-form-item>
      <el-form-item :label="$t('system.wechatPay.test.notify_url')" prop="notify_url" class="form-item-required" :error="error.notify_url ? error.notify_url[0] : ''">
        <el-input v-model="form.notify_url" clearable maxlength="100" show-word-limit />
        <el-col :span="24" class="text-help" style="color: #909399">
          {{ $t('system.wechatPay.test.help2') }}<span style="color: #F56C6C">{{ $t('system.wechatPay.test.help3') }} <code>/</code></span>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="create">{{ $t('common.submit') }}</el-button>
      </el-form-item>
      <el-form-item v-if="code" :label="$t('system.wechatPay.test.code')">
        <el-alert :title="$t('system.wechatPay.test.help4')" type="warning" :closable="false" />
        <canvas id="code" ref="code" class="code margin-t-5" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { wechatPayTest } from '@/api/system'
import QRCode from 'qrcode'

export default {
  name: 'wechatPayTest',
  data() {
    return {
      dialogVisible: false,
      form: {
        appid: '',
        notify_url: ''
      },
      error: {},
      loading: false,
      code: ''
    }
  },
  methods: {
    init() {
      this.dialogVisible = true
    },
    create() {
      this.loading = true
      this.error = {}
      wechatPayTest(this.form).then(response => {
        this.code = response.data.code
        this.$nextTick(() => {
          QRCode.toCanvas(document.getElementById('code'), this.code)
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
