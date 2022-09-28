<template>
  <div
    :id="item.id"
    v-for="item in groupBoxs"
    class="blockExamp"
    :style="{
      top: `${item.y}px`,
      left: `${item.x}px`,
      backgroundColor: block.boxColor,
    }"
  ></div>
</template>

<script setup lang="ts">
import { computed, Ref, ref, toRefs } from "@vue/reactivity";
import { Block, BlockType } from "@/game/Block";
import { onMounted, watch } from "vue";

const props = defineProps<{
  block: BlockType;
  allBox: blockObjType[];
  completeRowsY: string[];
}>();
const emit = defineEmits(["dropNextBlock", "updateCompleteRowsY", "moveAgainUpdate"]);

const { typeOfBlock, blocksId } = toRefs(props.block);

type blockObjType = {
  id: string;
  x: number;
  y: number;
};
let groupBoxs: Ref<blockObjType[]> = ref([]);

const init = () => {
  let timer = setInterval(() => {
    let ifNext = checkIfNext(props.allBox);
    if (ifNext) {
      clearInterval(timer);
      emit("updateCompleteRowsY", groupBoxs.value);
      // emit("dropNextBlock");
    } else {
      props.block.moveDown();
    }
  }, 200);
};

const setGroupBox = (xVal: number, yVal: number) => {
  let idVal: String = blocksId.value;
  let otherBoxObj: blockObjType[] = [];
  switch (typeOfBlock.value) {
    case 2:
      otherBoxObj = [
        {
          id: `1-${idVal}`,
          x: xVal,
          y: yVal,
        },
        {
          id: `2-${idVal}`,
          x: xVal - 50,
          y: yVal,
        },
        {
          id: `3-${idVal}`,
          x: xVal + 50,
          y: yVal,
        },
        {
          id: `4-${idVal}`,
          x: xVal + 100,
          y: yVal,
        },
      ];
      break;
    case 1:
      otherBoxObj = [
        {
          id: `1-${idVal}`,
          x: xVal,
          y: yVal,
        },
        {
          id: `2-${idVal}`,
          x: xVal,
          y: yVal + 50,
        },
        {
          id: `3-${idVal}`,
          x: xVal + 50,
          y: yVal,
        },
        {
          id: `4-${idVal}`,
          x: xVal + 100,
          y: yVal,
        },
      ];
      break;
    case 0:
      otherBoxObj = [
        {
          id: `1-${idVal}`,
          x: xVal,
          y: yVal,
        },
        {
          id: `2-${idVal}`,
          x: xVal,
          y: yVal + 50,
        },
        {
          id: `3-${idVal}`,
          x: xVal + 50,
          y: yVal,
        },
        {
          id: `4-${idVal}`,
          x: xVal + 50,
          y: yVal + 50,
        },
      ];
      break;
    case 3:
      otherBoxObj = [
        {
          id: `1-${idVal}`,
          x: xVal,
          y: yVal,
        },
        {
          id: `2-${idVal}`,
          x: xVal,
          y: yVal + 50,
        },
        {
          id: `3-${idVal}`,
          x: xVal - 50,
          y: yVal + 50,
        },
        {
          id: `4-${idVal}`,
          x: xVal + 50,
          y: yVal + 50,
        },
      ];
      break;
    default:
      break;
  }
  groupBoxs.value = otherBoxObj;
};
const setMoveCondition = () => {
  let leftHasBlock = false;
  let rightHasBlock = false;
  props.allBox.find((all) => {
    return groupBoxs.value.find((group) => {
      if (group.y + 50 == all.y) {
        if (group.x + 50 == all.x) {
          rightHasBlock = true;
          return true;
        } else if (group.x - 50 == all.x) {
          leftHasBlock = true;
          return true;
        }
      }
      return false;
    });
  });
  groupBoxs.value.find((v) => {
    if (v.x <= 0 || leftHasBlock) {
      props.block.canLeft = false;
      return true;
    } else if (v.x >= 450 || rightHasBlock) {
      props.block.canRight = false;
      return true;
    } else if (!props.block.canLeft || !props.block.canRight) {
      props.block.canLeft = true;
      props.block.canRight = true;
    }
    return false;
  });
};
const checkIfDelRows = () => {
  groupBoxs.value = groupBoxs.value.filter((v) => !props.completeRowsY.includes(v.id));
  checkSingleBox();
};
const checkSingleBox = () => {
  if (groupBoxs.value.length == 4) {
    let timer = setInterval(() => {
      let ifNext = checkIfNext(props.allBox);
      if (ifNext) {
        clearInterval(timer);
        emit("moveAgainUpdate", groupBoxs.value);
      } else {
        props.block.moveDown();
        emit("moveAgainUpdate", groupBoxs.value);
      }
    }, 500);
  } else {
    let ids = groupBoxs.value.map((v) => v.id);
    groupBoxs.value.forEach((box, i) => {
      let timer = setInterval(() => {
        let nextHas: boolean = false;
        props.allBox.forEach((v) => {
          if (!ids.includes(v.id)) {
            if ((v.y == box.y + 50 && v.x == box.x) || box.y >= 750) {
              nextHas = true;
            }
          }
        });
        if (nextHas) {
          emit("moveAgainUpdate", groupBoxs.value);
          clearInterval(timer);
        } else {
          emit("moveAgainUpdate", groupBoxs.value);
          groupBoxs.value[i].y += 50;
        }
      }, 500);
    });
  }
};

watch(
  () => [props.block.x, props.block.y],
  (newVal) => {
    let x = newVal[0];
    let y = newVal[1];
    setGroupBox(x, y);
  }
);
watch(
  groupBoxs,
  (newVal, oldVal) => {
    setMoveCondition();
  },
  { deep: true }
);
watch(props.completeRowsY, () => {
  checkIfDelRows();
});

const checkIfNext = (position: blockObjType[]) => {
  let isBottom = groupBoxs.value.find((v) => v.y >= 750);
  if (isBottom) {
    return true;
  }
  let nextBlock: boolean = false;
  let copyData = position;
  let groupIds = position.map((v) => v.id);
  copyData.forEach((v: blockObjType) =>
    groupBoxs.value.forEach((x) => {
      if (!groupIds.includes(x.id)) {
        if (x.y + 50 == v.y && x.x == v.x) {
          nextBlock = true;
        }
      }
    })
  );
  return nextBlock;
};

onMounted(() => {
  init();
});
</script>

<style lang="less" scoped>
.blockExamp {
  width: 50px;
  height: 50px;
  background-color: black;
  position: absolute;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px,
    rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
  transition: 0.3s;
}
</style>
