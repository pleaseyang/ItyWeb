<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-col :span="24">
          <h2>在线人数: {{ count }}</h2>
        </el-col>
        <el-col id="chatRecord" :span="24" class="content padding-15">
          <el-col v-for="(item, index) in groupChat" :key="index" :span="24" :class="clientId === item.clientId ? 'text-right' : ''">
            <p>{{ item.name }} <small style="color: #909399">{{ rTime(item.created_at) }}</small></p>
            <p>{{ item.message }}</p>
          </el-col>
        </el-col>
        <el-col :span="24" class="padding-15">
          <el-col :span="18">
            <el-input
              ref="input"
              v-model="textarea"
              type="text"
              placeholder="请输入内容"
              autosize
              resize="none"
              maxlength="100"
              show-word-limit
              @keyup.enter.native="send"
            />
          </el-col>
          <el-col :span="5" :offset="1">
            <el-button type="primary" @click="send">Send</el-button>
          </el-col>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { rTime } from '@/utils'
import { getToken } from '@/utils/auth'
import store from '@/store'

export default {
  name: 'Websocket',
  data() {
    return {
      textarea: '',
      count: 0,
      clientId: 0,
      groupChat: []
    }
  },
  mounted() {
    const token = getToken()
    let language = 'en'
    switch (store.getters.language) {
      case 'zh':
        language = 'zh-CN'
        break
      default :
        language = 'en'
    }
    // WebSocket
    if ('WebSocket' in window) {
      const uri = process.env.VUE_APP_WEBSOCKET_API
      this.websocket = new WebSocket(`${uri}?lang=${language}&token=${token}`)
      this.initWebSocket()
    } else {
      this.$message.error('当前浏览器不支持websocket')
    }
  },
  beforeDestroy() {
    this.onbeforeunload()
  },
  methods: {
    initWebSocket() {
      // 连接错误
      this.websocket.onerror = this.setErrorMessage

      // 连接成功
      this.websocket.onopen = this.setOnopenMessage

      // 收到消息的回调
      this.websocket.onmessage = this.setOnmessageMessage

      // 连接关闭的回调
      this.websocket.onclose = this.setOncloseMessage

      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = this.onbeforeunload
    },
    setErrorMessage() {
      this.$message.error('WebSocket连接发生错误')
    },
    setOnopenMessage() {
      this.$message({
        message: '连接成功',
        type: 'success'
      })
      const sendMessage = {
        route: 'websocket.gc.online'
      }
      this.websocket.send(JSON.stringify(sendMessage))
      const sendMessage2 = {
        route: 'websocket.gc.chatRecord'
      }
      this.websocket.send(JSON.stringify(sendMessage2))
    },
    setOnmessageMessage(event) {
      // 根据服务器推送的消息做自己的业务处理
      const data = JSON.parse(event.data)
      if (data.type !== 'heart') {
        if (data.success === true) {
          const response = data.data
          switch (response.type) {
            case 'onWebSocketConnect':
              this.clientId = response.clientId
              break
            case 'online':
              this.count = response.count
              break
            case 'getChatRecord':
              this.groupChat = response.groupChat
              this.$nextTick(() => {
                const msg = document.getElementById('chatRecord') // 获取对象
                msg.scrollTop = msg.scrollHeight // 滚动高度
              })
              break
            case 'onClose':
              this.count = response.count
              break
            default :
          }
        } else {
          this.$message.error(data.message)
        }
      }
    },
    setOncloseMessage() {
      this.$message('连接关闭')
    },
    onbeforeunload() {
      this.closeWebSocket()
    },
    closeWebSocket() {
      this.websocket.close()
    },
    send() {
      if (this.textarea.length > 0) {
        const sendMessage = {
          route: 'websocket.gc.send',
          data: {
            message: this.textarea
          }
        }
        this.websocket.send(JSON.stringify(sendMessage))
        const sendMessage2 = {
          route: 'websocket.gc.chatRecord'
        }
        this.websocket.send(JSON.stringify(sendMessage2))
        this.textarea = ''
      } else {
        this.$refs.input.focus()
      }
    },
    rTime(column) {
      return rTime(column)
    }
  }
}
</script>

<style scoped>
  .content {
    background: rgb(245, 245, 245);
    overflow-y: scroll;
    overflow-x: hidden;
    height: 500px;
  }

  .padding-15 {
    padding: 15px;
  }

  .text-right {
    text-align: right;
  }
</style>
