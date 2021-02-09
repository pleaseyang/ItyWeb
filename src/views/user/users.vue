<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-form ref="formInline" :inline="true" :model="formInline">
          <el-form-item>
            <el-button
              v-permission="'user.create'"
              type="primary"
              icon="el-icon-circle-plus-outline"
              @click="createVisible = true"
            >
              {{ $t('common.create') }}
            </el-button>
          </el-form-item>
          <el-form-item :label="$t('admin.name')" prop="name">
            <el-input v-model="formInline.name" :placeholder="$t('admin.name')" />
          </el-form-item>
          <el-form-item :label="$t('common.createTime')" prop="time">
            <el-date-picker
              v-model="formInline.time"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="~"
              :start-placeholder="$t('common.startTime')"
              :end-placeholder="$t('common.endTime')"
              align="right"
            />
          </el-form-item>
          <el-col>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">{{ $t('common.search') }}</el-button>
              <el-button @click="resetForm('formInline')">{{ $t('common.reset') }}</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
      <el-col v-loading="loading" :span="24">
        <el-col :span="24">
          <el-table
            highlight-current-row
            :data="tableData"
            style="width: 100%"
            :default-sort="{prop: sort, order: order}"
            @sort-change="tableSortChange"
          >
            <el-table-column prop="name" :label="$t('user.name')" sortable />
            <el-table-column prop="email" :label="$t('user.email')" sortable />
            <el-table-column prop="created_at" :label="$t('common.createdAt')" :formatter="rTime" sortable />
            <el-table-column prop="updated_at" :label="$t('common.updatedAt')" :formatter="rTime" sortable />
            <el-table-column :label="$t('common.handle')" width="600px">
              <template slot-scope="scope">
                <el-button
                  v-permission="'user.update'"
                  icon="el-icon-edit-outline"
                  type="primary"
                  @click="handleEdit(scope.row)"
                >
                  {{ $t('common.update') }}
                </el-button>
                <el-popconfirm
                  v-permission="'user.delete'"
                  :title="$t('common.confirmDelete')"
                  :confirm-button-text="$t('common.confirmButtonText')"
                  :cancel-button-text="$t('common.cancelButtonText')"
                  @onConfirm="handleDelete(scope.row.id)"
                >
                  <el-button
                    slot="reference"
                    icon="el-icon-delete"
                    type="danger"
                  >
                    {{ $t('common.delete') }}
                  </el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24" class="margin-t-10">
          <el-pagination
            :page-sizes="[10, 25, 50]"
            :page-size="10"
            :current-page="offset"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-col>
      </el-col>
    </el-row>
    <el-dialog
      v-el-drag-dialog
      :title="$t('common.create')"
      :visible.sync="createVisible"
    >
      <el-form ref="createForm" :model="createForm" label-width="auto" @submit.native.prevent>
        <el-form-item :label="$t('user.name')" prop="name" :error="error.name ? error.name[0] : ''">
          <el-input v-model="createForm.name" />
        </el-form-item>
        <el-form-item :label="$t('user.email')" prop="email" :error="error.email ? error.email[0] : ''">
          <el-input v-model="createForm.email" />
        </el-form-item>
        <el-form-item :label="$t('user.password')" prop="password" :error="error.password ? error.password[0] : ''">
          <el-input v-model="createForm.password" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onCreate('createForm')">{{ $t('common.submit') }}</el-button>
          <el-button @click="resetCreateForm('createForm')">{{ $t('common.reset') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      v-el-drag-dialog
      :title="$t('common.update')"
      :visible.sync="updateVisible"
    >
      <el-form ref="updateForm" :model="updateForm" label-width="auto" @submit.native.prevent>
        <el-form-item :label="$t('user.name')" prop="name" :error="error.name ? error.name[0] : ''">
          <el-input v-model="updateForm.name" />
        </el-form-item>
        <el-form-item :label="$t('user.email')" prop="email" :error="error.email ? error.email[0] : ''">
          <el-input v-model="updateForm.email" />
        </el-form-item>
        <el-form-item :label="$t('user.password')" prop="password" :error="error.password ? error.password[0] : ''">
          <el-input v-model="updateForm.password" show-password :placeholder="$t('user.emptyPasswordText')" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onUpdate('updateForm')">{{ $t('common.submit') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { rTime } from '@/utils'
import { users, user, deleted, create, update } from '@/api/user'

export default {
  name: 'Users',
  data() {
    return {
      createForm: {
        name: '',
        email: '',
        password: ''
      },
      updateForm: {
        name: '',
        email: '',
        password: ''
      },
      formInline: {
        name: '',
        time: ''
      },
      total: 0,
      loading: true,
      order: 'descending',
      sort: 'created_at',
      offset: 0,
      limit: 10,
      tableData: [],
      pickerOptions: {
        shortcuts: [{
          text: this.$t('common.week'),
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t('common.oneMonth'),
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t('common.threeMonth'),
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      error: {},
      createVisible: false,
      updateVisible: false,
      updateId: 0
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    onUpdate(formName) {
      this.error = {}
      if (this.updateForm.password === '') {
        delete this.updateForm.password
      }
      update(this.updateForm).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.updateVisible = false
        this.getUsers()
      }).catch(reason => {
        const { data } = reason.response
        if (data.code === 422) {
          this.error = data.data
        }
      })
    },
    onCreate(formName) {
      this.error = {}
      create(this.createForm).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.resetCreateForm(formName)
        this.createVisible = false
        this.offset = 0
        this.getUsers()
      }).catch(reason => {
        const { data } = reason.response
        if (data.code === 422) {
          this.error = data.data
        }
      })
    },
    resetCreateForm(formName) {
      this.$refs[formName].resetFields()
    },
    onSubmit() {
      this.offset = 0
      this.getUsers()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.offset = 0
      this.getUsers()
    },
    tableSortChange(column) {
      this.order = column.order ? column.order : 'descending'
      this.sort = column.prop
      this.offset = 0
      this.getUsers()
    },
    getUsers() {
      this.loading = true
      const requestData = {
        offset: this.offset,
        limit: this.limit,
        order: this.order,
        sort: this.sort,
        name: this.formInline.name
      }
      if (rTime(this.formInline.time[0]) !== '') {
        requestData['start_at'] = rTime(this.formInline.time[0])
      }
      if (rTime(this.formInline.time[1]) !== '') {
        requestData['end_at'] = rTime(this.formInline.time[1])
      }
      users(requestData).then(response => {
        const { data } = response
        this.loading = false
        this.tableData = data.users
        this.total = data.total
      }).catch(reason => {
        this.loading = false
        this.tableData = []
        this.total = 0
      })
    },
    handleSizeChange(val) {
      this.limit = val
      this.getUsers()
    },
    handleCurrentChange(val) {
      this.offset = val
      this.getUsers()
    },
    rTime(row, column) {
      return rTime(row[column.property])
    },
    handleDelete(id) {
      deleted({
        id: id
      }).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.getUsers()
      })
    },

    handleEdit(row) {
      user({
        id: row.id
      }).then(response => {
        const { data } = response
        this.updateVisible = true
        this.updateForm = data
      })
    }
  }
}
</script>

<style scoped>
</style>
