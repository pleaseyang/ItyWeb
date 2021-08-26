<template>
  <div class="app-container">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="12">
        <el-button v-permission="'file.upload'" type="primary" @click="uploadDrawer = true">{{ $t('file.uploadFile') }}</el-button>
        <el-button v-permission="'file.makeDirectory'" @click="makeDirectoryDrawer = true">{{ $t('file.makeDirectory') }}</el-button>
        <el-button @click="getList">{{ $t('common.refresh') }}</el-button>
        <el-dropdown class="margin-l-10">
          <el-button id="el-button-disable" disabled>
            {{ $t('common.batchHandle') }}<i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-permission="'file.download'">
              <span @click="downloadAll">{{ $t('common.download') }}</span>
            </el-dropdown-item>
            <el-dropdown-item v-permission="'file.delete'">
              <span @click="fileDeleteAll">{{ $t('common.delete') }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="6">
        <el-input
          v-model="search"
          :placeholder="$t('file.search')"
          suffix-icon="el-icon-search"
          @input="getList"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          ref="multipleTable"
          v-loading="loading"
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" :selectable="checkSelect" width="55" />
          <el-table-column label="" width="50">
            <template slot-scope="scope">
              <el-link
                v-if="scope.row.type === 'path'"
                class="el-icon-back"
                style="font-size:16px"
                type="primary"
                :underline="false"
                @click="setPath(scope.row, scope.row.name.length - 2)"
              />
              <span v-else :class="'oss-rc-icon-file file-' + scope.row.pathinfo.extension" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('file.name')" prop="name">
            <template slot-scope="scope">
              <el-link style="font-size:12px" type="primary" :underline="false">
                <span
                  v-if="scope.row.type === 'file'"
                  @click="setPath(scope.row, 0)"
                >{{ scope.row.pathinfo.basename }}</span>
                <span
                  v-else-if="scope.row.type === 'directory'"
                  @click="setPath(scope.row, 0)"
                >{{ scope.row.name }}</span>
                <span v-else-if="scope.row.type === 'path'">
                  <el-breadcrumb separator="/">
                    <el-breadcrumb-item v-for="( item, i ) in scope.row.name" :key="i">
                      <span @click="setPath(scope.row, i)">{{ item }}</span>
                    </el-breadcrumb-item>
                  </el-breadcrumb>
                </span>
              </el-link>
            </template>
          </el-table-column>
          <el-table-column prop="size" :label="$t('file.size')" width="100" />
          <el-table-column prop="lastModified" :label="$t('file.lastModified')" :formatter="rTime" width="200" />
          <el-table-column :label="$t('common.handle')" width="200">
            <template slot-scope="scope">
              <div v-show="scope.row.type === 'directory'">
                <el-button v-permission="'file.deleteDirectory'" type="text" @click="directoryDelete(scope.row)">
                  {{ $t('common.delete') }}
                </el-button>
              </div>
              <div v-show="scope.row.type === 'file'">
                <el-button type="text" @click="setPath(scope.row, 0)">{{ $t('common.details') }}</el-button>
                <el-dropdown style="margin-left: 15px">
                  <el-button type="text">{{ $t('common.more') }}<i class="el-icon-arrow-down el-icon--right" /></el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-permission="'file.download'">
                      <span @click="download(scope.row)">{{ $t('common.download') }}</span>
                    </el-dropdown-item>
                    <el-dropdown-item v-permission="'file.delete'">
                      <span @click="fileDelete(scope.row)">{{ $t('common.delete') }}</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="margin-t-10">
        <el-pagination
          :page-sizes="[25, 50, 75, 100]"
          :page-size="25"
          :current-page="offset"
          :hide-on-single-page="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-col>
    </el-row>
    <el-drawer
      :visible.sync="uploadDrawer"
      :with-header="false"
      size="30%"
      :before-close="handleClose"
    >
      <uploadFile ref="uploadFileRef" :directory="directory" />
    </el-drawer>
    <el-drawer
      :visible.sync="makeDirectoryDrawer"
      :with-header="false"
      size="30%"
    >
      <el-row>
        <el-col :span="24" class="app-container">
          <el-form label-position="left" label-width="80px" :model="makeDirectory" @submit.native.prevent>
            <el-form-item label-width="0">
              <help />
            </el-form-item>
            <el-form-item :label="$t('file.directoryName')" :error="error.directory ? error.directory[0] : ''">
              <el-input v-model="makeDirectory.name" type="text" minlength="1" maxlength="60" show-word-limit />
            </el-form-item>
            <el-form-item>
              <el-button class="margin-t-10" type="primary" :loading="makeDirectoryDrawerLoading" @click="makeDirectoryHandle">{{ $t('common.submit') }}</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-drawer>
    <el-drawer
      :visible.sync="fileInfoDrawer"
      :with-header="false"
      size="40%"
    >
      <el-row>
        <el-col :span="24">
          <el-image fit="contain" :src="fileInfoDrawerData.url">
            <div slot="error" style="height: 100%">
              <div class="image-slot">
                {{ $t('file.NSCTP') }}
              </div>
            </div>
            <div slot="placeholder" style="height: 100%">
              <div class="image-slot">
                {{ $t('common.loading') }}
              </div>
            </div>
          </el-image>
        </el-col>
        <el-col :span="24" class="app-container">
          <el-form label-position="right">
            <el-form-item :label="$t('file.name')">
              {{ fileInfoDrawerData.name }}
              <el-link class="fr" type="primary" :underline="false" @click="copy(fileInfoDrawerData.name)">{{ $t('common.copy') }}</el-link>
            </el-form-item>
            <el-form-item label="URL">
              <el-input
                v-model="fileInfoDrawerData.url"
                type="textarea"
                readonly
                resize="none"
                :autosize="{ minRows: 2, maxRows: 4}"
              />
              <el-link v-permission="'file.download'" type="primary" :underline="false" @click="download(fileInfoDrawerData)">{{ $t('common.download') }}</el-link>
              <el-divider direction="vertical" />
              <el-link v-permission="'file.delete'" type="primary" :underline="false" @click="fileDelete(fileInfoDrawerData)">{{ $t('common.delete') }}</el-link>
            </el-form-item>
            <el-form-item :label="$t('file.type')">
              {{ fileInfoDrawerData.pathinfo ? fileInfoDrawerData.pathinfo.extension : '' }}
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
import { files, fileDownload, fileDelete, directoryDelete, makeDirectory } from '@/api/file'
import help from './help'
import uploadFile from './uploadFile'
import Cookies from 'js-cookie'
import { Message } from 'element-ui'
import { rTime } from '@/utils'

export default {
  name: 'file.files',
  components: {
    help,
    uploadFile
  },
  data() {
    return {
      tableData: [],
      directory: '/',
      loading: true,
      search: '',
      fileInfoDrawer: false,
      fileInfoDrawerData: {},
      multipleSelection: [],
      total: 0,
      offset: 0,
      length: 25,
      makeDirectoryDrawer: false,
      makeDirectoryDrawerLoading: false,
      makeDirectory: {
        name: ''
      },
      error: {},
      uploadDrawer: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      files({
        directory: this.directory,
        offset: this.offset,
        length: this.length,
        search: this.search
      }).then(response => {
        const { data, total } = response.data
        this.tableData = data
        this.total = total
        this.loading = false
      }).catch(reason => {
        this.loading = false
        this.tableData = []
        this.total = 0
      })
    },
    handleSizeChange(val) {
      this.length = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.offset = val
      this.getList()
    },
    checkSelect(row, index) {
      let isChecked = true
      isChecked = row.type === 'file'
      return isChecked
    },
    setPath(row, key) {
      if (row.type === 'file') {
        this.fileInfoDrawerData = row
        this.fileInfoDrawer = true
      } else if (row.type === 'path') {
        this.offset = 0
        this.length = 25
        this.directory = key === 0 ? '/' : '/' + row.name.slice(1, key + 1).join('/') + '/'
        this.getList()
      } else if (row.type === 'directory') {
        this.offset = 0
        this.length = 25
        this.directory = this.directory + row.name
        this.getList()
      }
    },
    handleSelectionChange(row) {
      const size = Cookies.get('size') || 'medium'
      const className = row.length === 0 ? 'is-disabled' : ''
      document.getElementById('el-button-disable').disabled = row.length === 0
      document.getElementById('el-button-disable').className = 'el-button el-button--default el-button--' + size + ' el-dropdown-selfdefine ' + className
      this.multipleSelection = row
    },
    download(row) {
      const loading = this.$loading({
        lock: true,
        text: 'Downloading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      fileDownload({
        file: row.name
      }).then(response => {
        loading.close()
        // 处理文档流
        const blob = new Blob([response])
        const eLink = document.createElement('a')
        eLink.download = row.pathinfo.basename
        eLink.style.display = 'none'
        eLink.href = URL.createObjectURL(blob)
        document.body.appendChild(eLink)
        eLink.click()
        URL.revokeObjectURL(eLink.href)
        document.body.removeChild(eLink)
      }).catch(reason => {
        loading.close()
        const response = reason.response
        Message({
          message: response.statusText,
          type: 'error',
          duration: 5 * 1000
        })
      })
    },
    fileDelete(row) {
      this.$confirm(this.$t('file.deleteFilesTipsText'), this.$t('common.tips'), {
        confirmButtonText: this.$t('common.confirmButtonText'),
        cancelButtonText: this.$t('common.cancelButtonText'),
        type: 'warning'
      }).then(() => {
        const paths = []
        paths.push(row.name)
        fileDelete({
          paths: paths
        }).then(response => {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.fileInfoDrawer = false
          this.getList()
        })
      }).catch(() => {

      })
    },
    directoryDelete(row) {
      this.$confirm(this.$t('file.deleteDirectoryTipsText'), this.$t('common.tips'), {
        confirmButtonText: this.$t('common.confirmButtonText'),
        cancelButtonText: this.$t('common.cancelButtonText'),
        type: 'warning'
      }).then(() => {
        this.loading = true
        directoryDelete({
          directory: this.directory + row.name
        }).then(response => {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.getList()
        }).catch(() => {
          this.getList()
        })
      }).catch(() => {

      })
    },
    downloadAll() {
      const { selection } = this.$refs.multipleTable.store.states
      selection.forEach(row => {
        this.download(row)
      })
    },
    fileDeleteAll() {
      this.$confirm(this.$t('file.deleteFilesTipsText'), this.$t('common.tips'), {
        confirmButtonText: this.$t('common.confirmButtonText'),
        cancelButtonText: this.$t('common.cancelButtonText'),
        type: 'warning'
      }).then(() => {
        this.loading = true
        const paths = []
        const { selection } = this.$refs.multipleTable.store.states
        selection.forEach(row => {
          paths.push(row.name)
        })
        fileDelete({
          paths: paths
        }).then(response => {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.fileInfoDrawer = false
          this.getList()
        })
      }).catch(() => {

      })
    },
    copy(data) {
      const url = data
      const oInput = document.createElement('input')
      oInput.value = url
      document.body.appendChild(oInput)
      oInput.select() // 选择对象;
      document.execCommand('Copy') // 执行浏览器复制命令
      this.$message({
        message: this.$t('common.copySuccess'),
        type: 'success'
      })
      oInput.remove()
    },
    makeDirectoryHandle() {
      this.makeDirectoryDrawerLoading = true
      makeDirectory({
        directory: this.directory + this.makeDirectory.name
      }).then(response => {
        this.$message({
          type: 'success',
          message: response.message
        })
        this.makeDirectoryDrawer = false
        this.makeDirectory.name = ''
        this.error = {}
        this.getList()
      }).catch(reason => {
        const { data } = reason.response
        if (data.code === 422) {
          this.error = data.data
        }
      }).finally(() => {
        this.makeDirectoryDrawerLoading = false
      })
    },
    handleClose(done) {
      this.getList()
      this.$refs.uploadFileRef.clearFiles()
      done()
    },
    rTime(row, column) {
      return rTime(row[column.property])
    }
  }
}
</script>

<style scoped>
  .oss-rc-icon-file {
    background-image: url(//img.alicdn.com/tfs/TB1K1YPXF9gSKJjSspbXXbeNXXa-150-150.png);
    background-repeat: no-repeat;
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;
    width: 24px;
    height: 24px;
    background-position: -30px 0;
  }

  @media (-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi) {
    .oss-rc-icon-file {
      background-image: url(//img.alicdn.com/tfs/TB1TzbNXGmgSKJjSsplXXaICpXa-300-300.png);
      background-size: 150px 150px;
    }
  }

  .oss-rc-icon-file.file-folder {
    background-position: 0 0;
  }

  .oss-rc-icon-file.file-png,
  .oss-rc-icon-file.file-jpg,
  .oss-rc-icon-file.file-bmp,
  .oss-rc-icon-file.file-webp,
  .oss-rc-icon-file.file-jpeg,
  .oss-rc-icon-file.file-gif {
    background-position: -60px 0;
  }

  .oss-rc-icon-file.file-mp4,
  .oss-rc-icon-file.file-mov,
  .oss-rc-icon-file.file-mkv,
  .oss-rc-icon-file.file-avi,
  .oss-rc-icon-file.file-vod,
  .oss-rc-icon-file.file-wmv,
  .oss-rc-icon-file.file-rmvb,
  .oss-rc-icon-file.file-rm,
  .oss-rc-icon-file.file-3gp {
    background-position: -90px 0;
  }

  .oss-rc-icon-file.file-mp3 {
    background-position: -120px 0;
  }

  .oss-rc-icon-file.file-pdf {
    background-position: 0 -30px;
  }

  .oss-rc-icon-file.file-doc,
  .oss-rc-icon-file.file-docx,
  .oss-rc-icon-file.file-pages {
    background-position: -30px -30px;
  }

  .oss-rc-icon-file.file-ppt,
  .oss-rc-icon-file.file-pptx,
  .oss-rc-icon-file.file-key {
    background-position: -60px -30px;
  }

  .oss-rc-icon-file.file-xls,
  .oss-rc-icon-file.file-xlsx,
  .oss-rc-icon-file.file-numbers {
    background-position: -90px -30px;
  }

  .oss-rc-icon-file.file-txt,
  .oss-rc-icon-file.file-log,
  .oss-rc-icon-file.file-ini {
    background-position: -120px -30px;
  }

  .oss-rc-icon-file.file-htm,
  .oss-rc-icon-file.file-html,
  .oss-rc-icon-file.file-css,
  .oss-rc-icon-file.file-scss,
  .oss-rc-icon-file.file-sass,
  .oss-rc-icon-file.file-less,
  .oss-rc-icon-file.file-java,
  .oss-rc-icon-file.file-js,
  .oss-rc-icon-file.file-jsx,
  .oss-rc-icon-file.file-json,
  .oss-rc-icon-file.file-groovy,
  .oss-rc-icon-file.file-h,
  .oss-rc-icon-file.file-c,
  .oss-rc-icon-file.file-cpp,
  .oss-rc-icon-file.file-go,
  .oss-rc-icon-file.file-py,
  .oss-rc-icon-file.file-lua,
  .oss-rc-icon-file.file-ts,
  .oss-rc-icon-file.file-tsx,
  .oss-rc-icon-file.file-xml,
  .oss-rc-icon-file.file-jsp,
  .oss-rc-icon-file.file-asp,
  .oss-rc-icon-file.file-php {
    background-position: 0 -60px;
  }

  .oss-rc-icon-file.file-jar,
  .oss-rc-icon-file.file-war,
  .oss-rc-icon-file.file-zip,
  .oss-rc-icon-file.file-tar,
  .oss-rc-icon-file.file-rar,
  .oss-rc-icon-file.file-gz,
  .oss-rc-icon-file.file-7z {
    background-position: -30px -60px;
  }

  .el-image {
    height: 400px;
    width: 100%;
  }

  .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #f5f7fa;
    color: #909399;
    font-size: 14px;
  }
</style>
