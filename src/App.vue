<script setup lang="ts">
import type { Store } from '@vue/repl'
import { Preview, ReplStore } from '@vue/repl';
import { provide } from 'vue'

const store: Store = new ReplStore()

store.init()

store.state.activeFile.code = ''

provide('store', store)
provide('clear-console', true)
</script>

<template>
  <Preview show :ssr="false"></Preview>
  <textarea v-model="store.state.activeFile.code" />
</template>

<style scoped></style>
