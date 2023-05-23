<template>
  <div class="editor">
    <textarea v-model="store.state.activeFile.code" />
  </div>
</template>

<script setup lang="ts">
import type { Store } from '@vue/repl'
import { inject } from 'vue'

const store = inject('store') as Store
</script>

<style scoped></style>
