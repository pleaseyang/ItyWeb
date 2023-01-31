<template>
  <el-form ref="form" :model="form" label-width="auto" label-position="top">
    <el-form-item :label="$t('system.wechatPay.merchant_id')" prop="merchant_id">
      <el-input v-model="form.merchant_id" disabled />
    </el-form-item>
    <el-form-item :label="$t('system.wechatPay.merchant_name')" prop="merchant_name">
      <el-input v-model="form.merchant_name" disabled />
    </el-form-item>
    <el-form-item v-if="form.apiV3key">
      <el-button v-if="form.apiV3key" type="" icon="el-icon-link" @click="wechatPayTest">
        {{ $t('system.wechatPay.test.title') }}
      </el-button>
    </el-form-item>
    <el-form-item :label="$t('system.wechatPay.api_v3_key')" prop="api_v3_key" class="form-item-required" :error="error.api_v3_key ? error.api_v3_key[0]: ''">
      <el-input v-model="form.api_v3_key" clearable maxlength="32" minlength="32" show-word-limit>
        <el-button slot="append" icon="el-icon-help" @click="randomKey">
          {{ $t('system.wechatPay.randomKey') }}
        </el-button>
      </el-input>
      <el-col :span="24" class="text-help">
        <el-link type="primary" :underline="false" href="https://kf.qq.com/faq/180830E36vyQ180830AZFZvu.html" target="_blank">
          {{ $t('system.wechatPay.setApiV3Key') }}
        </el-link>
      </el-col>
      <el-col :span="24" class="text-help">
        {{ $t('system.wechatPay.helpApiV3Key') }}
      </el-col>
    </el-form-item>
    <el-form-item :label="$t('system.wechatPay.zip')" prop="zip" class="form-item-required" :error="error.zip ? error.zip[0]: ''">
      <el-col v-if="zip.name" :span="24">
        <i class="el-icon-paperclip" />
        {{ zip.name }}
      </el-col>
      <el-upload
        ref="zip"
        action="#"
        :auto-upload="false"
        name="zip"
        accept="application/zip"
        :show-file-list="false"
        :limit="1"
        :on-change="onZipChange"
      >
        <el-button :loading="zipLoading" type="default" icon="el-icon-upload">
          {{ $t('common.upload') }}
        </el-button>
      </el-upload>
      <el-col :span="24" class="text-help"><el-link type="primary" :underline="false" href="https://kf.qq.com/faq/161222NneAJf161222U7fARv.html" target="_blank">{{ $t('system.wechatPay.setZip') }}</el-link></el-col>
      <el-col :span="24" class="text-help">{{ $t('system.wechatPay.helpZip1') }}</el-col>
      <el-col :span="24" class="text-help">{{ $t('system.wechatPay.helpZip2') }}</el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" @click="create">{{ $t('common.submit') }}</el-button>
    </el-form-item>
    <el-dialog
      :title="$t('system.wechatPay.check.title')"
      :visible.sync="checkShow"
    >
      <el-form :model="check">
        <el-form-item :label="$t('system.wechatPay.check.merchantId')" prop="merchantId">
          {{ check.merchantId }}
        </el-form-item>
        <el-form-item :label="$t('system.wechatPay.check.merchantName')" prop="merchantName">
          {{ check.merchantName }}
        </el-form-item>
        <el-form-item :label="$t('system.wechatPay.check.version')" prop="version">
          {{ check.version }}
        </el-form-item>
        <el-form-item :label="$t('system.wechatPay.check.serialNumber')" prop="serialNumber">
          {{ check.serialNumber }}
        </el-form-item>
        <el-form-item :label="$t('system.wechatPay.check.notAfter')" prop="notAfter">
          {{ check.notAfter }}
        </el-form-item>
        <el-form-item :label="$t('system.wechatPay.check.notBefore')" prop="notBefore">
          {{ check.notBefore }}
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="checkClose">{{ $t('system.wechatPay.check.close') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <wechat-pay-test ref="wechatPayTest" />
  </el-form>
</template>

<script>
import { getConfig, randomKey, wechatPay, wechatPayCheck } from '@/api/system'

export default {
  name: 'wechatPay',
  components: {
    wechatPayTest: () => import('@/views/system/wechatPayTest')
  },
  data() {
    return {
      form: {
        merchant_id: '',
        merchant_name: '',
        api_v3_key: '',
        apiV3key: ''
      },
      error: {},
      loading: false,
      zipLoading: false,
      zip: {},
      check: {
        version: '',
        serialNumber: '',
        notBefore: '',
        notAfter: '',
        merchantName: '',
        merchantId: ''
      },
      checkShow: false
    }
  },
  mounted() {
    this.getConfig()
  },
  methods: {
    getConfig() {
      getConfig({
        type: 'wechatPay'
      }).then(response => {
        const { config } = response.data
        const form = {}
        config.forEach(e => {
          form[e.key] = e.value
        })
        this.form.merchant_id = form.merchant_id
        this.form.merchant_name = form.merchant_name
        this.form.apiV3key = form.api_v3_key
      })
    },
    randomKey() {
      randomKey().then(response => {
        const { key } = response.data
        this.form.api_v3_key = key
      })
    },
    create() {
      this.loading = true
      this.error = {}
      const formData = new FormData()
      formData.append('api_v3_key', this.form.api_v3_key)
      formData.append('zip', this.zip.raw)
      wechatPay(formData).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.zip = {}
        this.form.api_v3_key = ''
        this.getConfig()
      }).catch(reason => {
        const { data } = reason.response
        if (data.code === 422) {
          this.error = data.data
        }
      }).finally(() => {
        this.loading = false
      })
    },
    onZipChange(file) {
      this.zipLoading = true
      this.checkShow = false
      this.check = {}
      const formData = new FormData()
      formData.append('zip', file.raw)
      wechatPayCheck(formData).then(response => {
        this.zip = file
        this.check = response.data
        this.checkShow = true
      }).finally(() => {
        this.zipLoading = false
        this.$refs.zip.clearFiles()
      })
    },
    checkClose() {
      this.checkShow = false
    },
    wechatPayTest() {
      this.$refs.wechatPayTest.init()
    }
  }
}
</script>

<style scoped>

</style>
