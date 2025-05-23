<template>
  <NuxtPage />
</template>

<script setup lang="ts"></script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.5rem);
}
</style>
