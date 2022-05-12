<template>
  <el-dialog
    :title="$t('common.create')"
    :visible.sync="dialogVisible"
    append-to-body
  >
    <el-form ref="form" :model="form" @submit.native.prevent="handleCreate">
      <el-form-item :label="$t('dictData.label')" prop="label" :error="error.label">
        <el-input v-model="form.label" />
      </el-form-item>
      <el-form-item :label="$t('dictData.value')" prop="value" :error="error.value">
        <el-input v-model="form.value" />
      </el-form-item>
      <el-form-item :label="$t('dictData.sort')" prop="sort" :error="error.sort">
        <el-input-number v-model="form.sort" :min="1" />
      </el-form-item>
      <el-form-item :label="$t('dictData.default')" prop="defaultShow" :error="error.default">
        <el-switch v-model="form.defaultShow" />
      </el-form-item>
      <el-form-item :label="$t('dictData.status')" prop="statusShow" :error="error.status">
        <el-switch v-model="form.statusShow" />
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
import { dictDataCreate, dictDataListClass } from '@/api/dict'

export default {
  name: 'dict.data.create',
  data() {
    return {
      dialogVisible: false,
      loading: false,
      form: {
        dict_type_id: 0,
        label: '',
        value: '',
        sort: 1,
        list_class: null,
        default: false,
        defaultShow: false,
        status: true,
        statusShow: true,
        remark: ''
      },
      error: {},
      listClass: []
    }
  },
  methods: {
    init(dict_type_id) {
      dictDataListClass().then(response => {
        const { list = [] } = response.data
        this.listClass = list
        this.form.dict_type_id = dict_type_id
        this.dialogVisible = true
      })
    },
    handleCreate() {
      this.loading = true
      this.error = {}
      if (this.form.statusShow === true) {
        this.form.status = 1
      } else {
        this.form.status = 0
      }
      if (this.form.defaultShow === true) {
        this.form.default = 1
      } else {
        this.form.default = 0
      }
      dictDataCreate(this.form).then(response => {
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
