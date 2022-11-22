<template>
  <div class="prj_Outer">
    <div class="prj_item" v-for="{ title, desc, tech, image } in allProjs">
      <h4 class="prj_Ti">{{ title }}</h4>
      <p class="prj_Desc">{{ desc }}</p>
      <div class="prj_tech">
        <div v-for="tec in tech.split(',')">{{ tec }}</div>
      </div>
      <div class="prj_img">
        <img src="@/assets/test1.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const allProjs = [
  {
    title: "AI数据分析平台",
    desc: "对接数据源并进行数据挖掘及推向可视化",
    tech: "VueJs,Typescript,JsPlumb",
    image: "",
  },
  {
    title: "",
    desc: "",
    tech: "",
    image: "",
  },
  {
    title: "",
    desc: "",
    tech: "",
    image: "",
  },
];
</script>

<style lang="less" scoped>
.prj_Outer {
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(105px, 400px));
  gap: 20px;
  justify-content: center;

  // justify-content: space-between;

  .prj_item {
    height: min-content;
    border: solid 1px var(--mainColor);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    transition: 0.3s;
    &:hover {
      background: var(--mainColorThird);
      border: solid 1px transparent;
    }
    .prj_Ti {
      color: var(--font-prmy-color);
    }
    .prj_Desc {
      font-size: 0.7rem;
      color: var(--font-sub-color);
    }
    .prj_tech {
      display: flex;
      gap: 10px;
      font-size: 0.7em;
      div {
        padding: 10px;
        color: var(--mainColor);
        background-color: var(--mainColorOp);
        border-radius: 10px;
      }
    }
    .prj_img {
      text-align: center;
      img {
        width: 100%;
        border-radius: 20px;
      }
    }
  }
}
@import "@/css/mobile.less";
</style>
