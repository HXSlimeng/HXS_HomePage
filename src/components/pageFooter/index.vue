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
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  font-size: 12px;
  div {
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
