<template>
  <CodeMirror @change="onChange" mode="vue" :value="modelValue" />
</template>

<script setup lang="ts">
import CodeMirror from '../codemirror/CodeMirror.vue'

export interface Props {
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
})

const emit = defineEmits<(e: 'update:modelValue', value: string) => void>()

const onChange = (code: string) => {
  emit('update:modelValue', code)
}

</script>

<style scoped></style>
s