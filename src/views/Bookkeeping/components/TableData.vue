<template>
  <div>
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
          <tr v-for="(data, dataI) in compData" @click="editRow(data, dataI)">
            <td>{{ data.date }}</td>
            <td v-for="(ctgr, ctgrI) in categorys">{{ data[ctgr.prop] }}</td>
            <td>{{ data.allin }}</td>
          </tr>
          <!-- 合计 -->
          <tr>
            <td class="bg-body-secondary" :style="{ color: '#0a58ca' }">合计</td>
            <td class="bg-body-secondary" :style="{ color: '#0a58ca' }" v-for="(ctgr, ctgrI) in categorys">{{ summation[ctgr.prop] }}</td>
            <td class="bg-body-secondary" :style="{ color: '#0a58ca' }">{{ summation.allin }}</td>
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
            <input type="date" class="form-control mb-3" :disabled="editing" v-model="selectedValues.date" />
            <div class="input-group mb-3" v-for="item in categorys">
              <button type="button" class="btn btn-outline-secondary">
                <i :class="item.icon"></i>
                <div class="mr-3" style="display: inline-block; text-align: center; width: 2em">{{ item.label }}</div>
              </button>
              <!-- @vue-ignore -->
              <input type="number" class="form-control" v-model="selectedValues[item.prop]" aria-label="Text input with segmented dropdown button" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="confirmDate" v-if="!editing">添加</button>
            <button type="button" class="btn btn-primary" v-else @click="confirmEdit">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js";
import { onMounted, ref, computed, toRef, Ref, unref, inject, toRefs, defineProps } from "vue";
import { Icategorys, IcategorysObj, IcategorysObjArr } from "../index.d";

const props = defineProps<{ allData: IcategorysObj[]; summation: IcategorysObj }>();
const { allData, summation } = toRefs(props);

const categorys = inject<IcategorysObjArr>("categorys");

const resetData: IcategorysObj = {
  date: null,
  food: null,
  clothes: null,
  entertainment: null,
  traffic: null,
  daily: null,
  others: null,
  allin: null,
};

const myModal = ref<{ [key: string]: any }>();
onMounted(() => {
  //@ts-ignore
  myModal.value = new bootstrap.Modal(document.getElementById("dateModal"), {
    keyboard: false,
  });
});

const compData = computed(() => {
  return allData!.value.sort((a, b) => new Date(<string>a.date).getTime() - new Date(<string>b.date).getTime());
});

const selectedValues = ref({ ...resetData });

const editing = ref(false);
const editingIndex = ref();
const confirmDate = () => {
  if (!selectedValues.value.date) {
    return;
  }
  let addNew = deepClone(selectedValues.value);
  compAllIn(addNew);
  //@ts-ignore

  allData.value.push(addNew);
  myModal.value!.hide();
};
const editRow = (data: any, dataI: number) => {
  editing.value = true;
  selectedValues.value = deepClone(data);
  editingIndex.value = dataI;
  myModal.value!.show();
};
const confirmEdit = () => {
  let target = toRef(allData!.value, editingIndex.value);
  target.value = deepClone(selectedValues.value);
  compAllIn(target);
  editingIndex.value = undefined;
  myModal.value!.hide();
};

onMounted(SetModalHidenCallBack);

function SetModalHidenCallBack() {
  [["dateModal", selectedValues]].forEach(([id, refCtx]) => {
    let modal = document.getElementById(id as string);
    //@ts-ignore
    modal!.addEventListener("hidden.bs.modal", () => {
      selectedValues.value = {
        date: null,
        food: null,
        clothes: null,
        entertainment: null,
        traffic: null,
        daily: null,
        others: null,
        allin: null,
      };
      editing.value = false;
    });
  });
}
function deepClone(params: object) {
  return JSON.parse(JSON.stringify(params));
}
function compAllIn(target: Ref<typeof resetData> | typeof resetData) {
  target = unref(target);
  target.allin = target.allin = Object.keys(target).reduce((pre, curr) => {
    if (curr !== "date" && curr !== "allin") {
      //@ts-ignore
      return pre + target[curr];
    } else {
      return pre;
    }
  }, 0);
}
</script>

<style lang="less" scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css");
</style>
