<template>
  <div class="tableDataRoot">
    <button type="button" class="btn btn-primary m-3" data-bs-toggle="modal" data-bs-target="#dateModal">+</button>
    <!-- <input type="date" class="form-control w-2" placeholder="选择日期" aria-label="选择日期" aria-describedby="basic-addon2" /> -->
    <div class="table-responsive m-3">
      <table class="table table-sm table-bordered caption-top">
        <thead>
          <tr>
            <th scope="col">日期</th>
            <th v-for="ctgr in categorys">
              <i :class="ctgr.icon" style="color: #0d6efd"></i>
            </th>
            <th>总计</th>
          </tr>
        </thead>
        <tbody>
          <!-- 内容 -->
          <tr v-for="(data, dataI) in dataIns.compData">
            <td>{{ data.date }}</td>
            <td v-for="(ctgr, ctgrI) in categorys">{{ data.cateObj[ctgr.prop].value }}</td>
            <td>{{ data.allin }}</td>
          </tr>
          <!-- 合计 -->
          <tr>
            <td class="bg-body-secondary" :style="{ color: '#0a58ca' }">合计</td>
            <td class="bg-body-secondary" :style="{ color: '#0a58ca' }" v-for="(ctgr, ctgrI) in categorys">{{ dataIns.summation[ctgr.prop] }}</td>
            <td class="bg-body-secondary" :style="{ color: '#0a58ca' }">{{ dataIns.allin }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="modal fade" id="dateModal" tabindex="-1" aria-labelledby="exampleModalLabel" data-backdrop="static" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">添加日期</h1>

            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input type="date" class="form-control mb-3" v-model="selectedDate" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="confirmDate">添加</button>
            <!-- <button type="button" class="btn btn-primary" v-else @click="confirmEdit">确定</button> -->
          </div>
        </div>
      </div>
    </div>
    <div class="accordion" id="accordionExample">
      <div class="accordion-item" v-for="dateData in dataIns.compData">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="`#coll${dateData.date}`" aria-expanded="false" :aria-controls="`coll${dateData.date}`">
          <div class="d-flex d-flex justify-content-between w-100">
            <div class="badge text-bg-primary">{{ dateData.date }}</div>
            <div class="badge text-bg-warning">￥{{ dateData.allin }}</div>
          </div>
        </button>
        <div :id="`coll${dateData.date}`" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <div class="mb-1" v-for="cate in categorys">
              <!-- @vue-ignore -->
              <div class="input-group input-group-sm" style="width: 160px">
                <span class="input-group-text"><i :class="cate.icon"></i>&nbsp; {{ cate.label }}:</span>
                <input type="number" width="20px" class="form-control" aria-label="Username" />
                <button type="button" class="btn btn-outline-secondary" @click="(e) => cateValsAdd(e, dateData.cateObj, cate.prop)">+</button>
              </div>
              <span v-for="(num, i) in dateData.cateObj[cate.prop].valueArr">
                <code>{{ num }}</code>
                <span class="badge">{{ i == dateData.cateObj[cate.prop].valueArr.length - 1 ? "" : "+" }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js";
import { onMounted, ref, computed, toRef, Ref, unref, inject, toRefs, defineProps, reactive } from "vue";
import { Icategorys, IcategorysObj, IcategorysObjArr } from "../index.d";
import { allCateData, CategorysObj, CateValues } from "../allDataIns";

const props = defineProps<{ dataIns: allCateData }>();
const { dataIns } = toRefs(props);

const categorys = inject<IcategorysObjArr>("categorys");

const myModal = ref<{ [key: string]: any }>();
onMounted(() => {
  document.documentElement.setAttribute("data-bs-theme", "dark");
  //@ts-ignore
  myModal.value = new bootstrap.Modal(document.getElementById("dateModal"), {
    keyboard: false,
  });
});

// const compData = computed(() => {
//   return allData!.value.sort((a, b) => new Date(<string>a.date).getTime() - new Date(<string>b.date).getTime());
// });

const selectedDate = ref(null);

const confirmDate = () => {
  if (!selectedDate) {
    return;
  }
  let newData = categorys!.map(({ prop }) => [prop, new CateValues()]);
  dataIns.value.allData.push(new CategorysObj(selectedDate.value!, Object.fromEntries([...newData])));
  myModal.value!.hide();
};

onMounted(SetModalHidenCallBack);

function SetModalHidenCallBack() {
  let modal = document.getElementById("dateModal");
  //@ts-ignore
  modal!.addEventListener("hidden.bs.modal", () => {
    selectedDate.value = null;
  });
}

function cateValsAdd(e: Event, cateObj: IcategorysObj, prop: Icategorys) {
  let InpDom = e.target as HTMLInputElement;
  //@ts-ignore
  let preInpVal = InpDom.previousSibling!.value;
  if (preInpVal) {
    cateObj[prop].add(Number(preInpVal));
    //@ts-ignore
    InpDom.previousSibling!.value = null;
  }
}
</script>

<style lang="less" scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css");
.tableDataRoot {
  font-size: 14px;
}
table {
  th,
  td {
    text-align: center;
  }
}
</style>
