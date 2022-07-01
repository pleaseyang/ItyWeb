<template>
  <el-dialog
    :visible.sync="dialogVisible"
    modal-append-to-body
    append-to-body
    center
    :close-on-click-modal="false"
    @close="close"
  >
    <template slot="title">
      <i class="el-icon-circle-plus-outline" /> {{ $t('common.create') }}
    </template>
    <el-form ref="form" :model="form" label-position="top" @submit.native.prevent="handleCreate">
      <el-form-item label="创建管理员" prop="admin_id" class="form-item-required" :error="error.admin_id">
        <el-select v-if="dictTypeSelectData.length > 0" v-model="form.admin_id" clearable filterable>
          <el-option
            v-for="item in dictTypeSelectData"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="姓名" prop="name" class="form-item-required" :error="error.name">
        <el-input v-model="form.name" clearable />
      </el-form-item>
      <el-form-item label="头像" prop="avatar" :error="error.avatar">
        <el-upload
          ref="avatar"
          class="avatar-uploader"
          action="#"
          accept="image/*"
          name="image"
          :limit="1"
          :show-file-list="false"
          :http-request="uploadAvatarImage"
        >
          <el-image v-if="form.avatar" class="avatar" :src="form.avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="性别" prop="sex" class="form-item-required" :error="error.sex">
        <el-select v-if="dict.length > 0" v-model="form.sex" clearable filterable>
          <el-option
            v-for="item in dict.filter((e) => e.dict_type_id === 43)"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="自我介绍" prop="content" :error="error.content">
        <WangEditor ref="contentEditor" v-model="form.content" />
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday_at" :error="error.birthday_at">
        <el-date-picker
          v-model="form.birthday_at"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          time-arrow-control
        />
      </el-form-item>
      <el-form-item label="学号" prop="number" class="form-item-required" :error="error.number">
        <el-input-number v-model="form.number" clearable />
      </el-form-item>
      <el-form-item label="是不是三好学生" prop="sgood" class="form-item-required" :error="error.sgood">
        <el-select v-model="form.sgood">
          <el-option :key="1" :value="1" :label="$t('common.yes')" />
          <el-option :key="0" :value="0" :label="$t('common.no')" />
        </el-select>
      </el-form-item>
      <el-form-item label="档案word" prop="dangan" :error="error.dangan">
        <el-upload
          ref="dangan"
          action="#"
          accept="application/msword,application/pdf,text/plain,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,video/*"
          name="file"
          :limit="1"
          :file-list="danganFileList"
          :http-request="uploadDanganFile"
          :on-exceed="danganUploadExceed"
          :on-remove="danganUploadRemove"
        >
          <el-button type="primary">{{ $t('file.uploadFileText.uploadText2') }}</el-button>
          <div slot="tip" class="el-upload__tip">{{ $t('common.uploadTip') }}</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" native-type="submit">{{ $t('common.submit') }}</el-button>
        <el-button @click="resetForm()">{{ $t('common.reset') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { dictTypeSelect } from '@/api/dictTypeApi'
import { testDbCreate } from '@/api/testDbApi'
import { dictDataSelect } from '@/api/dict'
import { fileRemoveFile, fileUploadFile, fileUploadImage } from '@/api/file'

export default {
  name: 'testDb.create',
  components: {
    WangEditor: () => import('@/components/WangEditor')
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        admin_id: '',
        name: '',
        avatar: '',
        sex: '0',
        content: '',
        birthday_at: '',
        number: '',
        sgood: 0,
        dangan: ''
      },
      danganFileList: [],
      dictTypeSelectData: [],
      dict: [],
      error: {},
      loading: false
    }
  },
  methods: {
    init() {
      this.dialogVisible = true
      this.getDictTypeSelect()
      this.getDictData()
    },
    close() {
      this.resetForm()
    },
    resetForm() {
      this.$refs.contentEditor.clear()
      this.$refs.avatar.clearFiles()
      this.$refs.dangan.clearFiles()
      this.$refs.form.resetFields()
    },
    handleCreate() {
      this.loading = true
      this.error = {}
      testDbCreate(this.form).then(response => {
        this.$message({
          showClose: true,
          message: response.message,
          type: 'success'
        })
        this.resetForm()
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
    uploadAvatarImage(file) {
      const deleteImage = this.form.avatar
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const data = new FormData()
      data.append(file.filename, file.file)
      fileUploadImage(data).then(response => {
        const { path = '' } = response.data
        this.form.avatar = path
        this.$message({ type: 'success', message: response.message })
      }).finally(_ => {
        loading.close()
        this.$refs.avatar.clearFiles()
        if (deleteImage) {
          fileRemoveFile({
            path: deleteImage
          })
        }
      })
    },
    uploadDanganFile(file) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const data = new FormData()
      data.append(file.filename, file.file)
      fileUploadFile(data).then(response => {
        const { path = '' } = response.data
        this.form.dangan = path
        this.$message({ type: 'success', message: response.message })
      }).finally(_ => {
        loading.close()
      })
    },
    danganUploadExceed(files, fileList) {
      this.$message({
        type: 'error',
        message: fileList[0].name + ' ' + this.$t('common.alreadyUpload')
      })
    },
    danganUploadRemove(file, fileList) {
      fileRemoveFile({
        path: this.form.dangan
      })
    },
    getDictTypeSelect() {
      dictTypeSelect().then(response => {
        const { select = [] } = response.data
        this.dictTypeSelectData = select
      })
    },
    getDictData() {
      dictDataSelect().then(response => {
        const { select = [] } = response.data
        this.dict = select
      })
    }
  }
}
</script>

<style scoped>

</style>
