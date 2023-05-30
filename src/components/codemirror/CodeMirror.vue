<template>
  <div class="editor" ref="editorContainer"></div>
</template>

<script setup lang="ts">
import type { ViewUpdate } from '@codemirror/view'
import { html } from '@codemirror/lang-html'
import { sass, sassLanguage } from '@codemirror/lang-sass'
import { json } from '@codemirror/lang-json'
import { javascript } from '@codemirror/lang-javascript'
import { markdown } from '@codemirror/lang-markdown'
import { shell } from '@codemirror/legacy-modes/mode/shell'
import { ref, onMounted, watch } from 'vue'
import { closeBrackets } from '@codemirror/autocomplete'
import { EditorState, Compartment } from "@codemirror/state"
import { defaultKeymap, indentWithTab } from '@codemirror/commands'
import { indentOnInput, syntaxHighlighting, defaultHighlightStyle, StreamLanguage } from '@codemirror/language'
import { EditorView, keymap, drawSelection, highlightActiveLine, lineNumbers, highlightActiveLineGutter, highlightSpecialChars } from "@codemirror/view"
import { light } from './codemirror-theme'

export type Mode = 'vue' | 'html' | 'css' | 'sass' | 'scss' | 'json' | 'javascript' | 'typescript' | 'markdown' | 'shell'

export interface Props {
  mode?: Mode
  code?: string
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'vue',
  code: undefined,
  readonly: false
})

const emit = defineEmits<{
  change: [string]
}>()

const editorContainer = ref<HTMLElement>()
const languageConf = new Compartment

const modeToLanguage = {
  'vue': () => html({
    nestedLanguages: [{
      tag: "style",
      attrs(attrs) { return attrs.lang == "scss" || attrs.lang == "sass" },
      parser: sassLanguage.parser
    }]
  }),
  'html': html,
  'css': sass,
  'sass': sass,
  'scss': sass,
  'json': json,
  'javascript': javascript,
  'typescript': () => javascript({ typescript: true }),
  'markdown': markdown,
  'shell': () => StreamLanguage.define(shell),
};

let editorState = EditorState.create({
  doc: props.code,
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
    languageConf.of(modeToLanguage[props.mode]()),
    lineNumbers(),
    syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    light,
  ]
})

onMounted(() => {
  const editor = new EditorView({
    state: editorState,
    parent: editorContainer.value,
  })

  // Sync the code with the editor
  // When the value changes, update the editor
  watch(() => props.code, (code) => {
    if (code === editor.state.doc.toString()) return

    editor.dispatch({
      changes: { from: 0, to: editor.state.doc.length, insert: code }
    })
  })

  // Reconfigure the language when the mode changes
  watch(() => props.mode, (mode) => {
    editor.dispatch({
      effects: languageConf.reconfigure(modeToLanguage[mode]())
    })
  })
})
</script>

<style scoped></style>
