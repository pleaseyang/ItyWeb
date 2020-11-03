<template>
  <el-row>
    <el-col :span="24" class="app-container over-flow" :style="{ height: offsetHeight + 'px'}">
      <el-form label-position="top" label-width="80px" :model="upload">
        <el-form-item :label="$t('file.directoryName')">
          <el-radio-group v-model="upload.radio1">
            <el-radio :label="1" border>{{ $t('file.uploadFileText.currentDirectory') }}</el-radio>
            <el-radio :label="2" border>{{ $t('file.uploadFileText.specifyDirectory') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label-width="0" :error="upload.radio1 === 2 && error.directory ? error.directory[0] : ''">
          <span v-if="upload.radio1 === 1">
            {{ directory }}
          </span>
          <span v-if="upload.radio1 === 2">
            <help />
            <el-input
              v-model="upload.name"
              class="margin-t-10"
              type="text"
              :placeholder="$t('file.uploadFileText.rootDirectory')"
              minlength="1"
              maxlength="60"
              show-word-limit
            />
          </span>
        </el-form-item>
        <el-form-item :label="$t('file.uploadFile')">
          <el-upload
            ref="upload"
            class="upload-container"
            drag
            :headers="headers"
            :action="action"
            :data="uploadData"
            :file-list="fileList"
            :before-upload="beforeUpload"
            :on-success="successUpload"
            :on-remove="removeUpload"
            :on-error="errorUpload"
            multiple
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">{{ $t('file.uploadFileText.uploadText1') }}<em>{{ $t('file.uploadFileText.uploadText2') }}</em></div>
            <div slot="tip" class="el-upload__tip">
              <el-alert
                style="padding: 0;color: #888"
                :closable="false"
                type=""
              >
                <template slot>
                  {{ $t('file.uploadFileText.help.title') }}：
                  <ol style="margin: 0">
                    <li>{{ $t('file.uploadFileText.help.li1') }}</li>
                    <li>{{ $t('file.uploadFileText.help.li2') }}</li>
                    <li>{{ $t('file.uploadFileText.help.li3') }}</li>
                    <li>{{ $t('file.uploadFileText.help.li4.text1') }}
                      <el-tag type="danger">/</el-tag>
                      {{ $t('file.uploadFileText.help.li4.text2') }}
                      <el-tag type="danger">\</el-tag>
                      {{ $t('file.uploadFileText.help.li4.text3') }}
                    </li>
                  </ol>
                </template>
              </el-alert>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-alert :closable="false" :title="$t('file.uploadFileText.warnText')" type="warning" show-icon />
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import help from '@/views/file/help'
import { getToken } from '@/utils/auth'
import { fileDelete } from '@/api/file'

export default {
  name: 'UploadFile',
  components: {
    help
  },
  props: {
    directory: {
      type: String,
      default: '/',
      required: true
    }
  },
  data() {
    return {
      upload: {
        name: '',
        radio1: 1
      },
      offsetHeight: 0,
      headers: {},
      action: '',
      uploadData: {},
      fileList: [],
      error: {}
    }
  },
  mounted() {
    this.offsetHeight = document.body.offsetHeight
    this.setHeader()
    this.setAction()
    this.clearFiles()
  },
  methods: {
    setHeader() {
      let lang = 'en'
      switch (this.$store.getters.language) {
        case 'zh':
          lang = 'zh-CN'
          break
        default :
          lang = 'en'
      }
      this.headers = {
        Authorization: 'Bearer ' + getToken(),
        Lang: lang
      }
    },
    setAction() {
      this.action = process.env.VUE_APP_BASE_API + '/file/upload'
    },
    beforeUpload(file) {
      let directory
      if (this.upload.radio1 === 1) {
        directory = this.directory
      } else if (this.upload.radio1 === 2) {
        directory = this.upload.name === '' ? '/' : '/' + this.upload.name
      } else {
        directory = '/'
      }
      this.uploadData.directory = directory
      this.uploadData.name = file.name
    },
    successUpload(response, file, fileList) {
      // 上传成功
    },
    errorUpload(err, file, fileList) {
      const response = JSON.parse(err.message)
      this.$message.error(response.message)
      this.error = response.data
    },
    removeUpload(file, fileList) {
      const path = '/' + file.response.data.path
      const paths = []
      paths.push(path)
      fileDelete({
        paths: paths
      }).then(response => {

      })
    },
    clearFiles() {
      this.$refs.upload.clearFiles()
    }
  }
}
</script>

<style scoped>
  .over-flow{
    overflow-x: auto;
    overflow-y: auto;
  }
</style>
