<template>
    <header :class="{mainHeader:true,visible:visible}">
        <nav class="headerNavs">
            <div v-for="nav in navItems" :class="{navItem:true,activeNav:nav.active,}"> <a
                    @click="scrollToPart(nav.target)">{{nav.text}}</a></div>
        </nav>
    </header>
</template>

<script setup lang='ts'>
import { useHeaderCtl } from '@/hooks/useHeadCtl';
import { ref } from 'vue';

interface InavItem {
    text: string,
    target: string,
    active: boolean
}

const navItems = ref<InavItem[]>([
    {
        text: 'Home',
        target: 'introduce',
        active: true
    },
    {
        text: 'About Me',
        target: 'aboutMySkills',
        active: false
    },
    {
        text: 'Portfolio',
        target: 'recentWork',
        active: false
    },
    {
        text: 'Contact',
        target: 'Contact',
        active: false
    },
])

// const { visible } = useHeaderCtl()
const visible = ref(true)
const scrollToPart = (tarSign: string) => {
    navItems.value.forEach(v => v.active = v.target == tarSign)
    let dom = document.querySelector(`.${tarSign}`) as HTMLElement
    dom.scrollIntoView({ behavior: 'smooth', })
}
defineExpose({
    navItems
})
</script>

<style lang='less' scoped>
.mainHeader {
    height: @headerHeight;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    display: flex;
    align-items: center;
    padding: 0 20px;
    background-image: radial-gradient(transparent 1px, @prmy-bg 1px);
    background-size: 4px 4px;
    backdrop-filter: blur(10px);
    transition: all 0.3s;
    transform: translate3d(0, -100%, 0);

    .headerNavs {
        display: flex;
        column-gap: 10px;

        .navItem {
            font-size: 24px;
            transition: .3s;
            width: 150px;
            text-align: center;

            a {
                color: #fff;
                cursor: pointer;
                transition: .3s;

                &:hover {
                    color: @mainColor;
                }
            }
        }

        .activeNav {
            a {
                filter: drop-shadow(0px 0px 10px @mainColor);
                // text-shadow: 0px 0px 2px @mainColor;
                transition: .3s;
                color: @mainColor;
            }
        }
    }

}

.visible {
    transform: translateY(0);
}

@import '@/css/mobile.less';
</style>
