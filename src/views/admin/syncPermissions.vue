<template>
  <el-form v-loading="loading">
    <el-form-item>
      <el-tree
        ref="tree"
        :data="data"
        :props="defaultProps"
        node-key="id"
        default-expand-all
        show-checkbox
        :default-checked-keys="permissionIds"
        check-on-click-node
        check-strictly
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="submitLoading" @click="onSubmit">{{ $t('common.submit') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { admin, syncPermissions } from '@/api/admin'
import { tree } from '@/api/permission'
export default {
  name: 'SyncPermissions',
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
      loading: true,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      permissionIds: [],
      submitLoading: false
    }
  },
  watch: {
    id() {
      this.role()
    }
  },
  created() {
    this.role()
  },
  methods: {
    role() {
      if (this.id > 0) {
        this.loading = true
        this.data = []
        admin({
          id: this.id
        }).then(response => {
          const { data } = response
          this.permissionIds = data.permissionIds
          this.getTree()
        }).catch(reason => {
          this.loading = false
        })
      }
    },
    getTree() {
      tree({
        'guard_name': 'admin'
      }).then(response => {
        this.loading = false
        this.data = response.data.tree
      }).catch(reason => {
        this.loading = false
      })
    },
    onSubmit() {
      this.submitLoading = true
      const data = this.$refs.tree.getCheckedKeys()
      syncPermissions({
        id: this.id,
        permissions: data
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
