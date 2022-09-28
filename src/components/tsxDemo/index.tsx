import { defineComponent, ref, unref } from 'vue'
import { ElButton,ElHeader } from "element-plus";

export default defineComponent({
    props: {
        testData:String
    },
    emits: [],
    components: {},
    setup(props,ctx) {
        const testFont = ref<number | string>(0)
        setInterval(() => {
            if(typeof testFont.value === 'number') {
                testFont.value++;
                console.log(unref(testFont));
            }
        },1000)
        const getHeader = ()=>{
            let fontNode = <span style={{color:'red'}}>{testFont.value}</span>
            let outerNode = <ElHeader class="testHeader">{fontNode}</ElHeader>
            return outerNode
        }
        const testList = Array.from({length:20}).map(()=><ElButton>测试tsx组件</ElButton>)
        return () => <>
                        {getHeader()}
                        {testList}
                    </>
    }
})