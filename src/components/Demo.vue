<template>
  <div class="demo">
    <Preview :code="code" />
    <Editor v-model="code" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Editor from './editor/Editor.vue'
import Preview from './preview/Preview.vue'

export interface Props {
  code?: string
}

const props = withDefaults(defineProps<Props>(), {
  code: ''
})

const code = ref(props.code)
</script>

<style scoped>
.demo {
  display: flex;
  flex-direction: column;
}
</style>
