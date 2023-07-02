<template>
  <div class="chat">
    <ChatMessages ref="messagesRef" :messages="messages" />
    <ChatInput @send="onSend" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useMessages } from '@/composables/useMessages'
import type { Message } from '@/types/message'
import ChatMessages from '@/components/ChatMessages.vue'
import ChatInput from '@/components/ChatInput.vue'

const { messages, getMessages, sendMessage } = useMessages()

getMessages()

const messagesRef = ref()
const scrollRef = computed<HTMLElement>(() => messagesRef.value?.scrollRef)

const lastMessageId = computed(() => {
  return messages.value[messages.value.length - 1]?.id
})

const onSend = (message: Message) => {
  sendMessage(message)
}

const checkAndLoadMore = () => {
  if (scrollRef.value) {
    const { scrollHeight, clientHeight } = scrollRef.value
    if (scrollHeight <= clientHeight) getMessages()
  }
}

watch(lastMessageId, checkAndLoadMore, {
  flush: 'post',
})
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
