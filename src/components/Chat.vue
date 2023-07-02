<template>
  <div class="chat">
    <ChatMessages />
    <ChatInput />
  </div>
</template>

<script lang="ts" setup>
import ChatMessages from '@/components/ChatMessages.vue'
import ChatInput from '@/components/ChatInput.vue'
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
