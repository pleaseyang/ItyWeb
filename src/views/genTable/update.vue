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
        <el-form-item :label="$t('genTable.name')" prop="name" :error="error.name">
          {{ form.name }}
        </el-form-item>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-form-item :label="$t('genTable.comment')" prop="comment" class="form-item-required" :error="error.comment">
          <el-input v-model="form.comment" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item :label="$t('genTable.pid')" prop="pid" class="form-item-required" :error="error.pid">
          <el-col :span="18">
            <el-cascader
              v-if="permission.length > 0"
              v-model="form.pid"
              :options="permission"
              :props="props"
              :placeholder="$t('genTable.pid_placeholder')"
              clearable
              show-all-levels
              filterable
              :style="{width: '100%'}"
            />
          </el-col>
          <el-col :span="5" :offset="1">
            <el-tooltip class="item" effect="dark" :content="$t('genTable.confirm_message')" placement="left">
              <el-button type="primary" :loading="genLoading" @click="handleGen">{{ $t('genTable.gen') }}</el-button>
            </el-tooltip>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-table ref="table" :data="form.gen_table_columns" stripe>
          <el-table-column prop="name" :label="$t('genTable.table.name')" width="100" />
          <el-table-column prop="comment" :label="$t('genTable.table.comment')" width="150">
            <template scope="scope">
              <el-input v-model="scope.row.comment" />
            </template>
          </el-table-column>
          <el-table-column prop="type" :label="$t('genTable.table.type')" width="100" />
          <el-table-column prop="_required" :label="$t('genTable.table._required')" width="55">
            <template scope="scope">
              <el-checkbox v-model="scope.row._required" />
            </template>
          </el-table-column>
          <el-table-column prop="_insert" :label="$t('genTable.table._insert')" width="55">
            <template scope="scope">
              <el-checkbox v-model="scope.row._insert" />
            </template>
          </el-table-column>
          <el-table-column prop="_update" :label="$t('genTable.table._update')" width="55">
            <template scope="scope">
              <el-checkbox v-model="scope.row._update" />
            </template>
          </el-table-column>
          <el-table-column prop="_list" :label="$t('genTable.table._list')" width="55">
            <template scope="scope">
              <el-checkbox v-model="scope.row._list" />
            </template>
          </el-table-column>
          <el-table-column prop="_select" :label="$t('genTable.table._select')" width="55">
            <template scope="scope">
              <el-checkbox v-model="scope.row._select" />
            </template>
          </el-table-column>
          <el-table-column prop="_query" :label="$t('genTable.table._query')">
            <template scope="scope">
              <el-select v-model="scope.row._query" :placeholder="$t('genTable.table.select')">
                <el-option v-for="item in select" :key="item" :label="item" :value="item" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="_show" :label="$t('genTable.table._show')">
            <template scope="scope">
              <el-select v-model="scope.row._show" :placeholder="$t('genTable.table.select')" @change="handleChangeShow(scope.row)">
                <el-option v-for="item in type" :key="item" :label="item" :value="item" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="dict_type_id" :label="$t('genTable.table.dict_type_id')">
            <template scope="scope">
              <el-select v-model="scope.row.dict_type_id" :placeholder="$t('genTable.table.select')" clearable filterable @change="handleChangeDict(scope.row)">
                <el-option v-for="item in dict" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="_unique" :label="$t('genTable.table._unique')" width="55">
            <template scope="scope">
              <el-checkbox v-model="scope.row._unique" />
            </template>
          </el-table-column>
          <el-table-column prop="_foreign" :label="$t('genTable.table._foreign')" width="55">
            <template scope="scope">
              <el-checkbox v-model="scope.row._foreign" />
            </template>
          </el-table-column>
          <el-table-column prop="_foreign" :label="$t('genTable.table._foreign_table')">
            <template scope="scope">
              <el-select v-model="scope.row._foreign_table" :placeholder="$t('genTable.table.select')" clearable filterable>
                <el-option v-for="item in tables" :key="item.name" :label="`${item.name}(${item.comment})`" :value="item.name" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="_foreign" :label="$t('genTable.table._foreign_column')">
            <template scope="scope">
              <el-select v-model="scope.row._foreign_column" :placeholder="$t('genTable.table.select')" clearable filterable>
                <el-option v-for="item in scope.row._foreign_table ? tables.find((e) => e.name === scope.row._foreign_table).info.columns : []" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="_foreign" :label="$t('genTable.table._foreign_show_column')">
            <template scope="scope">
              <el-select v-model="scope.row._foreign_show" :placeholder="$t('genTable.table.select')" clearable filterable>
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
      }).catch(_ => {
        this.genLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
