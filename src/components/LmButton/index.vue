<template>
  <button class="lm_button">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const changeStatus = () => {};
defineExpose({});
</script>

<style lang="less" scoped>
.lm_button {
  color: var(--mainColor);
  padding: 5px 15px;
  background-color: var(--prmy-bg);
  border-radius: 5px;
  border: solid 2px var(--mainColor);
  position: relative;
  display: flex;
  font-size: 16px;
  overflow: hidden;
  // height: min-content;

  &:hover {
    background-color: var(--mainColor);
    color: #fff;
    cursor: pointer;
  }
}
</style>
