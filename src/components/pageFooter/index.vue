<template>
  <footer class="footerMain">
    <div>&copy;Copyright 2022. Made by HXSlimeng</div>
  </footer>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.footerMain {
  height: 80px;
  border-top: solid 2px var(--sub-bg);
  display: flex;
  justify-content: center;
  flex-direction: column;
  div {
    width: 100%;
    &:nth-child(1) {
      color: var(--font-prmy-color);
    }
    &:nth-child(2) {
      font-size: 0.8em;
      text-align: center;
      color: var(--font-sub-color);
    }
  }
}
</style>
