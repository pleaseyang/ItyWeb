<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="formInline">
          <el-col>
            <el-form-item :label="$t('activity.log_name')">
              <el-select v-model="formInline.log_name" clearable :placeholder="$t('activity.log_name')">
                <el-option
                  v-for="item in log_name"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('activity.description')">
              <el-input v-model="formInline.description" :placeholder="$t('activity.description')" />
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
          </el-col>
          <transition name="el-zoom-in-top">
            <el-col v-show="searchMore">
              <el-form-item :label="$t('activity.subject_id')">
                <el-input v-model="formInline.subject_id" :placeholder="$t('activity.subject_id')" />
              </el-form-item>
              <el-form-item :label="$t('activity.subject_type')">
                <el-select v-model="formInline.subject_type" clearable :placeholder="$t('activity.subject_type')">
                  <el-option
                    v-for="item in subject_type"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('activity.causer_id')">
                <el-input v-model="formInline.causer_id" :placeholder="$t('activity.causer_id')" />
              </el-form-item>
              <el-form-item :label="$t('activity.causer_type')">
                <el-select v-model="formInline.causer_type" clearable :placeholder="$t('activity.causer_type')">
                  <el-option
                    v-for="item in causer_type"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('activity.properties')">
                <el-input v-model="formInline.properties" :placeholder="$t('activity.properties')" />
              </el-form-item>
            </el-col>
          </transition>
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
            highlight-current-row
            :data="tableData"
            style="width: 100%"
            :default-sort="{prop: sort, order: order}"
            @sort-change="tableSortChange"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-col :span="24">
                  <el-radio-group v-model="jsonTheme" size="small">
                    <el-radio-button label="">{{ $t('common.jsonTheme.default') }}</el-radio-button>
                    <el-radio-button label="one-dark">{{ $t('common.jsonTheme.oneDark') }}</el-radio-button>
                    <el-radio-button label="vs-code">{{ $t('common.jsonTheme.vsCode') }}</el-radio-button>
                  </el-radio-group>
                </el-col>
                <el-col :span="24" class="margin-t-10">
                  <el-form :model="props.row">
                    <el-form-item :label="$t('activity.causer')">
                      <span>{{ props.row.causer_type }}<span v-if="props.row.causer_id">: {{ props.row.causer_id }}</span></span>
                    </el-form-item>
                    <el-form-item :label="$t('activity.subject')">
                      <span>{{ props.row.subject_type }}<span v-if="props.row.subject_id">: {{ props.row.subject_id }}</span></span>
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :span="24">
                  <json-view class="margin-t-5" :data="props.row.properties" :theme="jsonTheme" />
                </el-col>
              </template>
            </el-table-column>
            <el-table-column prop="log_name" :label="$t('activity.log_name')" sortable width="200" />
            <el-table-column prop="description" :label="$t('activity.description')" sortable />
            <el-table-column prop="subject_id" :label="$t('activity.subject_id')" width="500">
              <template slot-scope="scope">
                <el-tooltip v-if="scope.row.causer_id" class="item" effect="dark" :content="scope.row.causer_id" placement="left">
                  <el-tag>{{ scope.row.causer_type }}</el-tag>
                </el-tooltip>
                <el-tag v-if="scope.row.causer_id && scope.row.subject_id" class="margin-l-5" type="info"><i class="el-icon-right" /></el-tag>
                <el-tooltip v-if="scope.row.subject_id" class="item margin-l-5" effect="dark" :content="scope.row.subject_id" placement="right">
                  <el-tag>{{ scope.row.subject_type }}</el-tag>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="created_at"
              :label="$t('common.createdAt')"
              :formatter="rTime"
              sortable
              width="180"
            />
          </el-table>
        </el-col>
        <el-col :span="24" class="margin-t-10">
          <el-pagination
            :page-sizes="[5, 20, 35, 50]"
            :page-size="5"
            :current-page="offset"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-col>
      </el-col>
    </el-row>
    <back-to-top :visibility-height="300" :back-position="50" transition-name="fade" />
  </div>
</template>

<script>
import { logs } from '@/api/active'
import { rTime } from '@/utils'
import jsonView from 'vue-json-views'
import BackToTop from '@/components/BackToTop'

export default {
  name: 'activeLog.activeLogs',
  components: {
    jsonView,
    BackToTop
  },
  data() {
    return {
      tableData: [],
      subject_type: [],
      causer_type: [],
      log_name: [],
      total: 0,
      loading: true,
      order: 'descending',
      sort: 'created_at',
      offset: 0,
      limit: 5,
      jsonTheme: 'vs-code',
      formInline: {
        log_name: '',
        description: '',
        subject_id: '',
        subject_type: '',
        causer_id: '',
        causer_type: '',
        properties: '',
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
      },
      searchMore: false
    }
  },
  mounted() {
    this.getLogs()
  },
  methods: {
    getLogs() {
      this.loading = true
      const requestData = {
        offset: this.offset,
        limit: this.limit,
        order: this.order,
        sort: this.sort,
        log_name: this.formInline.log_name,
        description: this.formInline.description,
        subject_id: this.formInline.subject_id,
        subject_type: this.formInline.subject_type,
        causer_id: this.formInline.causer_id,
        causer_type: this.formInline.causer_type,
        properties: this.formInline.properties
      }
      if (rTime(this.formInline.time[0]) !== '') {
        requestData['start_at'] = rTime(this.formInline.time[0])
      }
      if (rTime(this.formInline.time[1]) !== '') {
        requestData['end_at'] = rTime(this.formInline.time[1])
      }
      logs(requestData).then(response => {
        this.loading = false
        this.tableData = response.data.logs
        this.total = response.data.total
        this.subject_type = response.data.subject_type
        this.causer_type = response.data.causer_type
        this.log_name = response.data.log_name
      }).catch(reason => {
        this.loading = false
        this.tableData = []
        this.total = 0
        this.subject_type = []
        this.causer_type = []
        this.log_name = []
      })
    },
    rTime(row, column) {
      return rTime(row[column.property])
    },
    tableSortChange(column) {
      this.order = column.order ? column.order : 'descending'
      this.sort = column.prop
      this.offset = 0
      this.getLogs()
    },
    handleSizeChange(val) {
      this.limit = val
      this.getLogs()
    },
    handleCurrentChange(val) {
      this.offset = val
      this.getLogs()
    },
    onSubmit() {
      this.offset = 0
      this.getLogs()
    },
    resetForm(formName) {
      this.formInline = {
        log_name: '',
        description: '',
        subject_id: '',
        subject_type: '',
        causer_id: '',
        causer_type: '',
        properties: '',
        time: ''
      }
      this.offset = 0
      this.getLogs()
    }
  }
}
</script>

<style scoped>

</style>
