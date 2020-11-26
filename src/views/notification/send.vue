<template>
  <div class="app-container">
    <el-row>
      <el-col v-loading="loading" :span="24">
        <el-form ref="form" :model="form" label-position="top">
          <el-form-item :label="$t('notification.sender')">
            <el-select
              v-model="form.admins"
              filterable
              style="width: 100%"
              clearable
              multiple
              @change="selectChange"
            >
              <el-option
                v-for="item in admins"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('notification.message')" :error="error.message ? error.message[0] : ''">
            <Tinymce ref="editor" v-model="form.message" :height="400" :editor-image="false" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="send">{{ $t('notification.send') }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { admins, send } from '@/api/notification'
export default {
  name: 'NotificationSend',
  components: { Tinymce },
  data() {
    return {
      form: {
        message: '',
        admins: ['all']
      },
      admins: [{
        id: 'all', name: this.$t('notification.all')
      }],
      error: [],
      loading: false
    }
  },
  mounted() {
    this.getAdmins()
  },
  methods: {
    keydown(e) {
      console.log(e)
    },
    selectChange(admins) {
      if (admins.length === 0) {
        this.form.admins = ['all']
      }
    },
    getAdmins() {
      admins().then(response => {
        const { admins } = response.data
        admins.unshift({
          id: 'all', name: this.$t('notification.all')
        })
        this.admins = admins
      })
    },
    send() {
      this.loading = true
      let admins = []
      const all = this.form.admins.indexOf('all')
      if (all < 0) {
        admins = this.form.admins
      }
      send({
        admins: admins,
        message: this.form.message
      }).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.form = {
          message: '',
          admins: ['all']
        }
        // 只有这样才能清空
        this.$refs.editor.setContent('')
        this.loading = false
      }).catch(reason => {
        if (reason.response.status === 422) {
          const { data } = reason.response.data
          this.error = data
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
