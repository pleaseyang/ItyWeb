<template>
  <div>
    <el-form ref="form" :model="form" label-width="auto">
      <el-form-item :label="$t('permission.name')" prop="name" :error="error.name ? error.name[0] : ''">
        <el-input v-model="form.name" maxlength="60" show-word-limit />
      </el-form-item>
      <el-form-item :label="$t('permission.title')" prop="title" :error="error.title ? error.title[0] : ''">
        <el-input v-model="form.title" maxlength="60" show-word-limit />
      </el-form-item>
      <el-form-item :label="$t('permission.icon')" prop="icon" :error="error.icon ? error.icon[0] : ''">
        <e-icon-picker v-model="form.icon" />
      </el-form-item>
      <el-form-item :label="$t('permission.path')" prop="path" :error="error.path ? error.path[0] : ''">
        <el-input v-model="form.path" maxlength="60" show-word-limit />
      </el-form-item>
      <el-form-item :label="$t('permission.component')" prop="component" :error="error.component ? error.component[0] : ''">
        <el-input v-model="form.component" maxlength="60" show-word-limit />
      </el-form-item>
      <el-form-item :label="$t('permission.sort')" prop="sort" :error="error.sort ? error.sort[0] : ''">
        <el-input-number v-model="form.sort" :min="1" :max="999" />
      </el-form-item>
      <el-form-item :label="$t('permission.hidden')" prop="hidden" :error="error.hidden ? error.hidden[0] : ''">
        <el-radio-group v-model="form.hidden">
          <el-radio :label="0">{{ $t('permission.nav') }}</el-radio>
          <el-radio :label="1">{{ $t('permission.btn') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="onSubmit('form')">{{ $t('common.submit') }}</el-button>
        <el-button @click="resetForm('form')">{{ $t('common.reset') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { update, permission } from '@/api/permission'
export default {
  name: 'Update',
  props: {
    success: {
      type: Function,
      default: null
    },
    id: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data() {
    return {
      form: {
        name: '',
        title: '',
        icon: 'el-icon-document',
        path: '',
        component: '',
        sort: 1,
        hidden: 1
      },
      error: {},
      pidData: [],
      loading: false
    }
  },
  watch: {
    id() {
      this.info()
    }
  },
  created() {
    this.info()
  },
  methods: {
    info() {
      if (this.id > 0) {
        permission({
          id: this.id
        }).then(response => {
          this.error = {}
          this.form = response.data
        })
      }
    },
    onSubmit(formName) {
      this.loading = true
      this.error = {}
      const form = this.form
      form.guard_name = 'admin'
      if (form.pid === 0) {
        delete form.pid
      }
      update(form).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.resetForm(formName)
        this.success()
      }).catch(reason => {
        const { data } = reason.response
        if (data.code === 422) {
          this.error = data.data
        }
      }).finally(() => {
        this.loading = false
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>

</style>
