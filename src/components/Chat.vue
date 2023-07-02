<template>
  <div class="chat">
    <ChatMessages :messages="messages" />
    <ChatInput @send="onSend" />
  </div>
</template>

<script lang="ts" setup>
import { useMessages } from '@/composables/useMessages'
import type { Message } from '@/types/message'
import ChatMessages from '@/components/ChatMessages.vue'
import ChatInput from '@/components/ChatInput.vue'

const { messages, getMessages, sendMessage } = useMessages()

const onSend = (message: Message) => {
  sendMessage(message)
}

getMessages()
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
