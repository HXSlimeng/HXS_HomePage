<template>
  <svg aria-hidden="true" class="icons">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "SvgIcon",
  props: {
    prefix: {
      type: String,
      default: "icon",
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#333",
    },
    size: {
      type: String,
      default: '12px'
    }
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);
    return { symbolId };
  },
});
</script>
<style scoped lang="less">
.icons {
  width: v-bind(size);
  height: v-bind(size);
}
</style>