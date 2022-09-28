<template>
  <div class="markdown">
    <ExampleMarkdown></ExampleMarkdown>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
</script>
<style lang="less">
.markdown-body {
  h1,
  h2,
  h3 {
    font-weight: bold;
  }
  h1 {
    display: block;
    margin: 35px 0px;
    font-weight: bold;
  }
  h2 {
    margin: 25px 0;
  }
  h3 {
    margin: 10px 0;
  }
  pre {
    background-color: #f8f8f8;
    padding: 10px;
    border-radius: 5px;
    margin: 25px 0px;
  }
}
</style>
