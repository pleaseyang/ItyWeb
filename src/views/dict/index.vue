<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-form ref="search" :inline="true" :model="search">
          <el-form-item>
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleCreate">{{ $t('common.create') }}</el-button>
          </el-form-item>
          <el-form-item :label="$t('dictType.name')" prop="name">
            <el-input v-model="search.name" :placeholder="$t('dictType.name')" />
          </el-form-item>
          <el-form-item :label="$t('dictType.type')" prop="type">
            <el-input v-model="search.type" :placeholder="$t('dictType.type')" />
          </el-form-item>
          <el-form-item :label="$t('dictType.status')" prop="status">
            <el-select v-model="search.status" :placeholder="$t('dictType.status')">
              <el-option :label="$t('dictType.status_all')" value="" />
              <el-option :label="$t('dictType.status_1')" :value="1" />
              <el-option :label="$t('dictType.status_0')" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" @click="onSubmit">{{ $t('common.search') }}</el-button>
            <el-button @click="resetForm">{{ $t('common.reset') }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <el-table
          highlight-current-row
          :data="data"
          style="width: 100%"
          :default-sort="{prop: search.sort, order: search.order}"
          @sort-change="tableSortChange"
        >
          <el-table-column prop="name" :label="$t('dictType.name')" sortable />
          <el-table-column prop="type" :label="$t('dictType.type')" sortable>
            <template scope="scope">
              <el-link :underline="false" type="primary" @click="handleDictData(scope.row)">{{ scope.row.type }}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="status" :label="$t('dictType.status')" sortable>
            <template scope="scope">
              <el-tag v-if="scope.row.status === 1">{{ $t('dictType.status_1') }}</el-tag>
              <el-tag v-else type="danger">{{ $t('dictType.status_0') }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="remark" :label="$t('dictType.remark')" sortable />
          <el-table-column prop="created_at" :label="$t('common.createdAt')" sortable :formatter="rTime" />
          <el-table-column prop="updated_at" :label="$t('common.updatedAt')" :formatter="rTime" sortable />
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
          :current-page="search.offset"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-col>
    </el-row>
    <Create ref="Create" @createDone="getList" />
    <Update ref="Update" @updateDone="getList" />
    <DictData ref="DictData" />
  </div>
</template>

<script>
import { dictTypes, dictTypeDelete } from '@/api/dict'
import { rTime } from '@/utils'

export default {
  name: 'dict',
  components: {
    Create: () => import('@/views/dict/create'),
    Update: () => import('@/views/dict/update'),
    DictData: () => import('@/views/dict/data/index')
  },
  data() {
    return {
      search: {
        offset: 1,
        limit: 10,
        order: 'descending',
        sort: 'created_at',
        start_at: '',
        end_at: '',
        name: '',
        type: '',
        status: ''
      },
      data: [],
      total: 0,
      loading: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
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
    tableSortChange(column) {
      this.search.order = column.order ? column.order : 'descending'
      this.search.sort = column.prop
      this.search.offset = 1
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
      dictTypes(this.search).then(response => {
        const { data = [], total = 0 } = response.data
        this.data = data
        this.total = total
      }).finally(_ => {
        this.loading = false
      })
    },
    handleCreate() {
      this.$refs.Create.init()
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
        dictTypeDelete({
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
    handleDictData({ id }) {
      this.$refs.DictData.init(id)
    }
  }
}
</script>

<style scoped>

</style>
