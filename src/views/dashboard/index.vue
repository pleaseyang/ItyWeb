<template>
  <div />
</template>
<script>
import { createSocket, sendWSPush } from '@/utils/websocket'
export default {
  name: 'Dashboard',
  created() {
    createSocket()
  }
}
</script>
