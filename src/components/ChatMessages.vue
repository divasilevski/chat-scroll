<template>
  <div ref="scrollRef" class="chat-messages">
    <ChatMessage
      v-for="message in props.messages"
      :key="message.id"
      :text="message.text"
      :is-mine="message.isMine"
    />

    <ChatStatus>
      <span v-html="statusMessage" /><br />
      <a v-if="props.status === Status.Error" @click="$emit('retry')">
        Повторить попытку?
      </a>
    </ChatStatus>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Status } from '@/types/status'
import type { Message } from '@/types/message'
import ChatStatus from '@/components/ChatStatus.vue'
import ChatMessage from '@/components/ChatMessage.vue'

const props = defineProps({
  messages: {
    type: Array as () => Readonly<Message[]>,
    default: () => [],
  },
  status: {
    type: String as () => Status,
    default: Status.Loading,
  },
})

const statusMessages = {
  [Status.Finished]: 'Начало диалога',
  [Status.Loading]: 'Загрузка...',
  [Status.Error]: 'Не&nbsp;удалось загрузить сообщения.',
}

const statusMessage = computed(() => statusMessages[props.status])

const scrollRef = ref<HTMLElement>()

defineExpose({ scrollRef })
</script>

<style scoped>
.chat-messages {
  display: flex;
  flex-direction: column-reverse;
  flex: 1 1 0;
  overflow: hidden;
  overflow-y: auto;
  padding: 8px 0;
  scrollbar-gutter: stable;
}
</style>
