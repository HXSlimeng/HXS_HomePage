<template>
  <div class="app">
    <div class="game_page">
      <!-- @checkIfDelRows="checkIfDelRows" -->
      <BlockExamp
        :block="block"
        :allBox="allBox"
        :completeRowsY="completeRowsY"
        @updateCompleteRowsY="updateCompleteRowsY"
        @moveAgainUpdate="moveAgainUpdate"
        v-for="block in controllerBlock"
      ></BlockExamp>
      <div class="divider"></div>
    </div>
    <button class="startBtn" @click="dropNextBlock">开始</button>
    <button class="startBtn" @click="restartGame">重新开始</button>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ReactiveEffect, ref } from "vue";
import { Block, BlockType } from "./Block";
import BlockExamp from "@/components/BlockUI/index.vue";
import { computed, Ref } from "@vue/reactivity";
import { watch } from "fs";

type blockObjType = {
  id: string;
  x: number;
  y: number;
};

let allBox: Ref<blockObjType[]> = ref([]);
let controllerBlock: Ref<BlockType[]> = ref([]);

/* let blockVDom:InstanceType<typeof BlockExamp>[] | null = reactive([]);

const getBlockVDom = (el:InstanceType<typeof BlockExamp> | null) => {
  blockVDom.push(el);
}; */
let completeRowsY: Ref<string[]> = ref([]);
const updateCompleteRowsY = (boxPosition: blockObjType[]) => {
  if (boxPosition.find((v) => v.y < 50)) {
    window.alert("游戏结束！！");
    return;
  }
  allBox.value.push(...boxPosition);
  //统计各行的方块个数
  let rowMap = new Map();
  allBox.value.forEach((v: blockObjType) => {
    if (rowMap.has(v.y)) {
      let newVal = rowMap.get(v.y);
      newVal.push(v);
      rowMap.set(v.y, newVal);
    } else {
      let newItem: blockObjType[] = [];
      newItem.push(v);
      rowMap.set(v.y, newItem);
    }
  });
  let completeRow: string[] = [];
  rowMap.forEach((v, i) => {
    if (v.length == 10) {
      completeRow.push(...v.map((y: blockObjType) => y.id));
      allBox.value = allBox.value.filter((x: { id: string }) => !completeRow.includes(x.id));
    }
  });

  completeRowsY.value.push(...completeRow);
  controllerBlock.value.push(new Block());
};

const moveAgainUpdate = (boxsVal: blockObjType[]) => {
  allBox.value = allBox.value.map((val) => {
    let finalVal = val;
    boxsVal.forEach((tBox) => {
      if (tBox.id == val.id) {
        finalVal = tBox;
      }
    });
    return finalVal;
  });
};

const createDivider = () => {
  let fakeArray = Array.from({ length: 160 });
  const fragment = document.createDocumentFragment();
  fakeArray.forEach(() => {
    let newTag = document.createElement("div");
    newTag.className = "dividClass";
    fragment.appendChild(newTag);
  });
  document.querySelector(".divider")?.appendChild(fragment);
};

const setKeyListener = () => {
  window.onkeydown = (e) => {
    let currentBlock: BlockType = controllerBlock.value[controllerBlock.value.length - 1];
    switch (e.key) {
      case "ArrowLeft":
        currentBlock.moveLeft();
        break;
      case "ArrowRight":
        currentBlock.moveRight();
        break;
      case "ArrowUp":
        break;
      default:
        break;
    }
  };
};

const dropNextBlock = () => {
  controllerBlock.value.push(new Block());
};
const restartGame = () => {
  controllerBlock.value = [];
  allBox.value = [];
  completeRowsY.value = [];
  nextTick(() => {
    controllerBlock.value.push(new Block());
  });
};

onMounted(() => {
  setKeyListener();
  createDivider();
  // startGame();
});
</script>

<style lang="less" scoped>
.app {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.game_page {
  height: 800px;
  overflow: hidden;
  width: 500px;
  background-color: #d3d3d3;
  border: solid 5px #8f8f8f;
  border-radius: 20px;
  position: relative;
}
.divider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(10, auto);
  grid-template-rows: repeat(16);
}
.startBtn {
  border: solid 1px black;
  width: 100px;
  height: 50px;
}
</style>
