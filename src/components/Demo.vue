<template>
  <div class="demo">
    <Preview />
    <Editor />
  </div>
</template>

<script setup lang="ts">
import type { Store } from '@vue/repl'
import { ReplStore } from '@vue/repl';
import { provide } from 'vue'
import Editor from './Editor.vue'
import Preview from './Preview.vue'

export interface Props {
  store?: Store
}

const props = withDefaults(defineProps<Props>(), {
  store: () => new ReplStore()
})

const { store } = props

store.init()

provide('store', store)
provide('clear-console', true)
</script>

<style scoped>
.demo {
  display: flex;
  flex-direction: column;
}
</style>
