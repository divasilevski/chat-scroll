<template>
  <div class="chat">
    <ChatMessages />
    <ChatInput @send="onSend" />
  </div>
</template>

<script lang="ts" setup>
import type { Message } from '@/types/message'
import ChatMessages from '@/components/ChatMessages.vue'
import ChatInput from '@/components/ChatInput.vue'

const onSend = (message: Message) => {
  console.log(message)
}
</script>

<style scoped>
.chat {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
}
</style>
