<template>
  <div class="chat-input">
    <textarea placeholder="Введите сообщение..." ref="inputRef" rows="1" />
    <button :disabled="true">
      <AirplaneIcon />
    </button>
  </div>
</template>

<script lang="ts" setup>
import AirplaneIcon from '@/components/AirplaneIcon.vue'
</script>

<style scoped>
.chat-input {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;
  padding: 12px;
  box-shadow: 0px 1px 0px 0px var(--color-border) inset;
}

.chat-input textarea {
  width: 100%;
  max-height: 200px;
  padding: 4px 8px;
  font: inherit;
  border: none;
  resize: none;
  overflow: hidden;
}

.chat-input textarea:focus {
  outline: none;
}

.chat-input button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 32px;
  height: 32px;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  color: var(--color-accent);
  cursor: pointer;
}

.chat-input button:disabled {
  color: var(--color-text);
  opacity: 0.3;
  cursor: auto;
}
</style>
