<template>
  <el-form>
    <el-form-item>
      <el-tree
        ref="tree"
        v-loading="loading"
        :data="data"
        :props="defaultProps"
        node-key="id"
        default-expand-all
        show-checkbox
        :default-checked-keys="permissionIdList"
        check-on-click-node
        check-strictly
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">{{ $t('common.submit') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { role, syncPermissions } from '@/api/role'
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
      permissionIdList: []
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
        this.permissionIdList = []
        role({
          id: this.id
        }).then(response => {
          const { data } = response
          this.permissionIdList = data.permissionIdList
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
      })
    }
  }
}
</script>

<style scoped>

</style>
