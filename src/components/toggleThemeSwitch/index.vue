<template>
    <div id="animateBtn">
        <input type="checkbox" v-model="themeChecked" class="checkbox" @change="setTheme" />
        <div class="knobs">
            <svg-icon :name="themeChecked ? 'darkMode' : 'lightMode'" :size="'14px'"></svg-icon>
        </div>
        <div class="layer"></div>
    </div>
</template>

<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue';
const themeChecked = ref(true)
const themeStr = computed(() => {
    return themeChecked.value ? 'dark' : 'light'
})
const setTheme = () => {
    let html = <HTMLElement>document.querySelector('html')
    html.dataset.theme = themeStr.value
    localStorage.setItem('local-theme', themeStr.value)

}
const initTheme = () => {
    let html = <HTMLElement>document.querySelector('html')
    let strogeTheme = localStorage.getItem('local-theme')

    if (strogeTheme) {
        themeChecked.value = strogeTheme == 'dark'
        html.dataset.theme = strogeTheme
    } else {
        localStorage.setItem('local-theme', 'dark')
        html.dataset.theme = 'dark'
    }
}
onMounted(() => {
    initTheme()
})

</script>

<style lang='less' scoped>
#animateBtn {
    width: 55px;
    height: 25px;
    position: relative;


    .knobs {
        position: absolute;
        top: 2px;
        left: 4px;
        width: 21px;
        height: 21px;
        border-radius: 10px;
        background-color: var(--prmy-bg);
        z-index: 2;
        text-align: center;
        line-height: 20px;
        color: var(--font-sub-color);
        transition: 0.3s ease all, left 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15);
    }

    .layer {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: var(--obv-bg);
        box-shadow: 0px 0px 2px 0px var(--font-prmy-color);
        border-radius: 100px;
        z-index: 1;
    }

    .checkbox {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 3;
        opacity: 0;
        cursor: pointer;

        &:active+.knobs {
            width: 40px;
        }

        &:checked+.knobs {
            left: 30px;
        }

        &:checked:active+.knobs {
            margin-left: -19px;
        }

    }
}
</style>
