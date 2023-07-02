<template>
  <div ref="scrollRef" class="chat-messages">
    <ChatMessage text="lol" />
    <ChatMessage text="lol" :is-mine="true" />
    <ChatMessage text="lol" />

    <ChatStatus>Загрузка...</ChatStatus>
  </div>
</template>

<script lang="ts" setup>
import ChatStatus from '@/components/ChatStatus.vue'
import ChatMessage from '@/components/ChatMessage.vue'
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
