<template>
  <el-dialog
    :title="$t('common.create')"
    :visible.sync="dialogVisible"
  >
    <el-form ref="form" :model="form" @submit.native.prevent="handleCreate">
      <el-form-item :label="$t('dictType.name')" prop="name" :error="error.name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item :label="$t('dictType.type')" prop="type" :error="error.type">
        <el-input v-model="form.type" />
      </el-form-item>
      <el-form-item :label="$t('dictType.status')" prop="statusShow" :error="error.status">
        <el-switch v-model="form.statusShow" />
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
import { dictTypeCreate } from '@/api/dict'

export default {
  name: 'dict.create',
  data() {
    return {
      dialogVisible: false,
      loading: false,
      form: {
        name: '',
        type: '',
        statusShow: true,
        remark: ''
      },
      error: {}
    }
  },
  methods: {
    init() {
      this.dialogVisible = true
    },
    handleCreate() {
      this.loading = true
      this.error = {}
      if (this.form.statusShow === true) {
        this.form.status = 1
      } else {
        this.form.status = 0
      }
      dictTypeCreate(this.form).then(response => {
        this.$message({
          showClose: true,
          message: response.message,
          type: 'success'
        })
        this.$refs.form.resetFields()
        this.$emit('createDone', response.data)
      }).catch(reason => {
        const { data } = reason.response
        if (data.code === 422) {
          for (const k in data.data) {
            this.error[k] = data.data[k].toString()
          }
        }
      }).finally(_ => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
