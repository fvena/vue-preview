<template>
  <div class="demo">
    <Preview :code="demoCode" />
    <Editor v-model="codeEditor" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Editor from './editor/Editor.vue'
import Preview from './preview/Preview.vue'
import type { File } from './editor/Editor.vue'

export interface Props {
  code: string | File[]
}

const props = withDefaults(defineProps<Props>(), {
  code: ''
})

const codeEditor = ref<string | File[]>(props.code)
const demoCode = computed(() => {
  if (typeof codeEditor.value === 'string') {
    return codeEditor.value
  }

  return createVueComponent(codeEditor.value)
})

/**
 * Join all the files into a single Vue component
 * 
 * @param files - The files to join
 */
function createVueComponent(files: File[]): string {
  const componentParts = files.reduce((acc, file) => {
    if (file.mode === 'html') {
      acc.template = file.content;
      acc.templateLang = file.mode;
    } else if (['javascript', 'typescript'].includes(file.mode)) {
      acc.script = file.content;
      acc.scriptLang = file.mode;
    } else if (['css', 'sass', 'scss'].includes(file.mode)) {
      acc.style = file.content;
      acc.styleLang = file.mode;
    }
    return acc;
  }, { template: '', script: '', style: '', templateLang: '', scriptLang: '', styleLang: '' });

  return `
<template>
  ${componentParts.template}
</template>

<script ${componentParts.scriptLang === 'typescript' ? 'lang="ts"' : ''} setup>
  ${componentParts.script}
<\/script>

<style lang="${componentParts.styleLang}" scoped>
  ${componentParts.style}
</style>
`;
}
</script>

<style scoped>
.demo {
  display: flex;
  flex-direction: column;
}
</style>
