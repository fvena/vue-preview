<template>
  <div class="preview">
    <Preview show :ssr="false" />
  </div>
</template>

<script setup lang="ts">
import { Preview } from '@vue/repl';
</script>

<style scoped></style>
