<template>
  <div style="background-color: aliceblue;">
    <div id="chatWhole">
      <div id="messageWhole">
        <div v-for="(message, index) in messages" :key="index" :class="message.sender">
          <div class="messageContent">
            <!-- 使用 v-html 渲染消息内容 -->
            <p v-html="formatMessage(message.content)"></p>
          </div>
        </div>
      </div>
      <div id="inputDiv">
        <textarea id="inputIn" placeholder="输入您的消息..." v-model="userMessage" @keydown.enter="handleEnter"></textarea>
        <button id="send" @click="sendMessage" :disabled="isSending">发送</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const messages = ref([]);
const userMessage = ref('');
const isSending = ref(false);

function sendMessage() {
  if (userMessage.value.trim() !== '' && !isSending.value) {
    isSending.value = true;
    messages.value.push({ sender: 'user', content: userMessage.value });
    console.log('userMessage: ' , userMessage.value);
    userMessage.value = '';
    setTimeout(() => {
      messages.value.push({ sender: 'robot', content: '自动回复' });
      isSending.value = false;
    }, 1000);
  }
}

function handleEnter(event) {
  if (event.shiftKey || isSending.value) {
    // 如果同时按下了 Shift 键或者回答还未发送过来，允许回车键换行
    return;
  }
  // 如果 isSending 为 false，调用 sendMessage 函数
  event.preventDefault();
  sendMessage();
}

// 格式化消息内容，将换行符转换为 <br> 标签
function formatMessage(content) {
  return content.replace(/\n/g, '<br>');
}
</script>

<style lang="scss">
#chatWhole {
  padding: 20px;
  border-top: 1px solid #eee;
  background: hsla(0, 0%, 100%, .4);

  #messageWhole {
    padding-bottom: 20px;
    overflow-y: scroll;
    /* max-height: 300px; */
    height: 300px;

    .messageContent {
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 10px;
    }
  }

  /* Style scrollbar (for message container) */
  #messageWhole::-webkit-scrollbar {
    width: 12px;
  }

  #messageWhole::-webkit-scrollbar-track {
    background-color: #f5f5f5;
  }

  #messageWhole::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 6px;
  }
}

.robot .messageContent {
  background-color: #f5f5f5;
}

.user .messageContent {
  background-color: #d6eef8;
}


#inputDiv {
  display: flex;
  margin-top: 20px;

  #inputIn {
    flex-grow: 1;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }

  #send {
    padding: 10px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 4px;
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>