<template>
  <div class="chat-status">
    <span>
      <slot />
    </span>
  </div>
</template>

<style scoped>
.chat-status {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  max-height: 36px;
  font-size: small;
  line-height: 1rem;
  text-align: center;
}

.chat-status :deep(a) {
  cursor: pointer;
  text-decoration: underline;
}
</style>
