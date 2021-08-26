<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="formInline">
          <el-form-item :label="$t('exception.id')">
            <el-input v-model="formInline.id" :placeholder="$t('exception.id')" />
          </el-form-item>
          <el-form-item :label="$t('exception.message')">
            <el-input v-model="formInline.message" :placeholder="$t('exception.message')" />
          </el-form-item>
          <el-form-item :label="$t('exception.isSolve')">
            <el-select v-model="formInline.is_solve" :placeholder="$t('exception.isSolve')">
              <el-option :label="$t('exception.solveStatus.all')" value="" />
              <el-option :label="$t('exception.solveStatus.no')" :value="0" />
              <el-option :label="$t('exception.solveStatus.yes')" :value="1" />
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
          <el-col>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">{{ $t('common.search') }}</el-button>
              <el-button @click="resetForm">{{ $t('common.reset') }}</el-button>
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
                    <el-form-item>
                      <span>{{ props.row.file }}:{{ props.row.line }}</span>
                      <el-popconfirm
                        v-if="props.row.is_solve === false"
                        v-permission="'exceptionError.amended'"
                        class="margin-l-10"
                        :title="$t('exception.confirmSolveSuccessText')"
                        :confirm-button-text="$t('common.confirmButtonText')"
                        :cancel-button-text="$t('common.cancelButtonText')"
                        @onConfirm="amended(props.row.id)"
                      >
                        <el-button slot="reference" type="success" size="mini" icon="el-icon-check" plain>
                          {{ $t('exception.solveSuccessText') }}
                        </el-button>
                      </el-popconfirm>
                      <el-button v-else class="margin-l-10" type="success" size="mini" icon="el-icon-check" plain disabled>
                        {{ $t('exception.solveStatus.yes') }}
                      </el-button>
                    </el-form-item>
                    <el-form-item>
                      <span>{{ props.row.message }}</span>
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :span="24">
                  <json-view class="margin-t-5" :data="props.row.trace" :theme="jsonTheme" />
                </el-col>
              </template>
            </el-table-column>
            <el-table-column prop="id" :label="$t('exception.id')" sortable width="200" />
            <el-table-column prop="message" :label="$t('exception.message')" sortable>
              <template slot-scope="scope">
                <template v-if="scope.row.message !== null && scope.row.message.length > 100">
                  {{ scope.row.message.substr(0,97) }}...
                </template>
                <template v-else>{{ scope.row.message }}</template>
              </template>
            </el-table-column>
            <el-table-column prop="is_solve" :label="$t('exception.isSolve')" width="100" sortable>
              <template slot-scope="scope">
                <el-tag :type="scope.row.is_solve ? 'success' : 'danger'">
                  {{ scope.row.is_solve ? $t('exception.solveStatus.yes') : $t('exception.solveStatus.no') }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="created_at"
              :label="$t('common.createdAt')"
              :formatter="rTime"
              sortable
              width="180"
            />
            <el-table-column
              prop="updated_at"
              :label="$t('common.updatedAt')"
              :formatter="rTime"
              sortable
              width="180"
            />
            <el-table-column :label="$t('exception.info')">
              <template slot-scope="scope">
                <el-button type="text" @click="seeInfo(scope.row)">{{ $t('common.seeInfo') }}</el-button>
              </template>
            </el-table-column>
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
    <el-dialog
      :title="seeInfoData.id"
      :visible.sync="seeInfoVisible"
      append-to-body
      top="30px"
      width="85%"
      :before-close="seeInfoClose"
    >
      <pre v-highlightjs="seeInfoData.trace_as_string"><code class="php" /></pre>
    </el-dialog>
    <back-to-top :visibility-height="300" :back-position="50" transition-name="fade" />
  </div>
</template>

<script>
import { logs, amended } from '@/api/exception'
import { rTime } from '@/utils'
import jsonView from 'vue-json-views'
import BackToTop from '@/components/BackToTop'

export default {
  name: 'exceptionError.exceptionErrors',
  components: {
    jsonView,
    BackToTop
  },
  data() {
    return {
      tableData: [],
      total: 0,
      loading: true,
      order: 'descending',
      sort: 'created_at',
      offset: 0,
      limit: 5,
      jsonTheme: 'vs-code',
      formInline: {
        id: '',
        message: '',
        is_solve: 0,
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
      seeInfoVisible: false,
      seeInfoData: {}
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
        id: this.formInline.id,
        message: this.formInline.message,
        is_solve: this.formInline.is_solve
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
      }).catch(reason => {
        this.loading = false
        this.tableData = []
        this.total = 0
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
        id: '',
        message: '',
        is_solve: 0,
        time: ''
      }
      this.offset = 0
      this.getLogs()
    },
    amended(id) {
      amended({
        id: id,
        solve: 1
      }).then(response => {
        if (response.success === true) {
          this.$notify({
            message: response.message,
            type: 'success'
          })
          this.getLogs()
        }
      })
    },
    seeInfo(data) {
      this.seeInfoVisible = true
      this.seeInfoData = data
    },
    seeInfoClose() {
      this.seeInfoVisible = false
      this.seeInfoData = {}
    }
  }
}
</script>

<style scoped>
/deep/ .el-dialog__body {
  padding: 0 20px 10px 20px !important;
}
.hljs{
  display: block;
  overflow-x: auto;
  padding: .5em;
}
.php.hljs {
  max-height: 630px !important;
}
</style>
