<template>
  <div class="editor" ref="el"></div>
</template>

<script setup lang="ts">
import type { ViewUpdate } from '@codemirror/view'
import { vue } from '@codemirror/lang-vue'
import { html } from '@codemirror/lang-html'
import { sass } from '@codemirror/lang-sass'
import { json } from '@codemirror/lang-json'
import { javascript } from '@codemirror/lang-javascript'
import { markdown } from '@codemirror/lang-markdown'
import { shell } from '@codemirror/legacy-modes/mode/shell'
import { ref, onMounted, watchEffect } from 'vue'
import { closeBrackets } from '@codemirror/autocomplete'
import { EditorState } from "@codemirror/state"
import { defaultKeymap, indentWithTab } from '@codemirror/commands'
import { indentOnInput, syntaxHighlighting, defaultHighlightStyle, StreamLanguage } from '@codemirror/language'
import { EditorView, keymap, drawSelection, highlightActiveLine, lineNumbers, highlightActiveLineGutter, highlightSpecialChars } from "@codemirror/view"
import { light } from './codemirror-theme'

export type Mode = 'vue' | 'html' | 'css' | 'sass' | 'scss' | 'json' | 'javascript' | 'typescript' | 'markdown' | 'shell'

export interface Props {
  mode?: Mode
  value?: string
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'vue',
  value: undefined,
  readonly: false
})

const emit = defineEmits<(e: 'change', value: string) => void>()

const el = ref()

/**
 * Returns the language for the editor.
 */
const language = (() => {
  switch (props.mode) {
    case 'vue':
      return vue()
    case 'html':
      return html()
    case 'css':
    case 'sass':
    case 'scss':
      return sass()
    case 'json':
      return json()
    case 'javascript':
      return javascript()
    case 'typescript':
      return javascript({ typescript: true })
    case 'markdown':
      return markdown()
    case 'shell':
      return StreamLanguage.define(shell)
    default:
      return vue()
  }
})()

/**
 * The editor state.
 */
let state = EditorState.create({
  doc: props.value,
  extensions: [
    closeBrackets(),
    drawSelection(),
    EditorState.tabSize.of(2),
    EditorState.readOnly.of(props.readonly),
    EditorView.lineWrapping,
    EditorView.updateListener.of((update: ViewUpdate) => {
      emit('change', update.state.doc.toString())
    }),
    highlightActiveLine(),
    highlightActiveLineGutter(),
    highlightSpecialChars(),
    indentOnInput(),
    keymap.of([
      ...defaultKeymap,
      indentWithTab
    ]),
    language,
    lineNumbers(),
    syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    light,
  ]
})

onMounted(() => {
  const editor = new EditorView({
    state,
    parent: el.value,
  })

  watchEffect(() => {
    const cur = editor.state.doc.toString()
    if (props.value !== cur) {
      editor.dispatch({ changes: { from: 0, to: editor.state.doc.length, insert: props.value } })
    }
  })
})
</script>

<style scoped></style>
