<template>
  <div class="message">
    <div
      class="message__bubble"
      :class="{ 'message__bubble--mine': props.isMine }"
    >
      {{ props.text }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  isMine: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>
.message {
  display: flex;
  padding: 4px 16px;
}

.message .message__bubble {
  display: flex;
  align-items: center;
  width: max-content;
  max-width: 80%;
  padding: 4px 8px;
  white-space: pre-wrap;
  word-break: break-word;
  border-radius: 8px 8px 8px 0px;
  background-color: var(--color-primary);
}

.message .message__bubble--mine {
  color: var(--color-background);
  background-color: var(--color-accent);
  border-radius: 8px 8px 0px 8px;
  margin-left: auto;
}
</style>
