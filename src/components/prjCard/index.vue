<template>
  <div class="prj_Outer">
    <div class="prj_item" v-for="{ title, desc, tech, image } in allProjs">
      <h4 class="prj_Ti">{{ title }}</h4>
      <p class="prj_Desc">{{ desc }}</p>
      <div class="prj_tech">
        <div v-for="tec in tech.split(',')">{{ tec }}</div>
      </div>
      <div class="prj_img">
        <div>待添加...</div>
        <!-- <img src="@/assets/test1.png" alt="" /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const allProjs = [
  {
    title: "AI数据分析平台",
    desc: "对接数据源并进行数据挖掘及推向可视化",
    tech: "Vue3,Typescript,JsPlumb,Pinia,Vite",
    image: "",
  },
  {
    title: "快开平台",
    desc: "为各类业务型系统提供支持,包含各种开箱即用的特色功能组件",
    tech: "Vue2,ElementUI,Less,Webpack",
    image: "",
  },
  {
    title: "喜鹊打工(微信小程序)",
    desc: "面向民工的工作发布、招聘小程序",
    tech: "wxml,wxss,vant,腾讯地图",
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
      flex-wrap: wrap;
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
      background-color: var(--sub-bg);
      color: var(--font-sub-color);
      min-height: 200px;
      line-height: 200px;
      font-size: 0.8em;
      img {
        width: 100%;
        border-radius: 20px;
      }
    }
  }
}
@import "@/css/mobile.less";
</style>
