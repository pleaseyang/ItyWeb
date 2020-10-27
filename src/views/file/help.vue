<template>
  <div>
    <el-alert
      :closable="false"
      type=""
    >
      <template slot>
        {{ $t('file.help.title') }}：
        <ol>
          <li>{{ $t('file.help.li1') }}</li>
          <li><el-tag type="danger">/</el-tag> {{ $t('file.help.li2.text1') }} <el-tag type="danger">/</el-tag> {{ $t('file.help.li2.text2') }} <el-tag type="danger">\</el-tag> {{ $t('file.help.li2.text3') }} <el-tag type="danger">/</el-tag></li>
          <li>{{ $t('file.help.li3.text1') }} <el-tag type="danger">..</el-tag> {{ $t('file.help.li3.text2') }}</li>
          <li>{{ $t('file.help.li4') }}</li>
        </ol>
      </template>
    </el-alert>
  </div>
</template>

<script>
export default {
  name: 'Help'
}
</script>

<style scoped>
  .el-alert{padding: 0!important;color: #888}
  ol {margin: 0}
</style>
