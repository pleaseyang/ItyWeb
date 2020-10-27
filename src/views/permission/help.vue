<template>
  <div>
    <div>{{ $t('permission.name') }}：{{ $t('permission.help.nameText') }}</div>
    <div>{{ $t('permission.path') }}：{{ $t('permission.help.pathText') }}</div>
    <div>
      {{ $t('permission.component') }}：{{ $t('permission.help.componentText') }}
      <div class="margin-l">{{ $t('permission.help.componentText1') }} <el-tag effect="plain" size="mini">layout/Layout</el-tag></div>
      <div class="margin-l">{{ $t('permission.help.componentText2') }} <el-tag effect="plain" size="mini">rview</el-tag></div>
    </div>
    <div>{{ $t('permission.hidden') }}：{{ $t('permission.help.nav') }}</div>
    <el-divider content-position="left" />
    <div>{{ $t('permission.help.proposal') }}：</div>
    <div>{{ $t('permission.help.proposalText') }}</div>
    <div>
      {{ $t('permission.help.example') }}：{{ $t('permission.help.exampleText') }}
      <div>
        <div class="margin-s-l">{{ $t('permission.name') }}：<el-tag effect="plain" size="mini">permission.create</el-tag></div>
        <div class="margin-s-l">{{ $t('permission.path') }}：<el-tag effect="plain" size="mini">permission/create</el-tag></div>
        <div class="margin-s-l">{{ $t('permission.component') }}：<el-tag effect="plain" size="mini">permission/create</el-tag></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Help'
}
</script>

<style scoped>
  .margin-l{
    margin-top: 2px;
    margin-left: 60px;
  }
  .margin-s-l{
    margin-top: 2px;
    margin-left: 24px;
  }
</style>
