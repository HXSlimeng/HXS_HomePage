<template>
  <div class="roundBlock" v-for="item in skillBlocks">
    <svg-icon :name="item"></svg-icon>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";

onMounted(() => {
  setBlocksRandomMove();
});
const skillBlocks = ["react", "vue", "less", "html5"];

const getRandomInnerPos = () => {
  let dom = document.querySelector(".roundBlock") as HTMLElement;
  let parendDom = <HTMLElement>dom.offsetParent;
  const { clientWidth, clientHeight } = parendDom;
  return [Math.random() * (clientWidth - 100) + 50, Math.random() * (clientHeight - 100) + 50];
};
const setBlocksRandomMove = () => {
  let allBlocks: NodeListOf<HTMLElement> = document.querySelectorAll(".roundBlock");
  allBlocks.forEach((el) => {
    const [x, y] = getRandomInnerPos();
    gsap.set(el, { x, y });
    setLoopMove(el);
  });
};
const setLoopMove = (el: HTMLElement) => {
  const [endX, endY] = getRandomInnerPos();
  let elTransForm = el.style.transform;
  let distanceStr = el.style.transform.slice(elTransForm.indexOf("(") + 1, elTransForm.indexOf(")"));
  //根据位移计算duration
  const [lastX, LastY] = distanceStr.split(",").map((v) => Number(v.replace("px", "")));
  let distance = Math.abs(lastX - endX) ** 2 + Math.abs(LastY - endY) ** 2;
  let speed = ~~Math.sqrt(distance) / 30;
  gsap.to(el, { x: endX, y: endY, onComplete: () => setLoopMove(el), ease: "none", duration: speed });
};
</script>

<style lang="less" scoped>
.roundBlock {
  width: 50px;
  height: 50px;
  background: var(--sub-bg);
  color: var(--mainColor);
  backdrop-filter: blur(5px);
  display: flex;
  left: 0;
  top: 0;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: 50%;
  z-index: 2;
}
</style>
