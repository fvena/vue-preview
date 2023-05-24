<template>
  <div class="preview">
    <Preview show :ssr="false" />
  </div>
</template>

<script setup lang="ts">
import { Preview } from '@vue/repl';
import type { Store } from '@vue/repl'
import { ReplStore } from '@vue/repl';
import { onMounted, provide, watch } from 'vue'
import { debounce } from '../../utils';

export interface Props {
  store?: Store
  code?: string
}

const props = withDefaults(defineProps<Props>(), {
  store: () => new ReplStore(),
  code: ''
})

const { store } = props

store.init()

provide('store', store)
provide('clear-console', true)

onMounted(() => {
  store.state.activeFile.code = props.code
})

watch(() => props.code, debounce((code: string) => {
  store.state.activeFile.code = code
}, 250))
</script>

<style scoped></style>
