<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="formInline">
          <el-form-item :label="$t('nginx.httpCode')">
            <el-input v-model="formInline.http_code" :placeholder="$t('nginx.httpCode')" />
          </el-form-item>
          <el-form-item :label="$t('nginx.ip')">
            <el-input v-model="formInline.ip" :placeholder="$t('nginx.ip')" />
          </el-form-item>
          <el-form-item :label="$t('nginx.method')">
            <el-select v-model="formInline.method" clearable :placeholder="$t('nginx.method')">
              <el-option :label="$t('nginx.all')" value="" />
              <el-option label="GET" value="GET" />
              <el-option label="POST" value="POST" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('common.createTime')">
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
          <el-col v-show="searchMore">
            <el-form-item :label="$t('nginx.uri')">
              <el-input v-model="formInline.uri" :placeholder="$t('nginx.uri')" />
            </el-form-item>
            <el-form-item :label="$t('nginx.is_warning')">
              <el-select v-model="formInline.is_warning" clearable :placeholder="$t('nginx.is_warning')">
                <el-option :label="$t('nginx.all')" value="" />
                <el-option :label="$t('nginx.yes')" :value="1" />
                <el-option :label="$t('nginx.no')" :value="0" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('nginx.is_error')">
              <el-select v-model="formInline.is_error" clearable :placeholder="$t('nginx.is_error')">
                <el-option :label="$t('nginx.all')" value="" />
                <el-option :label="$t('nginx.yes')" :value="1" />
                <el-option :label="$t('nginx.no')" :value="0" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('nginx.is_robot')">
              <el-select v-model="formInline.is_robot" clearable :placeholder="$t('nginx.is_robot')">
                <el-option :label="$t('nginx.all')" value="" />
                <el-option :label="$t('nginx.yes')" :value="1" />
                <el-option :label="$t('nginx.no')" :value="0" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('nginx.is_mobile')">
              <el-select v-model="formInline.is_mobile" clearable :placeholder="$t('nginx.is_mobile')">
                <el-option :label="$t('nginx.all')" value="" />
                <el-option :label="$t('nginx.yes')" :value="1" />
                <el-option :label="$t('nginx.no')" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">{{ $t('common.search') }}</el-button>
              <el-button @click="resetForm">{{ $t('common.reset') }}</el-button>
              <el-button @click="searchMore = !searchMore">
                {{ searchMore ? $t('common.collapseScreening') : $t('common.moreScreening') }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
      <el-col v-loading="loading" :span="24">
        <el-col :span="24">
          <el-table
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-col :span="24">
                  {{ scope.row.string }}
                </el-col>
              </template>
            </el-table-column>
            <el-table-column prop="http" :label="$t('nginx.http')" width="80" />
            <el-table-column prop="http_code" :label="$t('nginx.httpCode')" width="80" />
            <el-table-column :label="$t('nginx.ip')">
              <template slot-scope="scope">
                <el-link target="_blank" :href="'https://www.ip138.com/iplookup.asp?ip='+scope.row.ip+'&action=2'">{{ scope.row.ip }}</el-link>
              </template>
            </el-table-column>
            <el-table-column prop="method" :label="$t('nginx.method')" width="80" />
            <el-table-column :label="$t('nginx.uri')">
              <template slot-scope="scope">
                <i v-if="scope.row.is_warning" class="el-icon-warning text-warning" />
                <i v-if="scope.row.is_error" class="el-icon-error text-error" />
                <span>{{ scope.row.uri }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="return" :label="$t('nginx.return')" />
            <el-table-column prop="size" :label="$t('nginx.size')" width="80" />
            <el-table-column :label="$t('nginx.browser')" width="120">
              <template slot-scope="scope">
                <i v-if="scope.row.is_robot" class="el-icon-user-solid text-info" />
                <i v-if="scope.row.is_mobile" class="el-icon-mobile-phone text-info" />
                <span>{{ scope.row.user_agent_info ? scope.row.user_agent_info.browser : '' }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('nginx.platform')">
              <template slot-scope="scope">
                <span>{{ scope.row.user_agent_info ? scope.row.user_agent_info.platform : '' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="time" :label="$t('common.createdAt')" width="180" />
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
  </div>
</template>

<script>
import { logs } from '@/api/nginx'
import { rTime } from '@/utils'
export default {
  name: 'nginx.logs',
  data() {
    return {
      total: 0,
      searchMore: false,
      loading: true,
      offset: 0,
      limit: 10,
      tableData: [],
      formInline: {
        http_code: '',
        ip: '',
        method: '',
        uri: '',
        is_warning: '',
        is_error: '',
        is_robot: '',
        is_mobile: '',
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
    this.getLogs()
  },
  methods: {
    getLogs() {
      this.loading = true
      const requestData = {
        http_code: this.formInline.http_code,
        ip: this.formInline.ip,
        method: this.formInline.method,
        uri: this.formInline.uri,
        is_warning: this.formInline.is_warning,
        is_error: this.formInline.is_error,
        is_robot: this.formInline.is_robot,
        is_mobile: this.formInline.is_mobile,
        offset: this.offset,
        limit: this.limit,
        file: 'nginx.log'
      }
      if (rTime(this.formInline.time[0]) !== '') {
        requestData['start_at'] = rTime(this.formInline.time[0])
      }
      if (rTime(this.formInline.time[1]) !== '') {
        requestData['end_at'] = rTime(this.formInline.time[1])
      }
      logs(requestData).then(response => {
        const { data } = response
        this.loading = false
        this.tableData = data.logs
        this.total = data.total
      }).catch(reason => {
        this.loading = false
        this.tableData = []
        this.total = 0
      })
    },
    handleSizeChange(val) {
      this.limit = val
      this.getLogs()
    },
    handleCurrentChange(val) {
      this.offset = val
      this.getLogs()
    },
    resetForm(formName) {
      this.formInline = {
        http_code: '',
        ip: '',
        method: '',
        uri: '',
        is_warning: '',
        is_error: '',
        is_robot: '',
        is_mobile: '',
        time: ''
      }
      this.offset = 0
      this.getLogs()
    },
    onSubmit() {
      this.offset = 0
      this.getLogs()
    }
  }
}
</script>

<style scoped>
</style>
