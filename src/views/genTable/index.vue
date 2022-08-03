<template>
  <el-row class="app-container">
    <el-col :span="24">
      <el-form ref="form" :inline="true" :model="form" @submit.native.prevent="onSubmit">
        <el-form-item>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleCreate">{{ $t('common.create') }}</el-button>
        </el-form-item>
        <el-form-item label="表名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="表描述" prop="comment">
          <el-input v-model="form.comment" />
        </el-form-item>
        <el-form-item label="表引擎" prop="engine">
          <el-input v-model="form.engine" />
        </el-form-item>
        <el-form-item label="字符集" prop="charset">
          <el-input v-model="form.charset" />
        </el-form-item>
        <el-form-item label="排序规则" prop="collation">
          <el-input v-model="form.collation" />
        </el-form-item>
        <el-form-item label="创建时间开始" prop="created_at_start">
          <el-date-picker
            v-model="form.created_at_start"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            time-arrow-control
          />
        </el-form-item>
        <el-form-item label="创建时间结束" prop="created_at_end">
          <el-date-picker
            v-model="form.created_at_end"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            time-arrow-control
          />
        </el-form-item>
        <el-form-item label="更新时间开始" prop="updated_at_start">
          <el-date-picker
            v-model="form.updated_at_start"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            time-arrow-control
          />
        </el-form-item>
        <el-form-item label="更新时间结束" prop="updated_at_end">
          <el-date-picker
            v-model="form.updated_at_end"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            time-arrow-control
          />
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" icon="el-icon-search" type="primary" native-type="submit">{{ $t('common.search') }}</el-button>
          <el-button icon="el-icon-refresh-left" @click="resetForm">{{ $t('common.reset') }}</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
      <el-table
        highlight-current-row
        :data="data"
        style="width: 100%"
        :default-sort="{prop: form.sort, order: form.order}"
        @sort-change="tableSortChange"
      >
        <el-table-column prop="name" label="表名称" sortable />
        <el-table-column prop="comment" label="表描述" sortable />
        <el-table-column prop="engine" label="表引擎" sortable />
        <el-table-column prop="charset" label="字符集" sortable />
        <el-table-column prop="collation" label="排序规则" sortable />
        <el-table-column prop="created_at" label="创建时间" sortable />
        <el-table-column prop="updated_at" label="更新时间" sortable />
        <el-table-column :label="$t('common.handle')" width="300px">
          <template scope="scope">
            <el-button icon="el-icon-edit-outline" type="primary" @click="handleEdit(scope.row)">{{ $t('common.update') }}</el-button>
            <el-button icon="el-icon-delete" type="danger" @click="handleDelete(scope.row)">{{ $t('common.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="24" class="margin-t-10">
      <el-pagination
        :page-sizes="[10, 25, 50]"
        :page-size="10"
        :current-page="form.offset"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-col>
    <create ref="create" @done="getList" />
    <update ref="update" @done="getList" />
  </el-row>
</template>

<script>
import { genTableDelete, genTableList } from '@/api/genTableApi'

export default {
  name: 'genTable.genTables',
  components: {
    create: () => import('@/views/genTable/create'),
    update: () => import('@/views/genTable/update')
  },
  data() {
    return {
      loading: false,
      data: [],
      total: 0,
      form: {
        offset: 1,
        limit: 10,
        order: 'descending',
        sort: 'created_at',
        name: '',
        comment: '',
        engine: '',
        charset: '',
        collation: '',
        created_at_start: '',
        created_at_end: '',
        updated_at_start: '',
        updated_at_end: ''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      genTableList(this.form).then(response => {
        const { data = [], total = 0 } = response.data
        this.data = data
        this.total = total
      }).catch(_ => {
        this.data = []
        this.total = 0
      }).finally(_ => {
        this.loading = false
      })
    },
    handleSizeChange(val) {
      this.form.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.form.offset = val
      this.getList()
    },
    tableSortChange(column) {
      this.form.order = column.order ? column.order : 'descending'
      this.form.sort = column.prop
      this.form.offset = 1
      this.getList()
    },
    onSubmit() {
      this.form.offset = 1
      this.getList()
    },
    resetForm() {
      this.$refs.form.resetFields()
      this.form.offset = 1
      this.getList()
    },
    handleDelete({ id }) {
      this.$confirm(this.$t('common.confirmDelete'), this.$t('common.tips'), {
        confirmButtonText: this.$t('common.confirmButtonText'),
        cancelButtonText: this.$t('common.cancelButtonText'),
        type: 'warning'
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        genTableDelete({
          id: id
        }).then(response => {
          this.$message({
            showClose: true,
            message: response.message,
            type: 'success'
          })
          this.getList()
        }).finally(_ => {
          loading.close()
        })
      }).catch(() => {

      })
    },
    handleCreate() {
      this.$refs.create.init()
    },
    handleEdit({ id }) {
      this.$refs.update.init(id)
    }
  }
}
</script>

<style scoped>

</style>
