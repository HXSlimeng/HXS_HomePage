<template>
  <div class="skills_outer">
    <ProgressBar ref="progressItem" v-for="tec in tecs" :icon="tec.icon" :val="tec.val" :fill="tec.fill"></ProgressBar>
  </div>
</template>

<script setup lang="ts">
import ProgressBar from "../ProgressBar.vue";
import gsap from "gsap";
import { ref, onMounted, DefineComponent } from "vue";

const progressItem = ref<DefineComponent[]>([]);

onMounted(() => {
  let tl = gsap.timeline({});
  const skillDom = document.querySelector(".skills_outer");

  let interOb = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          progressItem.value.forEach((progress, index) => {
            tl.to(progress.$el, { opacity: 1, bottom: 0 }, "-=0.4").call(() => {
              progress.action();
            });
          });
          interOb.unobserve(skillDom!);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );
  interOb.observe(skillDom!);
});
const tecs = [
  {
    icon: "js",
    fill: "#f5de19",
    val: 85,
  },
  {
    icon: "vue1",
    val: 78,
    fill: "#41b883",
  },
  {
    icon: "html",
    fill: "#e44f26",
    val: 75,
  },
  {
    icon: "css1",
    fill: "#1572b6",
    val: 75,
  },
  {
    icon: "ts",
    fill: "#3178c6",
    val: 70,
  },
  {
    icon: "react",
    fill: "#087ea4",
    val: 60,
  },
  {
    icon: "nodejs",
    fill: "#83cd29",
    val: 60,
  },
  {
    icon: "python",
    fill: "#366e9d",
    val: 40,
  },
];
</script>

<style lang="less" scoped>
.skills_outer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
