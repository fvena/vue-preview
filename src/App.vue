<template>
  <h1>Demo</h1>
  <Demo :code="demo" />

  <h1>Preview</h1>
  <Preview :code="preview" />

  <h1>Demo files</h1>
  <Demo :code="demoFiles" />

  <h1>Demo Default HTML</h1>
  <Demo :code="defaultHTML" />

  <h1>Demo Import Library SCSS</h1>
  <Demo :code="defaultHTML" :defaultStyle="defaultSCSSStyle" />

  <h1>Demo Import Library SCSS with SCSS</h1>
  <Demo :code="importLibrarySCSS" :defaultStyle="defaultSCSSStyle" />

  <h1>Demo Import Library CSS</h1>
  <Demo :code="importLibrarySCSS" :defaultStyle="defaultCSSStyle" />

  <h1>Editor HTML</h1>
  <Editor v-model="html" mode="html" />

  <h1>Editor CSS</h1>
  <Editor v-model="css" mode="css" />

  <h1>Editor SCSS</h1>
  <Editor v-model="scss" mode="scss" />

  <h1>Editor JSON</h1>
  <Editor v-model="json" mode="json" />

  <h1>Editor Javascript</h1>
  <Editor v-model="javascript" mode="javascript" />

  <h1>Editor Typescript</h1>
  <Editor v-model="typescript" mode="typescript" />

  <h1>Editor Markdown</h1>
  <Editor v-model="markdown" mode="markdown" />

  <h1>Editor Shell</h1>
  <Editor v-model="shell" mode="shell" />
</template>

<script setup lang="ts">
import type { File } from './components/editor/Editor.vue'

import Demo from './components/Demo.vue'
import Editor from './components/editor/Editor.vue'
import Preview from './components/preview/Preview.vue'

const demo = `
<script setup>
import { ref } from 'vue'

const msg = ref('Hello World!')
<\/script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg">
</template>

<style lang="scss" scoped>
  $color: red;

  h1 {
    color: $color;
  }
</style>
`.trim()

const preview = `
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
<\/script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style lang="scss" scoped>
$color: red;

button {
  font-weight: bold;
  color: $color;
}
</style>
`.trim()

const demoFileHTML = `
<h1>{{ msg }}</h1>
  <input v-model="msg">
`.trim()

const demoFileSCSS = `
$color: blue;

  h1 {
    color: $color;
  }
`.trim()

const demoFileJS = `
import { ref } from 'vue'

const msg = ref('Hello World 2!')
`.trim()

const demoFiles: File[] = [
  {
    name: 'template',
    mode: 'html',
    content: demoFileHTML,
  },
  {
    name: 'style',
    mode: 'scss',
    content: demoFileSCSS,
  },
  {
    name: 'script',
    mode: 'typescript',
    content: demoFileJS,
  },
]

const defaultHTML = `
<h1>Hello World</h1>
<h2>Hello World</h2>
<h3>Hello World</h3>
<h4>Hello World</h4>
<h5>Hello World</h5>
<h6>Hello World</h6>
`.trim()

const importLibrarySCSS = `
<template>
  <h1>Hello World</h1>
  <h2>Hello World</h2>
  <h3>Hello World</h3>
</template>

<style lang="scss" scoped>
  $color: red;

  h1 {
    color: $color;
  }
</style>
`.trim()

const defaultSCSSStyle = {
  scss: `
$h1: yellow;
$h2: blue;
$h3: green;

h1 {
  color: $h1;
}

h2 {
  color: $h2;
}

h3 {
  color: $h3;
}
`.trim(),
  css: '',
}

const defaultCSSStyle = {
  css: `
h1 {
  color: aqua;
}

h2 {
  color: brown;
}

h3 {
  color: blueviolet;
}
`.trim(),
}

const html = `
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Untitled</title>
		<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"><//script>
		<![endif]-->
	</head>
	<body>
		
	</body>
</html>
`.trim()

const css = `
body {
  margin: 0;
  padding: 0;
}
`.trim()

const scss = `
$color: #333;

body {
  color: $color;
}
`.trim()

const json = `
{
  "name": "vue-repl",
  "version": "0.0.0",
  "description": "A Vue.js project",
  "author": "egoist",
}
`.trim()

const javascript = `
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
`.trim()

const typescript = `
type Point = {
  x: number;
  y: number;
};
 
// Exactly the same as the earlier example
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
`.trim()

const markdown = `
# Hello World
`.trim()

const shell = `
echo "Hello World"
`.trim()

</script>

<style>
body {
  margin: 2rem;
}

h1 {
  margin: 3rem 0 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  border-bottom: 1px solid #eee;
}
</style>
