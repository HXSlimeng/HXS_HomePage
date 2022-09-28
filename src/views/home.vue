<template>
    <div class="common-layout">
        <PageHead></PageHead>
        <div :class="{introduce:true,introducePos:landing}">
            <div class="webglMale" :class="{landingOuter:landing}">
                <div class="banner1" v-if="landing">Banner1Text Banner1Text Banner1Text Banner1Text </div>
                <div class="banner2" v-if="landing">Banner1Text Banner1Text Banner1Text Banner1Text </div>
            </div>
            <div class="aboutMeText">
                <div class="textContent">
                    <div class="bgtext">HELLO</div>
                    <div>I'm</div>
                    <div>LiMeng <span class="name">李孟</span></div>
                    <div class="job">A <span class="name">Front End Engineer</span> & Bug Maker😏</div>
                </div>
                <div class="moduleOuter"></div>
                <!-- <div  class="circleLines"/> -->
            </div>
        </div>
        <div>
            <ShadowText :text="'What I Do'"></ShadowText>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useThree } from "@/hooks/useThree";
import { onMounted,ref} from 'vue';
import ShadowText from '@/components/ShadowText/index.vue';
import PageHead from '@/components/pageHead/index.vue'
import gsap from 'gsap'
import { template } from "lodash";
const landing = ref(true)
const { tCamera, humanActions, tRenderer, moveHuman2Idle, controls } = useThree(afterLandingComplete)
function afterLandingComplete() {
    let tl = gsap.timeline()
    let humanCanvas = document.querySelector(".webglMale")
    let afterHumanFadeOut = () => {
        landing.value = false;
        let textDoms = document.querySelector('.textContent')
        textDoms?.childNodes.forEach(ele=>tl.fromTo(ele, { y: 100, opacity: 0 },{y:0,opacity:1,duration:1},'-=0.6'))
        moveHuman2Idle()
        tl.to(humanCanvas, {opacity: 1})
    }
    tl.addLabel("beforeBanner",2)
    tl.from('.banner1',{x:1000,y:-1000, duration:4,ease:'power4'})
    tl.from('.banner2',{x:-1000,y:1000, duration:4,ease:'power4'},'-=4')
    tl.seek("beforeBanner")
    tl.to(humanCanvas, {opacity: 0, onComplete:afterHumanFadeOut})}

onMounted(() => {
    let faDom = document.querySelector('.webglMale');
    faDom?.appendChild(tRenderer.domElement);
})

</script>


<style lang='less' scoped>

.common-layout {
    font-size: 20px;
    min-height: 100vh;
    width: 100%;
    background: @prmy-bg;
    background-repeat: repeat-y;
    .introducePos {
        position: absolute !important;
    }

    .introduce {
        width: 100%;
        height: calc(100% - @headerHeight) ;
        background-image: url('../assets/Rectangle56.png');
        position: relative;
        padding-top: 100px;
        min-height: 100vh;
        .webglMale {
            position: absolute;
            left: calc(53vw - 200px);
            top: 180px;
            z-index: 2;
            cursor: grab;
            // background: rgba(255, 255, 255, .4);
            clip-path: path('M 0,0 L 0,155 L 303,453 C 368,508 404,442 423,427 L 720,120 L 700,0 z');

            @bannerTextSize:100px;
            .banner1{
                position: absolute;
                height: 180px;
                width: 3000px;
                font-size: @bannerTextSize;
                transform: rotate(-45deg);
                line-height:180px;
                color: #d3d3d3;
                font-weight: 700;
                background-color: @mainColor;
                left: 10vw;
                &::before{
                    content:'';
                    display:block;
                    color: #393E46;
                    position:relative;
                    bottom: 20px;
                    height: 20px;
                    width: 100%;
                    background: 
                    repeating-linear-gradient(135deg, currentColor 0 15px,#0000 0 20px) left top,
                    repeating-linear-gradient( 45deg, currentColor 0 15px,#0000 0 20px) left bottom;
                    background-size:  200% 50%;
                    background-repeat: no-repeat;
                    animation:i4 2s infinite linear;
                    @keyframes i4 {
                            100% {background-position:top left,bottom left}
                    }
                }
                &::after{
                    content:'';
                    display:block;
                    color: #393E46;
                    height: 20px;
                    width: 100%;
                    position:relative;
                    bottom: 20px;
                    background: 
                    repeating-linear-gradient(135deg, currentColor 0 15px,#0000 0 20px) left top,
                    repeating-linear-gradient( 45deg, currentColor 0 15px,#0000 0 20px) left bottom;
                    background-size:  200% 50%;
                    background-repeat: no-repeat;
                    animation:i4 2s infinite linear;
                    
                    @keyframes i4 {
                            100% {background-position:top right,bottom right}
                    }
                }
            }
            .banner2{
                .banner1();
                left:unset;
                right:10vw;
                bottom: 0;
                &::before{
                    transform: rotate(180deg);
                }
                &::after{
                    transform: rotate(180deg);
                }
            }
            
        }

        .aboutMeText {
            font-size: 64px;
            color: #fff;
            font-weight: bolder;
            line-height: 80px;

            .textContent {
                position: relative;
                left: 5vw;
                div{
                    opacity: 0;
                }
                .bgtext {
                    font-size: 200px;
                    user-select: none;
                    color: #393E46;
                    line-height: 200px;
                }

                .name {
                    color: @mainColor;
                }

                .job {
                    font-size: 24px;

                    &::before {
                        content: '';
                        display: block;
                        height: 4px;
                        width: 6em;
                        background-color: @mainColor;
                        border-radius: 5px;
                        margin-bottom: 10px;
                    }
                }
            }

            .circleLines {
                width: 100vw;
                min-height: 1000px;
                z-index: 0;
                background: url('../assets/BG.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }
        }

        .moduleOuter {
            position: absolute;
            left: 53vw;
            top: 316px;
            width: 300px;
            height: 300px;
            background-color: @mainColor;
            border-radius: 20%;
            transform: rotate(45deg);
        }

        .landingOuter {
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 10;
            background-color: @prmy-bg;
            clip-path:unset;
            background-image: url('@/assets/Rectangle56.png');
            overflow: hidden;
        }
    }

}
</style>
