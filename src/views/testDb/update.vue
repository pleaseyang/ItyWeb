<template>
  <el-dialog
    :visible.sync="dialogVisible"
    modal-append-to-body
    append-to-body
    center
    :close-on-click-modal="false"
  >
    <template slot="title">
      <i class="el-icon-edit-outline" /> {{ $t('common.update') }}
    </template>
    <el-form ref="form" :model="form" label-position="top" @submit.native.prevent="handleUpdate">
      <el-form-item label="name" prop="name" class="form-item-required" :error="error.name">
        <el-input v-model="form.name" clearable />
      </el-form-item>
      <el-form-item label="avatar" prop="avatar" :error="error.avatar">
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
      <el-form-item label="dangan" prop="dangan" :error="error.dangan">
        <el-upload
          ref="dangan"
          action="#"
          accept="application/msword,application/pdf,text/plain,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,video/*"
          name="file"
          :limit="1"
          :file-list="danganFileList"
          :http-request="uploadDanganFile"
          :on-exceed="danganUploadExceed"
        >
          <el-button type="primary">{{ $t('file.uploadFileText.uploadText2') }}</el-button>
          <div slot="tip" class="el-upload__tip">{{ $t('common.uploadTip') }}</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="sex" prop="sex" :error="error.sex">
        <el-select v-if="dict.length > 0" v-model="form.sex" clearable filterable>
          <el-option
            v-for="item in dict.filter((e) => e.dict_type_id === 43)"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="birthday_at" prop="birthday_at" :error="error.birthday_at">
        <el-date-picker
          v-model="form.birthday_at"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          time-arrow-control
        />
      </el-form-item>
      <el-form-item label="admin_id" prop="admin_id" :error="error.admin_id">
        <el-select v-if="dictTypeSelectData.length > 0" v-model="form.admin_id" clearable filterable>
          <el-option
            v-for="item in dictTypeSelectData"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="number" prop="number" :error="error.number">
        <el-input v-model="form.number" clearable />
      </el-form-item>
      <el-form-item label="sgood" prop="sgood" :error="error.sgood">
        <el-select v-model="form.sgood">
          <el-option :key="1" :value="1" :label="$t('common.yes')" />
          <el-option :key="0" :value="0" :label="$t('common.no')" />
        </el-select>
      </el-form-item>
      <el-form-item label="content" prop="content" :error="error.content">
        <WangEditor ref="contentEditor" v-model="form.content" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" native-type="submit">{{ $t('common.submit') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { fileUploadFile, fileUploadImage } from '@/api/file'
import { dictDataSelect } from '@/api/dict'
import { dictTypeSelect } from '@/api/dictTypeApi'
import { testDbInfo, testDbUpdate } from '@/api/testDbApi'

export default {
  name: 'testDb.update',
  components: {
    WangEditor: () => import('@/components/WangEditor')
  },
  data() {
    return {
      dialogVisible: false,
      form: {},
      dict: [],
      dictTypeSelectData: [],
      danganFileList: [],
      error: {},
      loading: false
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
      testDbInfo({
        id: id
      }).then(response => {
        this.form = response.data
        this.form.sex = this.form.sex.toString()
        this.danganFileList = [{
          name: this.form.dangan,
          url: this.form.dangan
        }]
        this.dialogVisible = true
        this.getDictData()
        this.getDictTypeSelect()
      }).finally(_ => {
        loading.close()
      })
    },
    getDictData() {
      dictDataSelect().then(response => {
        const { select = [] } = response.data
        this.dict = select
      })
    },
    getDictTypeSelect() {
      dictTypeSelect().then(response => {
        const { select = [] } = response.data
        this.dictTypeSelectData = select
      })
    },
    uploadAvatarImage(file) {
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
        this.$refs.avatar.clearFiles()
      })
    },
    danganUploadExceed(files, fileList) {
      this.$message({
        type: 'error',
        message: fileList[0].name + ' ' + this.$t('common.alreadyUpload')
      })
    },
    handleUpdate() {
      this.loading = true
      this.error = {}
      testDbUpdate(this.form).then(response => {
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
    }
  }
}
</script>

<style scoped>

</style>
