<template>
  <div class="editor">
    <div :id="`toolbar-container${id}`" />
    <div :id="`editor-container${id}`" />
  </div>
</template>

<script>
import { i18nChangeLanguage } from '@wangeditor/editor'
import { createEditor, createToolbar } from '@wangeditor/editor'
import { fileUploadFile, fileUploadImage } from '@/api/file'

export default {
  name: 'WangEditor',
  props: {
    id: {
      type: String,
      default: function() {
        return 'vue-wangeditor-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbarShow: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: 'default'
    },
    maxLength: {
      type: Number,
      default: 0
    },
    autoFocus: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    editorConfig: {
      type: Object,
      default: () => {
        return {}
      }
    },
    toolbarConfig: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      editor: null,
      languageTypeList: {
        'en': 'en',
        'zh': 'zh-CN'
      }
    }
  },
  computed: {
    language() {
      return this.languageTypeList[this.$store.getters.language]
    }
  },
  watch: {
    language() {
      this.destroyEditor()
      this.$nextTick(() => this.init())
    }
  },
  mounted() {
    this.init()
  },
  deactivated() {
    this.destroyEditor()
  },
  destroyed() {
    this.destroyEditor()
  },
  methods: {
    destroyEditor() {
      const editor = this.editor
      if (editor == null) return
      editor.destroy()
    },
    clear() {
      this.editor.clear()
    },
    init() {
      i18nChangeLanguage(this.languageTypeList[this.$store.getters.language])
      // 创建编辑器
      if (this.readOnly) {
        this.toolbarShow = false
      }
      this.editorConfig.readOnly = this.readOnly
      this.editorConfig.autoFocus = this.autoFocus
      this.editorConfig.maxLength = this.maxLength
      this.editorConfig.MENU_CONF = {}
      this.editorConfig.MENU_CONF['uploadImage'] = {
        async customUpload(file, insertFn) {
          const data = new FormData()
          data.append('image', file)
          fileUploadImage(data).then(response => {
            const { path = '' } = response.data
            insertFn(path, '', '')
          })
        }
      }
      this.editorConfig.MENU_CONF['uploadVideo'] = {
        async customUpload(file, insertFn) {
          const data = new FormData()
          data.append('file', file)
          fileUploadFile(data).then(response => {
            const { path = '' } = response.data
            insertFn(path, '', '')
          })
        }
      }
      this.editorConfig.onChange = (editor) => {
        this.$emit('input', editor.getHtml())
      }
      const editor = createEditor({
        selector: `#editor-container${this.id}`,
        config: this.editorConfig,
        mode: this.mode
      })
      this.editor = Object.seal(editor)
      if (this.toolbarShow) {
        createToolbar({
          editor,
          selector: `#toolbar-container${this.id}`,
          config: this.toolbarConfig,
          mode: this.mode // 或 'simple' 参考下文
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
