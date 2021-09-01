<template>
  <el-row>
    <el-col :span="24">
      <el-table
        v-loading="loading"
        :data="data"
        stripe
      >
        <el-table-column>
          <template slot="header">
            <el-alert :title="$t('admin.navSetting.refresh')" type="warning" :closable="false" />
          </template>
          <template slot-scope="scope">
            <e-icon :icon-name="scope.row.icon" />
            {{ $t('route.' + scope.row.name) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('admin.navSetting.cache')">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.no_cache" @change="cacheChange" />
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header">
            {{ $t('admin.navSetting.affix') }}
            <el-tooltip class="item" effect="dark" :content="$t('admin.navSetting.need')" placement="top">
              <i class="el-icon-question" />
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-switch v-model="scope.row.affix" @change="affixChange" />
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import { nav, navSetAffix, navSetNoCache } from '@/api/admin'

export default {
  data() {
    return {
      loading: false,
      data: []
    }
  },
  mounted() {
    this.get()
  },
  methods: {
    get() {
      this.loading = true
      nav().then(response => {
        const { list } = response.data
        this.data = list
      }).catch(() => {
        this.data = []
      }).finally(() => {
        this.loading = false
      })
    },
    cacheChange() {
      const data = this.data.map(function(e) {
        const json = {}
        json.name = e.name
        json.no_cache = e.no_cache
        return json
      })
      navSetNoCache({
        data: data
      }).then(response => {
        this.$notify({
          message: response.message,
          type: 'success'
        })
      })
    },
    affixChange() {
      const data = this.data.map(function(e) {
        const json = {}
        json.name = e.name
        json.affix = e.affix
        return json
      })
      navSetAffix({
        data: data
      }).then(response => {
        this.$notify({
          message: response.message,
          type: 'success'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
