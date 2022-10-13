<template>
    <header :class="{mainHeader:true,visible:visible}">
        <nav :class="{headerNavs:true, menuOpen:menuOpened}">
            <div v-for="nav in navItems" :class="{navItem:true,activeNav:nav.active,}">
                <a @click="scrollToPart(nav.target)">{{nav.text}}</a>
            </div>
        </nav>
        <ToggleThemeSwitch></ToggleThemeSwitch>
        <div @click="showMenu">
            <svg-icon :name="menuOpened ? 'menuClosed' : 'menuOpened'"></svg-icon>
        </div>
    </header>
</template>

<script setup lang='ts'>
import { useHeaderCtl } from '@/hooks/useHeadCtl';
import { ref, unref } from 'vue';
import ToggleThemeSwitch from '@/components/toggleThemeSwitch/index.vue';

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
const menuOpened = ref(false)

// const { visible } = useHeaderCtl()
const visible = ref(true)
const scrollToPart = (tarSign: string) => {
    navItems.value.forEach(v => v.active = v.target == tarSign)
    let dom = document.querySelector(`.${tarSign}`) as HTMLElement
    dom.scrollIntoView({ behavior: 'smooth', })
}
const showMenu = () => {
    menuOpened.value = !unref(menuOpened)
    // let dom = document.querySelector('.headerNavs')
    // gsap.to(dom, { opacity: 1, width: 'min-content', height: 'min-content', display: 'unset' })
}
defineExpose({
    navItems
})
</script>

<style lang='less' scoped>
.mainHeader {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    height: @headerHeight;
    width: calc(100vw - 40px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    backdrop-filter: blur(10px);
    background-image: radial-gradient(transparent 1px, var(--prmy-bg) 1px);
    background-size: 4px 4px;
    transform: translate3d(0, -100%, 0);
    border-bottom: solid 2px var(--sub-bg);

    .headerNavs {
        display: flex;
        column-gap: 10px;
        transition: all .3s;

        .navItem {
            font-size: 24px;
            transition: .3s;
            width: 150px;
            text-align: center;

            a {
                color: var(--font-prmy-color);
                cursor: pointer;
                transition: .3s;

                &:hover {
                    color: var(--mainColor);
                }
            }
        }

        .activeNav {
            a {
                filter: drop-shadow(0px 0px 10px var(--mainColor));
                text-shadow: 0px 0px 2px var(--mainColor);
                transition: .3s;
                color: var(--mainColor);
            }
        }
    }


}

.visible {
    transform: translateY(0);
}

@import '@/css/mobile.less';
</style>
