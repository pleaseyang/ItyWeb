<template>
  <el-row class="app-container">
    <el-col :span="24">
      <el-form ref="form" :inline="true" :model="form" @submit.native.prevent="onSubmit">
        <el-form-item>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleCreate">{{ $t('common.create') }}</el-button>
        </el-form-item>
        <el-form-item label="name" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="sex" prop="sex">
          <el-select v-model="form.sex" clearable filterable>
            <el-option
              v-for="item in dict.filter((e) => e.dict_type_id === 43)"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="admin_id" prop="admin_id">
          <el-select v-model="form.admin_id" clearable filterable>
            <el-option
              v-for="item in dictTypeSelectData"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="sgood" prop="sgood">
          <el-select v-model="form.sgood" clearable>
            <el-option :key="1" :value="1" :label="$t('common.yes')" />
            <el-option :key="0" :value="0" :label="$t('common.no')" />
          </el-select>
        </el-form-item>
        <el-form-item label="birthday_at开始" prop="birthday_at_start">
          <el-date-picker
            v-model="form.birthday_at_start"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            time-arrow-control
          />
        </el-form-item>
        <el-form-item label="birthday_at结束" prop="birthday_at_end">
          <el-date-picker
            v-model="form.birthday_at_end"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
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
        <el-table-column prop="name" label="name" sortable />
        <el-table-column prop="avatar" label="avatar" sortable>
          <template scope="scope">
            <el-image class="table-image table-image-50" :src="scope.row.avatar" :preview-src-list="[scope.row.avatar]">
              <div slot="error" class="image-error-slot">
                <i class="el-icon-picture-outline" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="dangan" label="dangan" sortable>
          <template scope="scope">
            <el-link v-if="scope.row.dangan" icon="el-icon-download" :underline="false" :href="scope.row.dangan" target="_blank">{{ $t('common.download') }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="sex" sortable>
          <template scope="scope">
            <DictTag v-if="dict.length > 0" :dict-data="dict" :dict-type-id="43" :value="scope.row.sex" />
          </template>
        </el-table-column>
        <el-table-column prop="birthday_at" label="birthday_at" sortable />
        <el-table-column prop="admin_id" label="admin_id" sortable>
          <template scope="scope">
            <ForeignString v-if="dictTypeSelectData.length > 0" column="id" show="name" :data="dictTypeSelectData" :value="scope.row.admin_id" />
          </template>
        </el-table-column>
        <el-table-column prop="number" label="number" sortable />
        <el-table-column prop="sgood" label="sgood" sortable>
          <template scope="scope">
            <el-tag v-if="scope.row.sgood" type="success">{{ $t('common.yes') }}</el-tag>
            <el-tag v-else type="danger">{{ $t('common.no') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="created_at" sortable />
        <el-table-column prop="updated_at" label="updated_at" sortable />
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
import { testDbDelete, testDbList as handeList } from '@/api/testDbApi'
import { dictTypeSelect } from '@/api/dictTypeApi'
import { dictDataSelect } from '@/api/dict'

export default {
  name: 'testDb.testDbs2',
  components: {
    DictTag: () => import('@/components/DictTag'),
    ForeignString: () => import('@/components/Foreign/string'),
    create: () => import('@/views/testDb/create'),
    update: () => import('@/views/testDb/update')
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
        sort: 'id',
        admin_id: '',
        name: '',
        sex: '',
        number: '',
        sgood: '',
        birthday_at_start: '',
        birthday_at_end: ''
      },
      dict: [],
      dictTypeSelectData: []
    }
  },
  mounted() {
    this.getDictData()
    this.getDictTypeSelect()
    this.getList()
  },
  methods: {
    getDictData() {
      dictDataSelect().then(response => {
        const { select = [] } = response.data
        this.dict = select
      })
    },
    getDictTypeSelect() {
      dictTypeSelect().then(response => {
        const { select = [] } = response.data
        this.dictTypeSelectData = select
      })
    },
    getList() {
      this.loading = true
      handeList(this.form).then(response => {
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
        testDbDelete({
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
