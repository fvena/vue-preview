<template>
  <Demo :code="demo" />
  <Preview :code="preview" />
  <Editor :value="html" mode="html" />
  <Editor :value="css" mode="css" />
  <Editor :value="scss" mode="scss" />
  <Editor :value="json" mode="json" />
  <Editor :value="javascript" mode="javascript" />
  <Editor :value="typescript" mode="typescript" />
  <Editor :value="markdown" mode="markdown" />
  <Editor :value="shell" mode="shell" />
</template>

<script setup lang="ts">
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

<style scoped></style>
