<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-form ref="formInline" :inline="true" :model="formInline">
          <el-form-item :label="$t('notification.message')" prop="message">
            <el-input v-model="formInline.message" :placeholder="$t('notification.message')" />
          </el-form-item>
          <el-form-item :label="$t('notification.is_read')">
            <el-select v-model="formInline.is_read" :placeholder="$t('notification.is_read')">
              <el-option :label="$t('exception.solveStatus.all')" value="" />
              <el-option :label="$t('notification.is_read0')" :value="0" />
              <el-option :label="$t('notification.is_read1')" :value="1" />
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
      <el-col :span="24">
        <el-form :inline="true">
          <el-form-item>
            <router-link to="/notification/send">
              <el-button type="primary" icon="el-icon-s-promotion">
                {{ $t('notification.send') }}
              </el-button>
            </router-link>
          </el-form-item>
          <el-form-item>
            <el-dropdown>
              <el-button type="primary">
                {{ $t('notification.is_read1') }} <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><span @click="readHandle">{{ $t('notification.read') }}</span></el-dropdown-item>
                <el-dropdown-item><span @click="allReadHandle">{{ $t('notification.allRead') }}</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col v-loading="loading" :span="24">
        <el-col :span="24">
          <el-table
            ref="multipleTable"
            highlight-current-row
            :data="tableData"
            style="width: 100%"
            :default-sort="{prop: sort, order: order}"
            @sort-change="tableSortChange"
            @cell-dblclick="notificationInfo"
          >
            <el-table-column type="selection" :selectable="checkSelect" width="55" />
            <el-table-column width="25px">
              <template slot-scope="scope">
                <i class="el-icon-message" :style="{color: scope.row.read_at === null ? '#E6A23C' : '#C0C4CC'}" />
              </template>
            </el-table-column>
            <el-table-column :label="$t('notification.message')">
              <template slot-scope="scope">
                <span v-if="scope.row.read_at === null">
                  <strong>{{ scope.row.data }}</strong>
                </span>
                <span v-else>{{ scope.row.data }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="created_at" :label="$t('common.createdAt')" :formatter="rTime" sortable />
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
    <info ref="notificationInfo" @notificationCount="notificationCount" @getNotifications="getNotifications" />
  </div>
</template>

<script>
import store from '@/store'
import { notifications, unReadCount, allRead, read } from '@/api/notification'
import { rTime } from '@/utils'
import Info from './info'

export default {
  name: 'Notification',
  components: { Info },
  data() {
    return {
      total: 0,
      loading: true,
      order: 'descending',
      sort: 'created_at',
      offset: 0,
      limit: 10,
      tableData: [],
      formInline: {
        message: '',
        is_read: '',
        time: ''
      },
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
      }
    }
  },
  mounted() {
    this.getNotifications()
  },
  methods: {
    getNotifications() {
      this.loading = true
      const requestData = {
        offset: this.offset,
        limit: this.limit,
        order: this.order,
        sort: this.sort,
        message: this.formInline.message
      }
      if (rTime(this.formInline.time[0]) !== '') {
        requestData['start_at'] = rTime(this.formInline.time[0])
      }
      if (rTime(this.formInline.time[1]) !== '') {
        requestData['end_at'] = rTime(this.formInline.time[1])
      }
      if (this.formInline.is_read !== '') {
        requestData['is_read'] = this.formInline.is_read
      }
      notifications(requestData).then(response => {
        const { data } = response
        this.loading = false
        this.tableData = data.notifications
        this.total = data.total
      })
    },
    tableSortChange(column) {
      this.order = column.order ? column.order : 'descending'
      this.sort = column.prop
      this.offset = 0
      this.getNotifications()
    },
    rTime(row, column) {
      return rTime(row[column.property])
    },
    handleSizeChange(val) {
      this.limit = val
      this.getNotifications()
    },
    handleCurrentChange(val) {
      this.offset = val
      this.getNotifications()
    },
    onSubmit() {
      this.offset = 0
      this.getNotifications()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.offset = 0
      this.getNotifications()
    },
    notificationInfo(row, column) {
      this.$refs.notificationInfo.notificationId(row.id)
      this.notificationInfoId = row.id
    },
    checkSelect(row, index) {
      let isChecked = true
      isChecked = row.read_at === null
      return isChecked
    },
    allReadHandle() {
      allRead().then(response => {
        this.getNotifications()
        this.notificationCount(0)
      })
    },
    readHandle() {
      const id = []
      const { selection } = this.$refs.multipleTable.store.states
      selection.forEach(row => {
        id.push(row.id)
      })
      if (id.length > 0) {
        read({
          id: id
        }).then(response => {
          this.getNotifications()
          unReadCount().then(response2 => {
            const { count } = response2.data
            this.notificationCount(count)
          })
        })
      } else {
        this.$message.error(this.$t('notification.checkMessage'))
      }
    },
    notificationCount(count) {
      store.dispatch('user/notificationCount', count)
    }
  }
}
</script>

<style scoped>
</style>
