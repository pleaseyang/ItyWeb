<template>
  <div class="app-container">
    <el-form ref="updateForm" :model="updateForm" label-width="auto" @submit.native.prevent>
      <el-form-item :label="$t('admin.name')" prop="name" :error="error.name ? error.name[0] : ''">
        <el-input v-model="updateForm.name" />
      </el-form-item>
      <el-form-item :label="$t('admin.email')" prop="email" :error="error.email ? error.email[0] : ''">
        <el-input v-model="updateForm.email" />
      </el-form-item>
      <el-form-item :label="$t('admin.password')" prop="password" :error="error.password ? error.password[0] : ''">
        <el-input v-model="updateForm.password" show-password :placeholder="$t('admin.emptyPasswordText')" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onUpdate('updateForm')">{{ $t('common.submit') }}</el-button>
      </el-form-item>
    </el-form>
    <nav-setting />
  </div>
</template>

<script>
import { updateSelf } from '@/api/admin'
import { getInfo } from '@/api/user'
import store from '@/store'
export default {
  name: 'Profile',
  components: {
    navSetting: () => import('./nav/index')
  },
  data() {
    return {
      updateForm: {
        name: '',
        email: '',
        password: ''
      },
      formInline: {
        name: '',
        time: ''
      },
      error: {}
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    getUser() {
      getInfo().then(response => {
        const { data } = response
        this.updateForm.name = data.name
        this.updateForm.email = data.email
      })
    },
    onUpdate(formName) {
      this.error = {}
      if (this.updateForm.password === '') {
        delete this.updateForm.password
      }
      updateSelf(this.updateForm).then(response => {
        store.dispatch('user/name', this.updateForm.name)
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.updateVisible = false
      }).catch(reason => {
        const { data } = reason.response
        if (data.code === 422) {
          this.error = data.data
        }
      })
    }
  }
}
</script>
