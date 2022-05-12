<template>
  <el-dialog
    :title="$t('common.update')"
    :visible.sync="dialogVisible"
    append-to-body
  >
    <el-form ref="form" :model="form" @submit.native.prevent="handleUpdate">
      <el-form-item :label="$t('dictData.label')" prop="label" :error="error.label">
        <el-input v-model="form.label" />
      </el-form-item>
      <el-form-item :label="$t('dictData.value')" prop="value" :error="error.value">
        <el-input v-model="form.value" />
      </el-form-item>
      <el-form-item :label="$t('dictData.sort')" prop="sort" :error="error.sort">
        <el-input-number v-model="form.sort" :min="1" />
      </el-form-item>
      <el-form-item :label="$t('dictData.default')" prop="default" :error="error.default">
        <el-switch v-model="form.default" />
      </el-form-item>
      <el-form-item :label="$t('dictData.status')" prop="status" :error="error.status">
        <el-switch v-model="form.status" />
      </el-form-item>
      <el-form-item :label="$t('dictData.list_class')" prop="list_class" :error="error.list_class">
        <el-select v-model="form.list_class">
          <el-option v-for="item in listClass" :key="item.value" :label="item.name" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('dictData.remark')" prop="remark" :error="error.remark">
        <el-input v-model="form.remark" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" native-type="submit">{{ $t('common.submit') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { dictData, dictDataListClass, dictDataUpdate } from '@/api/dict'

export default {
  name: 'dict.data.update',
  data() {
    return {
      dialogVisible: false,
      loading: false,
      form: {},
      error: {},
      listClass: []
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
      dictData({
        id: id
      }).then(response => {
        dictDataListClass().then(response2 => {
          const { list = [] } = response2.data
          this.listClass = list
          this.dialogVisible = true
          const form = response.data
          form.status = form.status === 1
          form.default = form.default === 1
          this.form = form
        })
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
      if (this.form.default === true) {
        this.form.default = 1
      } else {
        this.form.default = 0
      }
      dictDataUpdate(this.form).then(response => {
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
        this.form.default = this.form.default === 1
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
