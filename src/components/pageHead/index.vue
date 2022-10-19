<template>
    <header class="mainHeader">
        <nav :class="{headerNavs:true, menuOpen:menuOpened}">
            <div v-for="nav in navItems" :class="{navItem:true,activeNav:nav.active,}">
                <a @click="scrollToPart(nav.target)">{{nav.text}}</a>
            </div>
        </nav>
        <ToggleThemeSwitch></ToggleThemeSwitch>
        <div class="mobileTiOuter">
            <div class="mobileTi" :style="{bottom:`${activeNavItemIndex * 60}px`}">
                <div v-for="item in navItems" :class="{mobileTiItem:true,mobileTiNotActive:item.active}">{{item.text}}
                </div>
            </div>
        </div>
        <div class="toggleMenuBtn" @click="showMenu">
            <svg-icon :name="menuOpened ? 'menuClosed' : 'menuOpened'"></svg-icon>
        </div>
    </header>
</template>

<script setup lang='ts'>
import { ref, unref } from 'vue';
import ToggleThemeSwitch from '@/components/toggleThemeSwitch/index.vue';
import { computed } from '@vue/reactivity';
import { debounce } from "lodash";


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

const activeNavItemIndex = computed(() => navItems.value.findIndex(v => v.active))
const menuOpened = ref(false)

const scrollToPart = (tarSign: string) => {
    navItems.value.forEach(v => v.active = v.target == tarSign)
    let dom = document.querySelector(`.${tarSign}`) as HTMLElement
    dom.scrollIntoView({ behavior: 'smooth', })
    menuOpened.value = false
}
const showMenu = () => {
    menuOpened.value = !unref(menuOpened)
}
defineExpose({
    navItems
})
</script>

<style lang='less'>
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
    border-bottom: solid 2px var(--sub-bg);

    .headerNavs {
        display: flex;
        justify-content: space-around;
        column-gap: 10px;
        transition: all .3s;

        .navItem {
            font-size: 24px;
            transition: .3s;
            width: 150px;
            text-align: center;

            a {
                position: relative;
                display: inline-block;
                color: var(--font-prmy-color);
                cursor: pointer;

                &:hover {
                    color: var(--mainColor);
                }

                &::after {
                    content: '';
                    display: block;
                    width: 0;
                    height: 2px;
                    position: absolute;
                    bottom: -8px;
                    border-radius: 5px;
                    transition: width .3s;
                    background: var(--mainColor);
                }
            }
        }

        .activeNav {
            a {
                transition: .3s;
                color: var(--mainColor);

                &::after {
                    width: 100%;
                }
            }
        }
    }

    .mobileTiOuter {
        display: none;
    }


    .toggleMenuBtn {
        display: none;
    }


}

@import '@/css/mobile.less';
</style>
