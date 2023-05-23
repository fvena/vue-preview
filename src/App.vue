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

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
