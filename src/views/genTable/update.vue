<template>
  <el-dialog
    :visible.sync="dialogVisible"
    modal-append-to-body
    append-to-body
    center
    :close-on-click-modal="false"
    width="90%"
  >
    <template slot="title">
      <i class="el-icon-edit-outline" /> {{ $t('common.update') }}
    </template>
    <el-form ref="form" :model="form" label-position="top">
      <el-col :span="4">
        <el-form-item label="表名称" prop="name" :error="error.name">
          {{ form.name }}
        </el-form-item>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-form-item label="表描述" prop="comment" class="form-item-required" :error="error.comment">
          <el-input v-model="form.comment" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="上级分类" prop="pid" class="form-item-required" :error="error.pid">
          <el-col :span="18">
            <el-cascader
              v-if="permission.length > 0"
              v-model="form.pid"
              :options="permission"
              :props="props"
              placeholder="留空默认为顶级分类"
              clearable
              show-all-levels
              filterable
              :style="{width: '100%'}"
            />
          </el-col>
          <el-col :span="5" :offset="1">
            <el-tooltip class="item" effect="dark" content="请确认已提交表信息" placement="left">
              <el-button type="primary" :loading="genLoading" @click="handleGen">生成代码</el-button>
            </el-tooltip>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-table ref="table" :data="form.gen_table_columns" stripe>
          <el-table-column prop="name" label="名称" width="100" />
          <el-table-column prop="comment" label="备注" width="150">
            <template scope="scope">
              <el-input v-model="scope.row.comment" />
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" width="100" />
          <el-table-column prop="_required" label="必填" width="55">
            <template scope="scope">
              <el-checkbox v-model="scope.row._required" />
            </template>
          </el-table-column>
          <el-table-column prop="_insert" label="新增" width="55">
            <template scope="scope">
              <el-checkbox v-model="scope.row._insert" />
            </template>
          </el-table-column>
          <el-table-column prop="_update" label="编辑" width="55">
            <template scope="scope">
              <el-checkbox v-model="scope.row._update" />
            </template>
          </el-table-column>
          <el-table-column prop="_list" label="列表" width="55">
            <template scope="scope">
              <el-checkbox v-model="scope.row._list" />
            </template>
          </el-table-column>
          <el-table-column prop="_select" label="查询" width="55">
            <template scope="scope">
              <el-checkbox v-model="scope.row._select" />
            </template>
          </el-table-column>
          <el-table-column prop="_query" label="查询方式">
            <template scope="scope">
              <el-select v-model="scope.row._query" placeholder="请选择">
                <el-option v-for="item in select" :key="item" :label="item" :value="item" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="_show" label="显示类型">
            <template scope="scope">
              <el-select v-model="scope.row._show" placeholder="请选择" @change="handleChangeShow(scope.row)">
                <el-option v-for="item in type" :key="item" :label="item" :value="item" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="dict_type_id" label="字典">
            <template scope="scope">
              <el-select v-model="scope.row.dict_type_id" placeholder="请选择" clearable filterable @change="handleChangeDict(scope.row)">
                <el-option v-for="item in dict" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="_unique" label="唯一" width="55">
            <template scope="scope">
              <el-checkbox v-model="scope.row._unique" />
            </template>
          </el-table-column>
          <el-table-column prop="_foreign" label="外键" width="55">
            <template scope="scope">
              <el-checkbox v-model="scope.row._foreign" />
            </template>
          </el-table-column>
          <el-table-column prop="_foreign" label="外键表">
            <template scope="scope">
              <el-select v-model="scope.row._foreign_table" placeholder="请选择" clearable filterable>
                <el-option v-for="item in tables" :key="item.name" :label="`${item.name}(${item.comment})`" :value="item.name" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="_foreign" label="外键关联字段">
            <template scope="scope">
              <el-select v-model="scope.row._foreign_column" placeholder="请选择" clearable filterable>
                <el-option v-for="item in scope.row._foreign_table ? tables.find((e) => e.name === scope.row._foreign_table).info.columns : []" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="_foreign" label="外键展示字段">
            <template scope="scope">
              <el-select v-model="scope.row._foreign_show" placeholder="请选择" clearable filterable>
                <el-option v-for="item in scope.row._foreign_table ? tables.find((e) => e.name === scope.row._foreign_table).info.columns : []" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-form>
    <template slot="footer">
      <el-button class="margin-t-10" type="primary" :loading="loading" @click="handleUpdate">{{ $t('common.submit') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { genTableInfo, genTableUpdate, columnConfig, gen, download } from '@/api/genTableApi'
import { inArray } from '@/utils'

export default {
  name: 'genTable.update',
  components: {

  },
  data() {
    return {
      dialogVisible: false,
      form: {
        gen_table_columns: []
      },
      error: {},
      loading: false,
      dict: [],
      dictData: [],
      permission: [],
      select: [],
      type: [],
      tables: [],
      props: {
        value: 'id',
        label: 'title',
        checkStrictly: true
      },
      genLoading: false
    }
  },
  methods: {
    init(id) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      genTableInfo({
        id: id
      }).then(response => {
        this.form = response.data
        columnConfig().then(response2 => {
          const { dict = [], dictData = [], permission = [], select = [], type = [], tables = [] } = response2.data
          this.dict = dict
          this.dictData = dictData
          this.permission = permission
          this.select = select
          this.type = type
          this.tables = tables
          this.dialogVisible = true
        }).finally(() => {
          loading.close()
        })
      }).catch(_ => {
        loading.close()
      })
    },
    handleChangeDict(row) {
      if (row.dict_type_id) {
        row.default = null
        // 获取字典的默认值
        const defaultData = this.dictData.filter(e => e.dict_type_id === row.dict_type_id).find(e => e.default === 1)
        if (defaultData !== undefined) {
          row.default = defaultData.value
        }
        row._query = '='
        row._show = 'select'
        row._validate = 'string'
        row._select = true
        row._unique = false
        row._foreign = false
        row._foreign_table = null
        row._foreign_column = null
        row._foreign_show = null
      }
    },
    handleChangeShow(row) {
      if (row._show && inArray(row._show, ['file', 'editor', 'image'])) {
        row._select = false
        row._validate = 'string'
        row.dict_type_id = null
        row._unique = false
        if (row._show === 'editor') {
          row._list = false
        }
      }
    },
    handleUpdate() {
      this.loading = true
      this.error = {}
      genTableUpdate(this.form).then(response => {
        this.$message({
          showClose: true,
          message: response.message,
          type: 'success'
        })
        this.$emit('done', response.data)
      }).catch(reason => {
        const { data } = reason.response
        if (data.code === 422) {
          for (const k in data.data) {
            this.error[k] = data.data[k].toString()
          }
        }
      }).finally(_ => {
        this.loading = false
      })
    },
    handleGen() {
      this.genLoading = true
      gen(this.form).then(response => {
        const { path = '' } = response.data
        if (path) {
          download({
            file: path
          }).then(response2 => {
            const a = document.createElement('a')
            const objectUrl = URL.createObjectURL(response2)
            a.setAttribute('href', objectUrl)
            a.click()
          }).catch(reason => {
            const data = reason.response.data
            const reader = new FileReader()
            reader.readAsText(data)
            reader.onload = () => {
              const { message } = JSON.parse(reader.result)
              this.$message({ showClose: true, type: 'error', message: message })
            }
          }).finally(_ => {
            this.genLoading = false
          })
        } else {
          this.genLoading = false
          this.$message({
            showClose: true,
            message: '获取文件路径失败',
            type: 'success'
          })
        }
      }).catch(_ => {
        this.genLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
