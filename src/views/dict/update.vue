<template>
  <el-dialog
    :title="$t('common.update')"
    :visible.sync="dialogVisible"
  >
    <el-form ref="form" :model="form" @submit.native.prevent="handleUpdate">
      <el-form-item :label="$t('dictType.name')" prop="name" :error="error.name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item :label="$t('dictType.type')" prop="type" :error="error.type">
        <el-input v-model="form.type" />
      </el-form-item>
      <el-form-item :label="$t('dictType.status')" prop="status" :error="error.status">
        <el-switch v-model="form.status" />
      </el-form-item>
      <el-form-item :label="$t('dictType.remark')" prop="remark" :error="error.remark">
        <el-input v-model="form.remark" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" native-type="submit">{{ $t('common.submit') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { dictType, dictTypeUpdate } from '@/api/dict'

export default {
  name: 'dict.update',
  data() {
    return {
      dialogVisible: false,
      loading: false,
      form: {},
      error: {}
    }
  },
  methods: {
    init(id) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      dictType({
        id: id
      }).then(response => {
        this.dialogVisible = true
        const form = response.data.item
        form.status = form.status === 1
        this.form = form
      }).finally(_ => {
        loading.close()
      })
    },
    handleUpdate() {
      this.loading = true
      this.error = {}
      if (this.form.status === true) {
        this.form.status = 1
      } else {
        this.form.status = 0
      }
      dictTypeUpdate(this.form).then(response => {
        this.$message({
          showClose: true,
          message: response.message,
          type: 'success'
        })
        this.$emit('updateDone', response.data)
      }).catch(reason => {
        const { data } = reason.response
        if (data.code === 422) {
          for (const k in data.data) {
            this.error[k] = data.data[k].toString()
          }
        }
      }).finally(_ => {
        this.form.status = this.form.status === 1
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
