<template>
  <div class="progress">
    <label :for="label" class="progress_label" :style="{ color: fill || '#00adb5' }">
      <SvgIcon :name="icon"></SvgIcon>
    </label>
    <div class="progress_outer">
      <div class="progress_inner" :style="progressStyle"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps(["label", "val", "fill", "icon"]);

let realColor = props.fill || "#00adb5";
const progressStyle = ref({
  width: "0%",
  background: "",
  backgroundSize: "100px 100px",
});

onMounted(() => {
  progressStyle.value.background = `repeating-linear-gradient(-45deg, ${realColor} 0%, ${realColor} 25%, ${realColor}cc 0%, ${realColor}cc 50%)`;
});
// width: `${props.val}%`,

const action = () => {
  progressStyle.value.width = `${props.val}%`;
};

defineExpose({
  action,
});
</script>

<style lang="less" scoped>
.progress {
  display: flex;
  align-items: center;
  padding: 10px 0;
  width: 70%;
  opacity: 0;
  position: relative;
  bottom: 40px;
  &_label {
    svg {
      width: 35px;
      height: 35px;
    }
  }
  &_outer {
    background: #dfdfdf;
    height: 10px;
    position: relative;
    width: 100%;
    border-radius: 10px;
    display: inline-block;
    overflow: hidden;
    margin-left: 10px;
    background-color: var(--sub-bg);
  }
  &_inner {
    height: 100%;
    width: 0px;
    border-radius: 10px;
    transition: all 0.6s;
  }
}
</style>
