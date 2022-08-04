<template>
  <span>{{ string }}</span>
</template>

<script>
export default {
  name: 'ForeignString',
  props: {
    column: {
      type: String,
      default: null,
      required: true
    },
    show: {
      type: String,
      default: null,
      required: true
    },
    data: {
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
      string: ''
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
      const string = []
      const data = this.data.find((e) => e[this.column].toString() === this.value.toString())
      if (data && this.show) {
        const showColumns = this.show.split(',')
        showColumns.forEach(e => {
          if (data[e]) {
            string.push(data[e])
          }
        })
      }
      this.string = string.toString()
    }
  }
}
</script>

<style scoped>

</style>
