<template>
  <div class="preview">
    <Preview show :ssr="false" />
  </div>
</template>

<script setup lang="ts">
import { Preview } from '@vue/repl';
import type { Store } from '@vue/repl'
import { ReplStore } from '@vue/repl';
import { onMounted, onUnmounted, provide, watch } from 'vue'
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

provide('store', store)
provide('clear-console', true)

/**
 * Resize the iframe to fit the content.
 * 
 * @param event - The message event.
 */
const resize = (event: MessageEvent) => {
  const iframe = (event.source as Window)?.frameElement as HTMLIFrameElement | null;
  const height = iframe?.contentDocument?.querySelector('html')?.offsetHeight;

  if (height) {
    iframe!.style.height = `${height}px`;
  }
};

onMounted(() => {
  store.init()
  store.state.activeFile.code = props.code
  window.addEventListener('message', resize, true)
})

onUnmounted(() => {
  window.removeEventListener('message', resize)
})

/**
 * Update the code in the store. 
 * Use a debounce to prevent the store from being updated too often.
 */
watch(() => props.code, debounce((code: string) => {
  store.state.activeFile.code = code
}, 250))

</script>

<style scoped>
.preview {
  box-sizing: content-box;
  padding: 8px;
}

:deep(iframe) {
  width: 100%;
  border: none;
  height: 100px;
  min-height: 100px;
  transition: height 0.3s ease-out;
}
</style>
