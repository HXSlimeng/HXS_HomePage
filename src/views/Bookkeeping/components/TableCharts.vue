<template>
  <div id="dailySpend" class="chart"></div>
  <div id="typeSpend" class="chart"></div>
</template>

<script setup lang="ts">
import "https://cdn.bootcdn.net/ajax/libs/echarts/5.4.3/echarts.min.js";
import { inject, onMounted, ref } from "vue";
import { IcategorysObj, IcategorysObjArr } from "..";
const categorys = inject<IcategorysObjArr>("categorys");

const props = defineProps<{ allData: IcategorysObj[]; summation: IcategorysObj }>();

type Ichart = {
  dom: string;
  ctx: any;
  option: object;
}[];

let dailySpendData = categorys!.map(({ prop, label }) => {
  return {
    name: label,
    type: "bar",
    stack: "total",
    label: {
      show: true,
    },
    emphasis: {
      focus: "series",
    },
    data: props.allData.map(({ [prop]: value }) => value),
  };
});

let typeSpendData = categorys!.map(({ prop, label }) => {
  return {
    name: label,
    value: props.summation[prop],
    label: {
      show: true,
    },
  };
});

const chartsArr = [
  {
    dom: "dailySpend",
    ctx: null,
    option: {
      title: {
        text: "概览",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        bottom: "0",
      },
      xAxis: {
        type: "category",
        data: props.allData.map(({ date }) => date),
      },
      yAxis: {
        type: "value",
      },

      grid: {
        left: "3%",
        right: "4%",
        bottom: "8%",
        containLabel: true,
      },

      series: dailySpendData,
    },
  },
  {
    dom: "typeSpend",
    ctx: null,
    option: {
      title: {
        text: "类别消费统计",
        left: "center",
        top: "10%",
      },
      tooltip: {
        show: true,
        formatter({ name, value, percent }: any) {
          return `${name}-${value} (${percent}%)`;
        },
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          label: {
            show: true,
            formatter({ name, value, percent }: any) {
              return `${name}-${value} (${percent}%)`;
            },
          },
          data: typeSpendData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    },
  },
];

onMounted(() => {
  initCharts();
});

function initCharts() {
  chartsArr.forEach((chart) => {
    let chartDom = document.getElementById(chart.dom);
    chart.ctx = echarts.init(chartDom);
    //@ts-ignore
    chart.ctx.setOption(chart.option, true);
  });
}
</script>

<style lang="less" scoped>
.chart {
  height: 500px;
}
</style>
