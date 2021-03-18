<template>
  <el-form v-loading="loading">
    <el-form-item>
      <el-select
        v-model="roleIds"
        class="width-100"
        multiple
        filterable
        default-first-option
        :placeholder="$t('admin.syncRoles')"
      >
        <el-option
          v-for="item in roles"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="submitLoading" @click="onSubmit">{{ $t('common.submit') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { all, syncRoles } from '@/api/role'
import { admin } from '@/api/admin'
export default {
  name: 'SyncRoles',
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
      roles: [],
      roleIds: [],
      loading: false,
      submitLoading: false
    }
  },
  watch: {
    id() {
      this.admin()
    }
  },
  created() {
    this.admin()
  },
  methods: {
    admin() {
      if (this.id > 0) {
        this.loading = true
        this.roles = []
        admin({
          id: this.id
        }).then(response => {
          const { data } = response
          this.roleIds = data.roleIds
          all({
            'guard_name': 'admin'
          }).then(response2 => {
            const { roles } = response2.data
            this.roles = roles
            this.loading = false
          }).catch(reason => {
            this.loading = false
          })
        }).catch(reason => {
          this.loading = false
        })
      }
    },
    onSubmit() {
      this.submitLoading = true
      syncRoles({
        'guard_name': 'admin',
        'guard_id': this.id,
        'roles': this.roleIds
      }).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.success()
      }).finally(() => {
        this.submitLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
