<template>
  <main class="container">
    <Chat />
  </main>
</template>

<script lang="ts" setup>
import Chat from './components/Chat.vue'
</script>

<style scoped>
.container {
  max-width: 450px;
  margin: auto;
  height: 100vh;
  box-shadow: 0px 0px 10px 2px rgba(34, 60, 80, 0.2);
}
</style>
