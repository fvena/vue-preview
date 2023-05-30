<template>
  <div>
    <div class="filesTabs" v-if="files.length">
      <div class="fileTab" v-for="(file, key) in files" :key="key" :class="{ active: file.name === activeFile.name }"
        @click="setActiveFile(file)">
        {{ file.name }}
      </div>
    </div>

    <!-- Codemirror Editor -->
    <CodeMirror @change="onChange" :mode="modeEditor" :code="codeEditor" />
  </div>
</template>

<script setup lang="ts">
import type { Mode } from '../codemirror/CodeMirror.vue'

import { ref, onMounted } from 'vue'
import CodeMirror from '../codemirror/CodeMirror.vue'

export interface File {
  name: string
  mode: Mode
  content: string
}

export interface Props {
  modelValue?: string | File[]
  mode?: Mode
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  mode: 'vue',
})

const emit = defineEmits<{
  'update:modelValue': [string | File[]]
}>()


const codeEditor = ref<string>('')
const modeEditor = ref<string>(props.mode)

const files = ref<File[]>([])
const activeFile = ref<File>()


const onChange = (code: string) => {
  if (typeof props.modelValue === 'string') {
    return emit('update:modelValue', code)
  }

  const newFiles = [...files.value].map((file) => {
    if (file.name === activeFile.value.name) {
      return {
        ...file,
        content: code,
      }
    }

    return file
  })
  emit('update:modelValue', newFiles)
}

const setActiveFile = (file: File) => {
  activeFile.value = file
  codeEditor.value = file.content
  modeEditor.value = file.mode
}

onMounted(() => {
  if (typeof props.modelValue === 'string') {
    codeEditor.value = props.modelValue
  } else {
    files.value = props.modelValue
    setActiveFile(props.modelValue[0])
  }
})

</script>

<style scoped>
.filesTabs {
  display: flex;
  flex-direction: row;
  height: 30px;
  background-color: #333;
  color: #fff;
  padding: 0 10px;
}

.fileTab {
  display: flex;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
}

.fileTab.active {
  background-color: #fff;
  color: #333;
}
</style>