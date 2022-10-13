<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import persons from "./components/composition/persion";
import testTable from "./components/testTable/index.vue";
let { person, changeName, getOld, getYoung, newName, cNameVis } = persons();

</script>

<template>
  <router-view></router-view>
</template>

<style lang="less" scoped>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* text-align: center; */
  /* color: #2c3e50; */
}

.dividClass {
  height: 48px;
  width: 48px;
  border: solid 1px #2c3e50;
  opacity: 0.1;
}

/* @media screen and (max-width: 1410px) {
  #app {
    width: 1410px;
  }
  @media screen and (max-width: 1000px) {
    #app {
      width: 1200px;
    }
  }
} */
</style>
