<template>
  <div class="chat-input">
    <textarea
      v-model.trim="message"
      placeholder="Введите сообщение..."
      ref="inputRef"
      rows="1"
      @input="onInput"
      @keypress.enter.exact.prevent="onSend"
    />
    <button @click="onSend" :disabled="!message">
      <AirplaneIcon />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { getRandomId } from '@/utils/getRandomId'
import type { Message } from '@/types/message'
import AirplaneIcon from '@/components/AirplaneIcon.vue'

const emit = defineEmits<{ (event: 'send', message: Message): void }>()

const inputRef = ref()
const message = ref('')

const onInput = () => {
  inputRef.value.style.height = 'auto'
  inputRef.value.style.height = inputRef.value.scrollHeight + 'px'
}

const clearInput = () => {
  message.value = ''
  nextTick(onInput)
}

const onSend = () => {
  if (!message.value) return

  emit('send', {
    id: getRandomId(),
    text: message.value,
    isMine: true,
  })

  clearInput()
}
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
