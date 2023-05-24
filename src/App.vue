<template>
  <Demo />
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
`

const css = `
body {
  margin: 0;
  padding: 0;
}
`

const scss = `
$color: #333;

body {
  color: $color;
}
`

const json = `
{
  "name": "vue-repl",
  "version": "0.0.0",
  "description": "A Vue.js project",
  "author": "egoist",
}
`

const javascript = `
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
`

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
`

const markdown = `
# Hello World
`

const shell = `
echo "Hello World"
`

</script>

<style scoped></style>
