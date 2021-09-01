<template>
  <div class="app-container">
    <el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <el-button
            v-permission="'permission.create'"
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="createVisible = true"
          >{{ $t('common.create') }}
          </el-button>
        </el-col>
        <el-col :span="20">
          <el-input
            v-model="filterText"
            :placeholder="$t('permission.keywords')"
          />
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-refresh" @click="getTree" />
        </el-col>
      </el-row>
      <el-col :span="24" class="margin-t-5">
        <el-tooltip :content="$t('permission.startSortText')" placement="left">
          <el-switch
            v-model="sort"
            v-permission="'permission.update'"
            class="fr"
            :active-text="$t('permission.sort')"
            @change="sortHandle"
          />
        </el-tooltip>
      </el-col>
      <el-col :span="24" class="margin-t-5">
        <div class="block">
          <el-tree
            ref="tree"
            v-loading="loading"
            :empty-text="$t('common.emptyText')"
            :data="data"
            :props="defaultProps"
            node-key="id"
            :default-expand-all="expand"
            :filter-node-method="filterNode"
            :expand-on-click-node="false"
            :draggable="sort"
            @node-drop="handleDrop"
          >
            <span
              slot-scope="{
                node,
                // eslint-disable-next-line vue/no-template-shadow
                data
              }"
              class="custom-tree-node"
            >
              <span><e-icon :icon-name="data.icon" /> {{ node.label }} <small class="color-909">{{ data.name }}</small></span>
              <span>
                <el-button
                  v-permission="'permission.create'"
                  type="text"
                  size="mini"
                  @click="() => createSubPermission(data)"
                >
                  {{ $t('permission.addSon') }}
                </el-button>
                <el-button
                  v-permission="'permission.update'"
                  type="text"
                  size="mini"
                  @click="() => update(data)"
                >
                  {{ $t('common.update') }}
                </el-button>
                <el-popconfirm
                  v-permission="'permission.delete'"
                  :title="$t('common.confirmDelete')"
                  :confirm-button-text="$t('common.confirmButtonText')"
                  :cancel-button-text="$t('common.cancelButtonText')"
                  @onConfirm="remove(data)"
                >
                  <el-button
                    slot="reference"
                    type="text"
                    size="mini"
                  >
                    {{ $t('common.delete') }}
                  </el-button>
                </el-popconfirm>
              </span>
            </span>
          </el-tree>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      v-el-drag-dialog
      title="add"
      :visible.sync="createVisible"
    >
      <template slot="title">
        {{ $t('common.create') }}
        <el-popover
          placement="right"
          width="400"
          trigger="click"
        >
          <el-alert
            :closable="false"
            type="info"
            show-icon
          >
            <template slot>
              <help />
            </template>
          </el-alert>
          <el-button slot="reference" type="text" icon="el-icon-edit">
            {{ $t('common.help') }}
          </el-button>
        </el-popover>
      </template>
      <create :success="success" :pid="pid" />
    </el-dialog>
    <el-dialog
      v-el-drag-dialog
      title="add"
      :visible.sync="updateVisible"
    >
      <template slot="title">
        {{ $t('common.update') }}
        <el-popover
          placement="right"
          width="400"
          trigger="click"
        >
          <el-alert
            :closable="false"
            type="info"
            show-icon
          >
            <template slot>
              <help />
            </template>
          </el-alert>
          <el-button slot="reference" type="text" icon="el-icon-edit">{{ $t('common.help') }}</el-button>
        </el-popover>
      </template>
      <update :id="updateId" :success="success" />
    </el-dialog>
  </div>
</template>
<script>
import { tree, deleted, drop } from '@/api/permission'
import create from './create'
import update from './update'
import help from './help'

export default {
  name: 'Permissions',
  components: {
    create,
    update,
    help
  },
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      filterText: '',
      loading: true,
      createVisible: false,
      pid: 0,
      updateId: 0,
      updateVisible: false,
      sort: false,
      expand: true
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.getTree()
  },
  methods: {
    getTree() {
      this.loading = true
      this.data = []
      tree({
        'guard_name': 'admin'
      }).then(response => {
        this.loading = false
        this.data = response.data.tree
      }).catch(reason => {
        this.loading = false
      })
    },
    success() {
      this.pid = 0
      this.updateId = 0
      this.createVisible = false
      this.updateVisible = false
      this.getTree()
    },

    update(data) {
      const { id } = data
      this.updateId = id
      this.updateVisible = true
    },

    createSubPermission(data) {
      this.pid = data.id
      this.createVisible = true
    },

    remove(data) {
      const { id } = data
      deleted({
        id: id
      }).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.getTree()
      })
    },

    filterNode(value, data) {
      if (!value) return true
      return data.title.indexOf(value) !== -1
    },

    // 拖拽成功完成时触发的事件
    handleDrop(draggingNode, dropNode, dropType, ev) {
      drop({
        'dragging': draggingNode.key,
        'drop': dropNode.key,
        'type': dropType
      }).then(response => {
        this.getTree()
        this.$message({
          message: response.message,
          type: 'success'
        })
      })
    },

    sortHandle(value) {
      this.sort = value
    }
  }
}
</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
