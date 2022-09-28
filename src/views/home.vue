<template>
    <div v-if="moduleLoading" class="loadingPage">
        loading...
    </div>
    <div class="common-layout" v-show="!moduleLoading">
        <PageHead></PageHead>
        <div :class="{introduce:true}">
            <div class="webglMale" :class="{landingOuter:landing}">
                <div class="banner1" v-if="landing">Banner1Text Banner1Text Banner1Text Banner1Text </div>
                <div class="banner2" v-if="landing">Banner1Text Banner1Text Banner1Text Banner1Text </div>
            </div>
            <div class="aboutMeText">
                <div class="textContent">
                    <span class="bgtext">HELLO</span>
                    <div>I'm</div>
                    <!-- <div>LiMeng <span class="name">李孟</span></div> -->
                    <div class="job">A <span class="name">Front End Engineer</span> & Bug Maker😏</div>
                </div>
                <div class="moduleOuter"></div>
                <!-- <div  class="circleLines"/> -->
            </div>
            <div class="hangingContact">
                <span class="topTi">
                    Contact Me
                </span>
                <div class="lineVer">

                </div>
                <div class="concatItem">
                    <svg-icon name="fullScreen" class="concatIcon"></svg-icon>
                </div>
            </div>
        </div>
        <div class="aboutMySkills">
            <ShadowText :text="'What I Do'"></ShadowText>
            <div class="skill_block">
                <div class="skillItem" v-for="item in 4">
                    <svg-icon name="fullScreen" class="skillIcon"></svg-icon>
                    <div class="skillTitle">Product Design</div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang='ts'>
import { useThree } from "@/hooks/useThree";
import { onMounted, ref } from 'vue';
import ShadowText from '@/components/ShadowText/index.vue';
import PageHead from '@/components/pageHead/index.vue'
import gsap from 'gsap'
const landing = ref(true)
const { tCamera, humanActions, tRenderer, moveHuman2Idle, controls, moduleLoading } = useThree(afterLandingComplete)
function afterLandingComplete() {
    let tl = gsap.timeline()
    let humanCanvas = document.querySelector(".webglMale")
    let afterHumanFadeOut = () => {
        landing.value = false;
        let textDoms = document.querySelector('.textContent')
        //除背景的HELLO文字其余添加动画
        textDoms?.childNodes.forEach(ele => ele.nodeName === "DIV" && tl.fromTo(ele, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.6'))
        moveHuman2Idle()
        tl.fromTo('.moduleOuter', { rotation: 45 }, { scale: 1, rotation: 45, ease: 'elastic', duration: 1.2 }, '-=1')
        tl.to(humanCanvas, { opacity: 1 })
    }
    tl.from('.banner1', { x: 1000, y: -1000, duration: 4, ease: 'power4' })
    tl.from('.banner2', { x: -1000, y: 1000, duration: 4, ease: 'power4' }, '-=4')

    tl.to(humanCanvas, { opacity: 0, onComplete: afterHumanFadeOut })
}

onMounted(() => {
    let faDom = document.querySelector('.webglMale');
    faDom?.appendChild(tRenderer.domElement);
})

</script>


<style lang='less' scoped>
.common-layout {
    font-size: 20px;
    width: 100%;
    background: @prmy-bg;
    background-repeat: repeat-y;
    display: flex;
    flex-direction: column;
    justify-content: center;


    .introduce {
        width: 100%;
        min-height: calc(100vh - @headerHeight);
        background-image: url('../assets/Rectangle56.png');
        position: relative;
        padding-top: 100px;

        .webglMale {
            position: absolute;
            right: 0px;
            top: 180px;
            z-index: 2;
            cursor: grab;
            // background: rgba(255, 255, 255, .4);
            clip-path: path('M 187,0 L 147,297 L 303,453 C 368,508 404,442 423,427 L 561,292 L 508,0 z');

            @bannerTextSize: 100px;

            .banner1 {
                position: absolute;
                height: 180px;
                width: 3000px;
                font-size: @bannerTextSize;
                transform: rotate(-45deg);
                line-height: 180px;
                color: #d3d3d3;
                font-weight: 700;
                background-color: @mainColor;
                left: 10vw;

                &::before {
                    content: '';
                    display: block;
                    color: #393E46;
                    position: relative;
                    bottom: 20px;
                    height: 20px;
                    width: 100%;
                    background:
                        repeating-linear-gradient(135deg, currentColor 0 15px, #0000 0 20px) left top,
                        repeating-linear-gradient(45deg, currentColor 0 15px, #0000 0 20px) left bottom;
                    background-size: 200% 50%;
                    background-repeat: no-repeat;
                    animation: i4 2s infinite linear;

                    @keyframes i4 {
                        100% {
                            background-position: top left, bottom left
                        }
                    }
                }

                &::after {
                    content: '';
                    display: block;
                    color: #393E46;
                    height: 20px;
                    width: 100%;
                    position: relative;
                    bottom: 20px;
                    background:
                        repeating-linear-gradient(135deg, currentColor 0 15px, #0000 0 20px) left top,
                        repeating-linear-gradient(45deg, currentColor 0 15px, #0000 0 20px) left bottom;
                    background-size: 200% 50%;
                    background-repeat: no-repeat;
                    animation: i4 2s infinite linear;

                    @keyframes i4 {
                        100% {
                            background-position: top right, bottom right
                        }
                    }
                }
            }

            .banner2 {
                .banner1();
                left: unset;
                right: 10vw;
                bottom: 0;

                &::before {
                    transform: rotate(180deg);
                }

                &::after {
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

                div {
                    filter: drop-shadow(2px 4px 6px black);
                    opacity: 0;
                }

                .bgtext {
                    font-size: 200px;
                    user-select: none;
                    opacity: .6;
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
            right: 200px;
            top: 316px;
            width: 300px;
            height: 300px;
            background-color: @mainColor;
            border-radius: 20%;
            transform: rotate(45deg);
            scale: 0;
        }

        .hangingContact {
            position: fixed;
            right: 40px;
            top: 100px;
            width: 54px;
            height: 300px;
            display: flex;
            flex-direction: column;
            align-items: center;
            row-gap: 10px;
            font-size: 24px;

            .topTi {
                writing-mode: vertical-rl;
            }

            .lineVer {
                height: 100px;
                width: 5px;
                border-radius: 10px;
                background-color: @mainColor;
            }

            .concatItem {
                background: #393E46;
                width: 45px;
                height: 45px;
                display: flex;
                justify-content: center;
                align-items: center;
                clip-path: path('M 22.5,0 L 0,13 L 0,33 L 22.5,45 L 45,33 L 45,13 z');

                .concatIcon {
                    height: 40%;
                    width: 40%;
                }
            }
        }

        .landingOuter {
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 10;
            background-color: @prmy-bg;
            clip-path: unset;
            background-image: url('@/assets/Rectangle56.png');
            overflow: hidden;
        }
    }

    .aboutMySkills {
        .skill_block {
            min-width: 900px;
            max-width: 100%;
            margin: 50px 120px;
            display: grid;
            grid-template-columns: repeat(4, 225px);
            grid-template-rows: repeat(1, 225px);
            column-gap: auto;
            justify-content: space-between;

            .skillItem {
                color: @mainColor;
                background: @sub-bg;
                border-radius: 23px;
                font-size: 12px;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;

                .skillIcon {
                    height: 80px;
                    width: 80px;
                }

                .skillTitle {
                    color: #fff;
                    font-size: 22px;
                }
            }
        }
    }

}

.loadingPage {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    color: #fff;
    font-size: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    background: @prmy-bg;
}
</style>
