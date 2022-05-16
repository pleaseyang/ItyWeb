<template>
  <el-dialog
    :title="$t('dictData.title')"
    :visible.sync="dialogVisible"
    width="80%"
  >
    <div>
      <el-form ref="search" :inline="true" :model="search">
        <el-form-item>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleCreate">{{ $t('common.create') }}</el-button>
        </el-form-item>
        <el-form-item :label="$t('dictData.label')" prop="label">
          <el-input v-model="search.label" :placeholder="$t('dictData.label')" />
        </el-form-item>
        <el-form-item :label="$t('dictData.value')" prop="type">
          <el-input v-model="search.type" :placeholder="$t('dictData.value')" />
        </el-form-item>
        <el-form-item :label="$t('dictData.status')" prop="status">
          <el-select v-model="search.status" :placeholder="$t('dictData.status')">
            <el-option :label="$t('dictData.status_all')" value="" />
            <el-option :label="$t('dictData.status_1')" :value="1" />
            <el-option :label="$t('dictData.status_0')" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('dictData.default')" prop="default">
          <el-select v-model="search.default" :placeholder="$t('dictData.default')">
            <el-option :label="$t('dictData.default_all')" value="" />
            <el-option :label="$t('dictData.default_1')" :value="1" />
            <el-option :label="$t('dictData.default_0')" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" @click="onSubmit">{{ $t('common.search') }}</el-button>
          <el-button @click="resetForm">{{ $t('common.reset') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table
        highlight-current-row
        :data="data"
        style="width: 100%"
      >
        <el-table-column prop="label" :label="$t('dictData.label')" />
        <el-table-column prop="value" :label="$t('dictData.value')" />
        <el-table-column prop="sort" :label="$t('dictData.sort')" />
        <el-table-column prop="default" :label="$t('dictData.default')">
          <template scope="scope">
            <el-tag v-if="scope.row.default === 1">{{ $t('dictData.default_1') }}</el-tag>
            <el-tag v-else type="danger">{{ $t('dictData.default_0') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" :label="$t('dictData.status')">
          <template scope="scope">
            <el-tag v-if="scope.row.status === 1">{{ $t('dictData.status_1') }}</el-tag>
            <el-tag v-else type="danger">{{ $t('dictData.status_0') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="listClassData" :label="$t('dictData.list_class')">
          <template scope="scope">
            <el-tag v-if="scope.row.listClassData" :type="scope.row.listClassData.value">{{ scope.row.listClassData.name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" :label="$t('dictData.remark')" />
        <el-table-column prop="created_at" :label="$t('common.createdAt')" :formatter="rTime" />
        <el-table-column prop="updated_at" :label="$t('common.updatedAt')" :formatter="rTime" />
        <el-table-column :label="$t('common.handle')" width="300px">
          <template scope="scope">
            <el-button icon="el-icon-edit-outline" type="primary" @click="handleEdit(scope.row)">{{ $t('common.update') }}</el-button>
            <el-button icon="el-icon-delete" type="danger" @click="handleDelete(scope.row)">{{ $t('common.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="margin-t-10">
      <el-pagination
        :page-sizes="[10, 25, 50]"
        :page-size="10"
        :current-page="search.offset"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <Create ref="Create" @createDone="getList" />
    <Update ref="Update" @updateDone="getList" />
  </el-dialog>
</template>

<script>
import { rTime } from '@/utils'
import { dictDataDelete, dictDataList, dictDataListClass } from '@/api/dict'

export default {
  name: 'data.index',
  components: {
    Create: () => import('@/views/dict/data/create'),
    Update: () => import('@/views/dict/data/update')
  },
  data() {
    return {
      search: {
        dict_type_id: 0,
        offset: 1,
        limit: 10,
        order: 'descending',
        sort: 'sort',
        start_at: '',
        end_at: '',
        label: '',
        value: '',
        default: '',
        status: ''
      },
      data: [],
      total: 0,
      loading: false,
      dialogVisible: false,
      listClass: []
    }
  },
  methods: {
    init(id) {
      this.search.dict_type_id = id
      this.dialogVisible = true
      this.dictDataListClass()
    },
    dictDataListClass() {
      dictDataListClass().then(response => {
        const { list = [] } = response.data
        this.listClass = list
      }).finally(_ => {
        this.getList()
      })
    },
    rTime(row, column) {
      return rTime(row[column.property])
    },
    handleSizeChange(val) {
      this.search.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.search.offset = val
      this.getList()
    },
    onSubmit() {
      this.search.offset = 1
      this.getList()
    },
    resetForm(formName) {
      this.$refs.search.resetFields()
      this.search.offset = 1
      this.getList()
    },
    getList() {
      this.loading = true
      dictDataList(this.search).then(response => {
        const { data = [], total = 0 } = response.data
        data.map(e => {
          e.listClassData = this.listClass.find((i) => i.value === e.list_class)
        })
        this.data = data
        this.total = total
      }).finally(_ => {
        this.loading = false
      })
    },
    handleCreate() {
      this.$refs.Create.init(this.search.dict_type_id)
    },
    handleEdit({ id }) {
      this.$refs.Update.init(id)
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
        dictDataDelete({
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
    }
  }
}
</script>

<style scoped>

</style>
