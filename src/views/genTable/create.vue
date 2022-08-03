<template>
  <el-dialog
    :visible.sync="dialogVisible"
    modal-append-to-body
    append-to-body
    center
    :close-on-click-modal="false"
    @close="close"
  >
    <template slot="title">
      <i class="el-icon-circle-plus-outline" /> {{ $t('common.create') }}
    </template>
    <el-form ref="form" :model="form" label-position="top" @submit.native.prevent="handleCreate">
      <el-form-item label="请选择要生成的表" prop="table" class="form-item-required" :error="error.table">
        <el-table ref="table" v-loading="tableLoading" :data="tableData" stripe>
          <el-table-column type="selection" width="55" />
          <el-table-column prop="name" label="表名称" />
          <el-table-column prop="comment" label="表描述" />
          <el-table-column prop="engine" label="表引擎" />
          <el-table-column prop="charset" label="字符集" />
          <el-table-column prop="collation" label="排序规则" />
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="tableData.length === 0" :loading="loading" native-type="submit">{{ $t('common.submit') }}</el-button>
        <el-button @click="resetForm()">{{ $t('common.reset') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { genTableCreate, importTable } from '@/api/genTableApi'

export default {
  name: 'genTable.create',
  components: {

  },
  data() {
    return {
      dialogVisible: false,
      form: {
        table: []
      },
      error: {},
      loading: false,
      tableLoading: false,
      tableData: []
    }
  },
  methods: {
    init() {
      this.dialogVisible = true
      this.getImportTables()
    },
    getImportTables() {
      this.tableLoading = true
      importTable().then(response => {
        this.tableData = response.data.list
      }).finally(() => {
        this.tableLoading = false
      })
    },
    close() {
      this.resetForm()
    },
    resetForm() {
      this.$refs.form.resetFields()
      this.$refs.table.clearSelection()
    },
    handleCreate() {
      this.loading = true
      this.error = {}
      this.form.table = this.$refs.table.selection.map((e) => e.name)
      genTableCreate(this.form).then(response => {
        this.$message({
          showClose: true,
          message: response.message,
          type: 'success'
        })
        this.resetForm()
        this.$emit('done', response.data)
      }).catch(reason => {
        const { data } = reason.response
        if (data.code === 422) {
          for (const k in data.data) {
            this.error[k] = data.data[k].toString()
          }
        }
      }).finally(_ => {
        this.getImportTables()
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
