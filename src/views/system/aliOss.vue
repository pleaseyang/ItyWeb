<template>
  <el-form ref="form" :model="form" label-width="auto" label-position="top">
    <el-form-item :label="$t('system.aliOss.need_permissions')">
      <el-tag>AliyunOSSFullAccess 管理对象存储服务(OSS)权限</el-tag>
    </el-form-item>
    <el-form-item :label="$t('system.aliOss.endpoint')" prop="endpoint" class="form-item-required" :error="error.endpoint ? error.endpoint[0] : ''">
      <el-input v-model="form.endpoint" clearable maxlength="100" show-word-limit />
    </el-form-item>
    <el-form-item :label="$t('system.aliOss.access_key_id')" prop="access_key_id" class="form-item-required" :error="error.access_key_id ? error.access_key_id[0] : ''">
      <el-alert title="https://help.aliyun.com/document_detail/116401.htm?spm=a2c4g.11186623.0.0.11c43669M1wVBf#task-2245479" type="warning" :closable="false" />
      <el-input v-model="form.access_key_id" clearable maxlength="100" show-word-limit class="margin-t-5" />
    </el-form-item>
    <el-form-item :label="$t('system.aliOss.access_key_secret')" prop="access_key_secret" class="form-item-required" :error="error.access_key_secret ? error.access_key_secret[0] : ''">
      <el-input v-model="form.access_key_secret" clearable maxlength="100" show-word-limit />
    </el-form-item>
    <el-form-item :label="$t('system.aliOss.bucket_name')" prop="bucket_name" class="form-item-required" :error="error.bucket_name ? error.bucket_name[0] : ''">
      <el-alert title="OSS管理后台 -> 存储空间名称 -> 权限控制 -> 读写权限 -> 修改为公共读" type="warning" :closable="false" />
      <el-input v-model="form.bucket_name" clearable maxlength="100" show-word-limit class="margin-t-5" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" @click="create">{{ $t('common.submit') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getConfig, aliOss } from '@/api/system'

export default {
  name: 'aliOss',
  data() {
    return {
      form: {
        endpoint: '',
        access_key_id: '',
        access_key_secret: '',
        bucket_name: ''
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
        type: 'aliOss'
      }).then(response => {
        const { config } = response.data
        const form = {}
        config.forEach(e => {
          form[e.key] = e.value
        })
        this.form = form
      })
    },
    create() {
      this.loading = true
      this.error = {}
      aliOss(this.form).then(response => {
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
