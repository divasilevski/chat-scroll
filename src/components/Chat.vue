<template>
  <div class="chat">
    <ChatMessages
      ref="messagesRef"
      :messages="messages"
      :status="status"
      @retry="onRetry"
    />
    <ChatInput @send="onSend" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, watchEffect, nextTick } from 'vue'
import { useMessages } from '@/composables/useMessages'
import { useHoldScroll } from '@/composables/useHoldScroll'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import { Status } from '@/types/status'
import type { Message } from '@/types/message'
import ChatMessages from '@/components/ChatMessages.vue'
import ChatInput from '@/components/ChatInput.vue'

const { messages, status, getMessages, sendMessage, cleanError } = useMessages()

const messagesRef = ref()
const scrollRef = computed<HTMLElement>(() => messagesRef.value?.scrollRef)

const lastMessageId = computed(() => {
  return messages.value[messages.value.length - 1]?.id
})

const onRetry = () => {
  cleanError()
  getMessages()
}

const onSend = (message: Message) => {
  sendMessage(message)

  nextTick(() => {
    scrollRef.value?.scrollTo({
      behavior: 'smooth',
      top: Infinity,
    })
  })
}

const checkAndLoadMore = () => {
  if (scrollRef.value) {
    const { scrollHeight, clientHeight } = scrollRef.value
    if (scrollHeight <= clientHeight) getMessages()
  }
}

useHoldScroll({ scrollRef, sources: [lastMessageId] })

const { disable, enable } = useInfiniteScroll({
  scrollRef,
  threshold: 300,
  loadMore: getMessages,
})

watchEffect(() => {
  status.value !== Status.Loading ? disable() : enable()
})

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
