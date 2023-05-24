<template>
  <div class="demo">
    <Preview />
    <Editor @change="onChange" :mode="activeMode" :value="store.state.activeFile.code" />
  </div>
</template>

<script setup lang="ts">
import type { Store } from '@vue/repl'
import { ReplStore } from '@vue/repl';
import { provide, computed } from 'vue'
import { debounce } from '@/utils';
import Editor from './editor/Editor.vue'
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

const onChange = debounce((code: string) => {
  store.state.activeFile.code = code
}, 250)

const activeMode = computed(() => {
  const { filename } = store.state.activeFile

  if (filename.endsWith('.vue')) return 'vue'
  if (filename.endsWith('.html')) return 'html'
  if (filename.endsWith('.css') || filename.endsWith('.scss') || filename.endsWith('.sass')) return 'sass'
  return 'typescript'
})
</script>

<style scoped>
.demo {
  display: flex;
  flex-direction: column;
}
</style>
