<template>
    <header class="mainHeader">
            <nav class="headerNavs">
                <div v-for="nav in navItems" :class="{navItem:true,activeNav:nav.active,}"> <a @click="scrollToPart(nav.target)">{{nav.text}}</a></div>
            </nav>
    </header>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
interface InavItem {
    text:string,
    target:string,
    active:boolean
}
    const navItems = ref<InavItem[]>([
        {
            text: 'Home',
            target: 'Home',
            active:true
        },
        {
            text: 'About Me',
            target: 'About Me',
            active:false
        },
        {
            text: 'Portfolio',
            target: 'Portfolio',
            active:false
        },
        {
            text: 'Contact',
            target: 'Contact',
            active:false
        },
    ])
    const scrollToPart = (tarSign:string)=>{
        navItems.value.forEach(v=>v.active = v.target == tarSign)
    }
</script>

<style lang='less' scoped>
    .mainHeader {
        height: @headerHeight;
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        z-index: 10;
        display: flex;
        align-items: center;
        padding:0 20px;
        background-image: radial-gradient(transparent 1px,@prmy-bg 1px);
        background-size: 4px 4px;
        backdrop-filter: blur(10px);
        .headerNavs{
            display: flex;
            column-gap: 10px;
            .navItem{
                font-size: 24px;
                transition: .3s;
                width: 150px;
                text-align: center;
                a{
                    color: #fff;
                    cursor: pointer;
                    &:hover{
                        transition: .3s;
                        color: @mainColor;
                    }
                }
            }
            .activeNav{
                a{
                    transition: .3s;
                    color: @mainColor;
                }
            }
        }
    }
</style>
