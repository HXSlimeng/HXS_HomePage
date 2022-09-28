import { ref, watch, reactive } from "vue";
// import { ElMessage } from "element-plus";

export default function () {
    interface personTest {
        name: string,
        age: number
    }
    const person: personTest = reactive({
        name: '李孟',
        age: 23
    });
    let cNameVis = ref(false);
    let newName = ref('');

    function changeName(): void {
        cNameVis.value = false;
        person.name = newName.value;


    };
    function getOld() {
        person.age++;
    }
    function handelDialog() {
        // ElMessage.info('测试信息')
    }
    function getYoung() {
        person.age--;
    }
    watch(
        () => person.age,
        (newval: number, oldval: number) => {
            if (newval > 30) {
                handelDialog()
            }
        })
    return {
        person,
        changeName,
        getOld,
        getYoung,
        cNameVis,
        newName
    }
}