<template>
  <el-dialog
    top="30px"
    :title="$t('common.details')"
    :visible.sync="notificationInfoShow"
  >
    <el-form label-position="top">
      <el-form-item :label="$t('notification.form')">
        {{ notificationInfoData.data ? notificationInfoData.data.form : '' }}
      </el-form-item>
      <el-form-item :label="$t('notification.message')">
        <WangEditor ref="contentEditor" v-model="content" read-only />
      </el-form-item>
      <el-form-item :label="$t('common.createdAt')">
        {{ rTime(notificationInfoData.created_at) }}
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { notification, unReadCount } from '@/api/notification'
import { rTime } from '@/utils'

export default {
  name: 'Info',
  components: {
    WangEditor: () => import('@/components/WangEditor')
  },
  data() {
    return {
      notificationInfoShow: false,
      notificationInfoData: {},
      content: ''
    }
  },
  methods: {
    rTime(column) {
      return rTime(column)
    },
    notificationId(id) {
      notification({
        id: id
      }).then(response => {
        this.notificationInfoShow = true
        this.notificationInfoData = response.data.item
        this.content = this.notificationInfoData.data ? this.notificationInfoData.data.message : ''
        unReadCount().then(response2 => {
          const { count } = response2.data
          this.$emit('notificationCount', count)
        })
        this.$emit('getNotifications')
      })
    }
  }
}
</script>

<style scoped>

</style>
