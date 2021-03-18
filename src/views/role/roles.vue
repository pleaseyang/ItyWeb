<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-form ref="formInline" :inline="true" :model="formInline">
          <el-form-item>
            <el-button
              v-permission="'role.create'"
              type="primary"
              icon="el-icon-circle-plus-outline"
              @click="createVisibleShow"
            >
              {{ $t('common.create') }}
            </el-button>
          </el-form-item>
          <el-form-item :label="$t('role.name')" prop="name">
            <el-input v-model="formInline.name" :placeholder="$t('role.name')" />
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
            <el-table-column prop="name" :label="$t('role.name')" sortable />
            <el-table-column prop="created_at" :label="$t('common.createdAt')" :formatter="rTime" sortable />
            <el-table-column prop="updated_at" :label="$t('common.updatedAt')" :formatter="rTime" sortable />
            <el-table-column :label="$t('common.handle')" width="600px">
              <template slot-scope="scope">
                <el-button
                  v-permission="'role.syncPermissions'"
                  icon="el-icon-setting"
                  type="primary"
                  @click="syncPermissions(scope.row)"
                >
                  {{ $t('role.syncPermissions') }}
                </el-button>
                <el-button
                  v-permission="'role.update'"
                  icon="el-icon-edit-outline"
                  type="primary"
                  @click="handleEdit(scope.row)"
                >
                  {{ $t('common.update') }}
                </el-button>
                <el-popconfirm
                  v-permission="'role.delete'"
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
        <el-form-item :label="$t('role.name')" prop="name" :error="createError.name ? createError.name[0] : ''">
          <el-input v-model="createForm.name" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="createLoading" @click="onCreate('createForm')">{{ $t('common.submit') }}</el-button>
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
        <el-form-item :label="$t('role.name')" prop="name" :error="updateError.name ? updateError.name[0] : ''">
          <el-input v-model="updateForm.name" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="updateLoading" @click="onUpdate('updateForm')">{{ $t('common.submit') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      :title="syncPermissionsTitle"
      :visible.sync="syncPermissionsVisible"
    >
      <sync-permissions :id="syncPermissionsId" :success="success" />
    </el-dialog>
  </div>
</template>

<script>
import { rTime } from '@/utils'
import { roles, role, create, update, deleted } from '@/api/role'
import SyncPermissions from '@/views/role/syncPermissions'

export default {
  name: 'Roles',
  components: { SyncPermissions },
  data() {
    return {
      createForm: {
        name: '',
        guard_name: 'admin'
      },
      updateForm: {
        name: '',
        guard_name: 'admin'
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
      createError: {},
      updateError: {},
      syncPermissionsVisible: false,
      syncPermissionsId: 0,
      syncPermissionsTitle: '',
      createVisible: false,
      updateVisible: false,
      createLoading: false,
      updateLoading: false
    }
  },
  mounted() {
    this.getRoles()
  },
  methods: {
    onUpdate(formName) {
      this.updateError = {}
      this.updateLoading = true
      update(this.updateForm).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.updateVisible = false
        this.getRoles()
      }).catch(reason => {
        const { data } = reason.response
        if (data.code === 422) {
          this.updateError = data.data
        }
      }).finally(() => {
        this.updateLoading = false
      })
    },
    createVisibleShow() {
      this.createVisible = true
    },
    onCreate(formName) {
      this.createError = {}
      this.createLoading = true
      create(this.createForm).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.resetCreateForm(formName)
        this.createVisible = false
        this.offset = 0
        this.getRoles()
      }).catch(reason => {
        const { data } = reason.response
        if (data.code === 422) {
          this.createError = data.data
        }
      }).finally(() => {
        this.createLoading = false
      })
    },
    resetCreateForm(formName) {
      this.$refs[formName].resetFields()
    },
    onSubmit() {
      this.offset = 0
      this.getRoles()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.offset = 0
      this.getRoles()
    },
    tableSortChange(column) {
      this.order = column.order ? column.order : 'descending'
      this.sort = column.prop
      this.offset = 0
      this.getRoles()
    },
    getRoles() {
      this.loading = true
      const requestData = {
        offset: this.offset,
        limit: this.limit,
        order: this.order,
        sort: this.sort,
        name: this.formInline.name,
        guard_name: 'admin'
      }
      if (rTime(this.formInline.time[0]) !== '') {
        requestData['start_at'] = rTime(this.formInline.time[0])
      }
      if (rTime(this.formInline.time[1]) !== '') {
        requestData['end_at'] = rTime(this.formInline.time[1])
      }
      roles(requestData).then(response => {
        const { data } = response
        this.loading = false
        this.tableData = data.roles
        this.total = data.total
      }).catch(reason => {
        this.loading = false
        this.tableData = []
        this.total = 0
      })
    },
    handleSizeChange(val) {
      this.limit = val
      this.getRoles()
    },
    handleCurrentChange(val) {
      this.offset = val
      this.getRoles()
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
        this.getRoles()
      })
    },
    handleEdit(row) {
      role({
        id: row.id
      }).then(response => {
        this.updateError = {}
        const { data } = response
        this.updateVisible = true
        this.updateForm = data
      })
    },
    syncPermissions(row) {
      const { id, name } = row
      this.syncPermissionsId = id
      this.syncPermissionsVisible = true
      this.syncPermissionsTitle = name
    },
    success() {
      this.syncPermissionsId = 0
      this.syncPermissionsVisible = false
    }
  }
}
</script>

<style scoped>

</style>
