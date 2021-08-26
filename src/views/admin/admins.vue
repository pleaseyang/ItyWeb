<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-form ref="formInline" :inline="true" :model="formInline">
          <el-form-item>
            <el-button
              v-permission="'admin.create'"
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
          <el-form-item :label="$t('admin.email')" prop="email">
            <el-input v-model="formInline.email" :placeholder="$t('admin.email')" />
          </el-form-item>
          <el-form-item :label="$t('admin.status')" prop="status">
            <el-select v-model="formInline.status" :placeholder="$t('admin.status')">
              <el-option :label="$t('notification.all')" value="" />
              <el-option :label="$t('admin.status1Text')" :value="1" />
              <el-option :label="$t('admin.status0Text')" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('admin.roles')" prop="role_ids">
            <el-select v-model="formInline.role_ids" multiple :placeholder="$t('admin.roles')">
              <el-option
                v-for="(role, roleKey) in roles"
                :key="roleKey"
                :label="role.name"
                :value="role.id"
              />
            </el-select>
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
            <el-table-column prop="name" :label="$t('admin.name')" sortable />
            <el-table-column prop="email" :label="$t('admin.email')" sortable />
            <el-table-column :label="$t('admin.roles')">
              <template slot-scope="scope">
                <template v-if="scope.row.role_names.length > 3">
                  <el-tag v-for="(item, key) in scope.row.role_names.slice(0, 2)" :key="key" class="el-tags">{{ item }}</el-tag>
                  <el-link type="primary" :underline="false" class="margin-l-5 margin-t-5 see-more-text" @click="seeMoreRole(scope.row.role_names)">
                    {{ $t('common.seeMore') }}
                  </el-link>
                </template>
                <template v-else>
                  <el-tag v-for="(item, key) in scope.row.role_names" :key="key" class="el-tags">{{ item }}</el-tag>
                </template>
              </template>
            </el-table-column>
            <el-table-column prop="status" :label="$t('admin.status')" sortable>
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status === 1" type="success">{{ $t('admin.status1Text') }}</el-tag>
                <el-tag v-else type="danger">{{ $t('admin.status0Text') }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="created_at" :label="$t('common.createdAt')" :formatter="rTime" sortable />
            <el-table-column prop="updated_at" :label="$t('common.updatedAt')" :formatter="rTime" sortable />
            <el-table-column :label="$t('common.handle')" width="600px">
              <template slot-scope="scope">
                <el-button
                  v-permission="'role.syncRoles'"
                  icon="el-icon-setting"
                  type="primary"
                  @click="syncRoles(scope.row)"
                >
                  {{ $t('admin.syncRoles') }}
                </el-button>
                <el-button
                  v-permission="'admin.syncPermissions'"
                  icon="el-icon-setting"
                  type="primary"
                  @click="syncPermissions(scope.row)"
                >
                  {{ $t('admin.syncPermissions') }}
                </el-button>
                <el-button
                  v-permission="'admin.update'"
                  icon="el-icon-edit-outline"
                  type="primary"
                  @click="handleEdit(scope.row)"
                >
                  {{ $t('common.update') }}
                </el-button>
                <el-popconfirm
                  v-permission="'admin.delete'"
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
        <el-form-item :label="$t('admin.name')" prop="name" :error="createError.name ? createError.name[0] : ''">
          <el-input v-model="createForm.name" />
        </el-form-item>
        <el-form-item :label="$t('admin.email')" prop="email" :error="createError.email ? createError.email[0] : ''">
          <el-input v-model="createForm.email" />
        </el-form-item>
        <el-form-item :label="$t('admin.password')" prop="password" :error="createError.password ? createError.password[0] : ''">
          <el-input v-model="createForm.password" show-password />
        </el-form-item>
        <el-form-item :label="$t('admin.status')" prop="status" :error="createError.status ? createError.status[0] : ''">
          <el-radio-group v-model="createForm.status">
            <el-radio :label="1">{{ $t('admin.status1Text') }}</el-radio>
            <el-radio :label="0">{{ $t('admin.status0Text') }}</el-radio>
          </el-radio-group>
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
        <el-form-item :label="$t('admin.name')" prop="name" :error="updateError.name ? updateError.name[0] : ''">
          <el-input v-model="updateForm.name" />
        </el-form-item>
        <el-form-item :label="$t('admin.email')" prop="email" :error="updateError.email ? updateError.email[0] : ''">
          <el-input v-model="updateForm.email" />
        </el-form-item>
        <el-form-item :label="$t('admin.password')" prop="password" :error="updateError.password ? updateError.password[0] : ''">
          <el-input v-model="updateForm.password" show-password :placeholder="$t('admin.emptyPasswordText')" />
        </el-form-item>
        <el-form-item :label="$t('admin.status')" prop="status" :error="updateError.status ? updateError.status[0] : ''">
          <el-radio-group v-model="updateForm.status">
            <el-radio :label="1">{{ $t('admin.status1Text') }}</el-radio>
            <el-radio :label="0">{{ $t('admin.status0Text') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="updateLoading" @click="onUpdate('updateForm')">{{ $t('common.submit') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      v-el-drag-dialog
      :title="syncRolesTitle"
      :visible.sync="syncRolesVisible"
    >
      <sync-role :id="syncRolesId" :success="success" />
    </el-dialog>
    <el-dialog
      :title="syncPermissionsTitle"
      :visible.sync="syncPermissionsVisible"
    >
      <sync-permission :id="syncPermissionsId" :success="syncPermissionSuccess" />
    </el-dialog>
    <el-dialog
      v-el-drag-dialog
      :title="$t('common.seeMore')"
      :visible.sync="seeMoreRolesVisible"
      :before-close="seeMoreRolesClose"
      class="see-more-tag"
    >
      <el-tag v-for="(item, key) in seeMoreRoles" :key="key">{{ item }}</el-tag>
    </el-dialog>
  </div>
</template>

<script>
import { rTime } from '@/utils'
import { admins, admin, deleted, create as createAdmin, update } from '@/api/admin'
import { all } from '@/api/role'
import SyncRole from './syncRoles'
import SyncPermission from './syncPermissions'

export default {
  name: 'admin.admins',
  components: { SyncRole, SyncPermission },
  data() {
    return {
      createForm: {
        name: '',
        email: '',
        password: '',
        status: 1
      },
      updateForm: {
        name: '',
        email: '',
        password: '',
        status: 0
      },
      formInline: {
        name: '',
        email: '',
        status: '',
        role_ids: '',
        time: ''
      },
      total: 0,
      loading: true,
      order: 'descending',
      sort: 'created_at',
      offset: 0,
      limit: 10,
      tableData: [],
      roles: [],
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
      createLoading: false,
      createVisible: false,
      updateError: {},
      updateLoading: false,
      updateVisible: false,
      updateId: 0,
      syncRolesId: 0,
      syncRolesVisible: false,
      syncRolesTitle: '',
      syncPermissionsId: 0,
      syncPermissionsVisible: false,
      syncPermissionsTitle: '',
      seeMoreRoles: [],
      seeMoreRolesVisible: false
    }
  },
  mounted() {
    this.getRoles()
    this.getAdmins()
  },
  methods: {
    onUpdate(formName) {
      this.updateError = {}
      this.updateLoading = true
      if (this.updateForm.password === '') {
        delete this.updateForm.password
      }
      update(this.updateForm).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.updateVisible = false
        this.getAdmins()
      }).catch(reason => {
        const { data } = reason.response
        if (data.code === 422) {
          this.updateError = data.data
        }
      }).finally(() => {
        this.updateLoading = false
      })
    },
    onCreate(formName) {
      this.createError = {}
      this.createLoading = true
      createAdmin(this.createForm).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.resetCreateForm(formName)
        this.createVisible = false
        this.offset = 0
        this.getAdmins()
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
      this.getAdmins()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.offset = 0
      this.getAdmins()
    },
    tableSortChange(column) {
      this.order = column.order ? column.order : 'descending'
      this.sort = column.prop
      this.offset = 0
      this.getAdmins()
    },
    getRoles() {
      all({
        'guard_name': 'admin'
      }).then(response => {
        this.roles = response.data.roles
      }).catch(reason => {
        this.roles = []
      })
    },
    getAdmins() {
      this.loading = true
      const requestData = {
        offset: this.offset,
        limit: this.limit,
        order: this.order,
        sort: this.sort,
        name: this.formInline.name,
        email: this.formInline.email,
        status: this.formInline.status,
        guard_name: 'admin'
      }
      if (this.formInline.role_ids.length > 0) {
        requestData['role_ids'] = this.formInline.role_ids
      }
      if (rTime(this.formInline.time[0]) !== '') {
        requestData['start_at'] = rTime(this.formInline.time[0])
      }
      if (rTime(this.formInline.time[1]) !== '') {
        requestData['end_at'] = rTime(this.formInline.time[1])
      }
      admins(requestData).then(response => {
        const { data } = response
        this.loading = false
        this.tableData = data.admins
        this.total = data.total
      }).catch(reason => {
        this.loading = false
        this.tableData = []
        this.total = 0
      })
    },
    handleSizeChange(val) {
      this.limit = val
      this.getAdmins()
    },
    handleCurrentChange(val) {
      this.offset = val
      this.getAdmins()
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
        this.getAdmins()
      })
    },

    handleEdit(row) {
      this.updateError = {}
      admin({
        id: row.id
      }).then(response => {
        const { data } = response
        this.updateVisible = true
        this.updateForm = data
      })
    },

    syncRoles(row) {
      const { id, name } = row
      this.syncRolesId = id
      this.syncRolesVisible = true
      this.syncRolesTitle = name
    },

    success() {
      this.syncRolesId = 0
      this.syncRolesVisible = false
      this.getAdmins()
    },

    syncPermissions(row) {
      const { id, name } = row
      this.syncPermissionsId = id
      this.syncPermissionsVisible = true
      this.syncPermissionsTitle = name
    },

    syncPermissionSuccess() {
      this.syncPermissionsId = 0
      this.syncPermissionsVisible = false
      this.getAdmins()
    },

    seeMoreRole(roles) {
      this.seeMoreRoles = roles
      this.seeMoreRolesVisible = true
    },

    seeMoreRolesClose() {
      this.seeMoreRoles = []
      this.seeMoreRolesVisible = false
    }

  }
}
</script>

<style scoped>
  .el-tags {
    margin-left: 5px;
    margin-top: 5px;
  }

  .see-more-text{
    font-size: 12px;
  }

  .see-more-tag .el-tag {
    margin-left: 5px;
    margin-top: 5px;
  }
</style>
