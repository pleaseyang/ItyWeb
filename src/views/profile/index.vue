<template>
  <div class="app-container">
    <el-form ref="updateForm" :model="updateForm" label-width="auto" @submit.native.prevent>
      <el-form-item :label="$t('admin.name')" prop="name" :error="error.name ? error.name[0] : ''">
        <el-input v-model="updateForm.name" />
      </el-form-item>
      <el-form-item :label="$t('admin.email')" prop="email" :error="error.email ? error.email[0] : ''">
        <el-input v-model="updateForm.email" />
      </el-form-item>
      <el-form-item :label="$t('admin.password')" prop="password" :error="error.password ? error.password[0] : ''">
        <el-input v-model="updateForm.password" show-password :placeholder="$t('admin.emptyPasswordText')" />
      </el-form-item>
      <el-form-item>
        <table class="el-table" border="0" cellpadding="0" cellspacing="0">
          <colgroup>
            <col name="el-table_1_column_1" width="100">
            <col name="el-table_1_column_2" width="200">
            <col name="el-table_1_column_3" width="120">
            <col name="el-table_1_column_4" width="120">
            <col name="el-table_1_column_5" width="500">
          </colgroup>
          <thead>
            <tr>
              <th class="el-table_1_column_1 is-leaf el-table__cell" colspan="1" rowspan="1">
                <div class="cell">{{ $t('system.user.bindingInfo') }}</div>
              </th>
              <th class="el-table_1_column_2 is-leaf el-table__cell" colspan="1" rowspan="1">
                <div class="cell">{{ $t('system.user.detail') }}</div>
              </th>
              <th class="el-table_1_column_3 is-leaf el-table__cell" colspan="1" rowspan="1">
                <div class="cell">{{ $t('system.user.bindingTime') }}</div>
              </th>
              <th class="el-table_1_column_4 is-leaf el-table__cell" colspan="1" rowspan="1">
                <div class="cell">{{ $t('system.user.syncTime') }}</div>
              </th>
              <th class="el-table_1_column_5 is-leaf el-table__cell" colspan="1" rowspan="1">
                <div class="cell">{{ $t('table.actions') }}</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="el-table__row">
              <td class="el-table_1_column_1 el-table__cell" rowspan="1" colspan="1">
                <div class="cell">{{ $t('system.dingtalk.name') }}</div>
              </td>
              <td class="el-table_1_column_2 el-table__cell" rowspan="1" colspan="1">
                <div v-if="dingTalk !== null" class="cell">
                  <div class="userinfo">
                    <el-avatar class="avatar" size="small" :src="dingTalk.avatar" />
                    <span class="name">{{ dingTalk.name }}</span>
                  </div>
                </div>
                <div v-else class="cell">-</div>
              </td>
              <td class="el-table_1_column_3 el-table__cell" rowspan="1" colspan="1">
                <div v-if="dingTalk !== null" class="cell">
                  {{ dingTalk.created_at }}
                </div>
                <div v-else class="cell">-</div>
              </td>
              <td class="el-table_1_column_4 el-table__cell" rowspan="1" colspan="1">
                <div v-if="dingTalk !== null" class="cell">
                  {{ dingTalk.updated_at }}
                </div>
                <div v-else class="cell">-</div>
              </td>
              <td class="el-table_1_column_5 el-table__cell" rowspan="1" colspan="1">
                <div class="cell">
                  <div v-if="dingTalk !== null" class="cell">
                    <el-button type="default" @click="unbindDingTalk">
                      <svg-icon icon-class="dingtalk" />
                      {{ $t('system.dingtalk.unbind') }}
                    </el-button>
                  </div>
                  <div v-else class="cell">
                    <el-button type="default" @click="dingTalkBind">
                      <svg-icon icon-class="dingtalk" />
                      {{ $t('system.dingtalk.bind') }}
                    </el-button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onUpdate('updateForm')">{{ $t('common.submit') }}</el-button>
      </el-form-item>
    </el-form>
    <nav-setting />
  </div>
</template>

<script>
import { updateSelf } from '@/api/admin'
import { bindDingTalk, bindDingTalkUrl, dingTalkCheckState, dingTalkInfo, getInfo, unbindDingTalk } from '@/api/user'
import store from '@/store'
import { getQueryObject } from '@/utils'
export default {
  name: 'Profile',
  components: {
    navSetting: () => import('./nav/index')
  },
  data() {
    return {
      updateForm: {
        name: '',
        email: '',
        password: ''
      },
      formInline: {
        name: '',
        time: ''
      },
      error: {},
      dingTalk: null
    }
  },
  created() {
    this.dingTalkBindCallBack()
  },
  mounted() {
    this.getUser()
  },
  methods: {
    getUser() {
      getInfo().then(response => {
        const { data } = response
        this.updateForm.name = data.name
        this.updateForm.email = data.email
        this.getDingTalkInfo()
      })
    },
    onUpdate(formName) {
      this.error = {}
      if (this.updateForm.password === '') {
        delete this.updateForm.password
      }
      updateSelf(this.updateForm).then(response => {
        store.dispatch('user/name', this.updateForm.name)
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.updateVisible = false
      }).catch(reason => {
        const { data } = reason.response
        if (data.code === 422) {
          this.error = data.data
        }
      })
    },
    dingTalkBind() {
      bindDingTalkUrl().then(response => {
        window.location.href = response.data.url
      })
    },
    getDingTalkInfo() {
      dingTalkInfo().then(response => {
        this.dingTalk = response.data
      })
    },
    dingTalkBindCallBack() {
      const query = getQueryObject(window.location.href)
      if (Object.prototype.hasOwnProperty.call(query, 'authCode')) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        dingTalkCheckState({
          state: query.state.replace('#/profile/index', '')
        }).then(response => {
          const { check } = response.data
          if (check) {
            bindDingTalk({
              state: query.state.replace('#/profile/index', ''),
              code: query.authCode
            }).then(response => {
              this.$message({
                message: response.message,
                type: 'success'
              })
              this.getDingTalkInfo()
            }).finally(() => {
              loading.close()
            })
          } else {
            loading.close()
          }
        })
      }
    },
    unbindDingTalk() {
      unbindDingTalk().then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.getDingTalkInfo()
      })
    }
  }
}
</script>
<style>
.userinfo .avatar {
  position: relative;
}

.userinfo .name {
  position: absolute;
  left: 45px;
  top: 17px;
}
</style>
