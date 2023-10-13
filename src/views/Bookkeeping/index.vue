<template>
  <div class="container py-3">
    <ul class="nav nav-tabs">
      <li class="nav-item" v-for="tab in tabs" @click="setActive(tab.prop)">
        <a :class="{ 'nav-link': true, active: activePage == tab.prop }" aria-current="page">{{ tab.label }}</a>
      </li>
    </ul>
    <TableData v-model:allData="allData" :summation="summation" v-if="activePage === 'table'" ref="tableComp" />
    <TableCharts v-else :allData="allData" :summation="summation"></TableCharts>
  </div>
</template>

<script setup lang="ts">
import { provide, ref, onMounted, computed } from "vue";
import TableData from "./components/TableData.vue";
import TableCharts from "./components/TableCharts.vue";
import { Icategorys, IcategorysObj } from ".";

const allData = ref<IcategorysObj[]>([]);

const summation = computed(() => {
  let initVal: IcategorysObj = { date: null, food: null, clothes: null, entertainment: null, traffic: null, daily: null, others: null, allin: null };
  return allData.value.reduce((pre, curr) => {
    Object.keys(pre).forEach((prop) => {
      if (prop !== "date") {
        pre[prop as Icategorys]! += curr[prop as Icategorys]!;
      }
    });
    return pre;
  }, initVal);
});
const categorys: { label: string; prop: Icategorys; icon: string }[] = [
  {
    label: "吃",
    prop: "food",
    icon: "bi bi-cake2-fill",
  },
  {
    label: "穿",
    prop: "clothes",
    icon: "bi bi-incognito",
  },
  {
    label: "娱乐",
    prop: "entertainment",
    icon: "bi bi-controller",
  },
  {
    label: "交通",
    prop: "traffic",
    icon: "bi bi-car-front-fill",
  },
  {
    label: "日用",
    prop: "daily",
    icon: "bi bi-calendar",
  },
  {
    label: "其他",
    prop: "others",
    icon: "bi bi-alipay",
  },
];

/* tabs */
const tabs = ref([
  { label: "数据记录表", prop: "table" },
  { label: "统计", prop: "statistic" },
]);

const activePage = ref("table");
function setActive(tabProp: string) {
  activePage.value = tabProp;
}
/* 表格数据 */
const tableComp = ref<typeof TableData>();

provide("categorys", categorys);
</script>

<style lang="less" scoped></style>
