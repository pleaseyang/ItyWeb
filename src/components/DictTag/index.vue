<template>
  <el-tag v-if="dictDataTag.list_class" :type="dictDataTag.list_class">
    {{ dictDataTag.label }}
  </el-tag>
  <span v-else>
    {{ dictDataTag.label }}
  </span>
</template>

<script>
export default {
  name: 'DictTag',
  props: {
    dictTypeId: {
      type: Number,
      default: 0,
      required: true
    },
    dictData: {
      type: Array,
      default: () => {
        return []
      },
      required: true
    },
    value: {
      type: [String, Number],
      default: null,
      required: true
    }
  },
  data() {
    return {
      dictDataTag: {
        default: 0,
        dict_type_id: this.dictTypeId,
        label: '',
        list_class: null,
        sort: 0,
        value: ''
      }
    }
  },
  watch: {
    value() {
      this.set()
    }
  },
  created() {
    this.set()
  },
  methods: {
    set() {
      const value = this.value.toString()
      let dictData = this.dictData.filter((e) => e.dict_type_id === this.dictTypeId).find((e) => e.value === value)
      if (dictData === undefined) {
        dictData = {
          default: 0,
          dict_type_id: this.dictTypeId,
          label: value,
          list_class: null,
          sort: 0,
          value: value
        }
      }
      this.dictDataTag = dictData
    }
  }
}
</script>

<style scoped>

</style>
