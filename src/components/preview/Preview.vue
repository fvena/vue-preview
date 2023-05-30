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
import { parseVueComponent } from '../utils/process-component';

//
// Props
//
export interface Props {
  store?: Store
  code?: string
}

const props = withDefaults(defineProps<Props>(), {
  store: () => new ReplStore(),
  code: ''
})

//
// Data
//
const { store } = props

provide('store', store)
provide('clear-console', true)

//
// Methods
//

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

const parse = async (value: string) => {
  let code = value.trim()

  // Check if is a vue component
  // if not, wrap it in a template tag
  if (!code.includes('<template>')) {
    code = `<template>${code}</template>`
  }

  const parseComponent = await parseVueComponent(code)

  if (parseComponent.errors?.length) {
    console.error(parseComponent.errors)
    return
  }

  store.state.activeFile.code = parseComponent.code
}

//
// Lifecycle
//
onMounted(async () => {
  store.init()
  parse(props.code)
  window.addEventListener('message', resize, true)
})

onUnmounted(() => {
  window.removeEventListener('message', resize)
})

//
// Watchers
//

/**
 * Update the code in the store. 
 * Use a debounce to prevent the store from being updated too often.
 */
watch(() => props.code, debounce(parse, 250))

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
