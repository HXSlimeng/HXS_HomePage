<template>
    <div v-if="moduleLoading" class="loadingPage">
        loading...
    </div>
    <div :class="{'common-layout':true,hideOverlay:landing}" v-show="!moduleLoading">
        <PageHead ref="pageHead"></PageHead>
        <!--  <div class="hangingContact menuPart">
            <span class="topTi">
                Contact Me
            </span>
            <div class="lineVer"></div>
            <a href="https://github.com/HXSlimeng/HXS_HomePage/tree/master" target="_blank">
                <div class="concatItem">
                    <svg-icon name="github" class="concatIcon"></svg-icon>
                </div>
            </a>
        </div> -->
        <div class="introduce menuPart">
            <div class="aboutMeText">
                <div class="textContent">
                    <span class="bgtext">HELLO</span>
                    <div>I'm</div>
                    <div>LiMeng <span class="name">李孟</span></div>
                    <div class="job">A <span class="name">Front-End Engineer💻</span></div>
                </div>
            </div>
            <div :class="{moduleMain:true, moduleLanding:landing}">
                <div class="moduleOuter"></div>
                <div class="webglMale landingOuter">
                    <!-- <div class="banner1" v-if="landing">Banner1Text Banner1Text Banner1Text Banner1Text </div> -->
                    <!-- <div class="banner2" v-if="landing">Banner1Text Banner1Text Banner1Text Banner1Text </div> -->
                </div>
            </div>
            <div class="bottomBlock">
                <div class="infoItem">
                    <svg-icon name="github" class="btmBlockIcon"></svg-icon>
                    <span>天津 TianJin</span>
                </div>
                <div class="infoItem">
                    <svg-icon name="fullScreen" class="btmBlockIcon"></svg-icon>
                    <span>职业</span>
                </div>
                <div class="infoItem">
                    <svg-icon name="fullScreen" class="btmBlockIcon"></svg-icon>
                    <span>职业</span>
                </div>
                <div class="infoItem">
                    <svg-icon name="fullScreen" class="btmBlockIcon"></svg-icon>
                    <span>职业</span>
                </div>
            </div>
        </div>
        <div class="aboutMySkills menuPart">
            <ShadowText :text="'What I Do'"></ShadowText>
            <div class="skill_block">
                <div class="skillItem" v-for="item in 4">
                    <svg-icon name="fullScreen" class="skillIcon"></svg-icon>
                    <div class="skillTitle">Product Design</div>
                </div>
            </div>
        </div>
        <div class="recentWork menuPart">
            <ShadowText :text="'Recent Works'"></ShadowText>
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
import { useThree } from "@/hooks/useThree"
import { useIfPartDisplay } from "@/hooks/useIfPartDisplay"
import { nextTick, onMounted, ref, computed } from 'vue'
import ShadowText from '@/components/shadowText/index.vue'
import PageHead from '@/components/pageHead/index.vue'
import gsap from 'gsap'
const pageHead = ref<InstanceType<typeof PageHead> | null>(null)
const landing = ref(true)
const { tCamera, humanActions, tRenderer, moveHuman2Idle, controls, moduleLoading, mobileMedia } = useThree(afterLandingComplete)

function afterLandingComplete() {

    let tl = gsap.timeline()
    let humanCanvas = document.querySelector(".webglMale")
    let afterHumanFadeOut = () => {
        landing.value = false
        let textDoms = document.querySelector('.textContent')
        let btmBlock = document.querySelector('.bottomBlock')
        //除背景的HELLO文字其余添加动画
        // mobileMedia && tl.to('.moduleMain', { scale: 0.7, duration: .1 })
        textDoms?.childNodes.forEach(ele => ele.nodeName === "DIV" && tl.fromTo(ele, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.6'))
        moveHuman2Idle()
        tl.fromTo('.moduleOuter', { rotation: 45 }, { scale: 1, rotation: 45, ease: 'elastic', duration: 1.2 }, '-=1')
        tl.to(humanCanvas, { opacity: 1 })
        tl.to(btmBlock, { width: 400, height: 110, opacity: 1 }, '-=1')
    }
    // tl.from('.banner1', { x: 1000, y: -1000, duration: 4, ease: 'power4' })
    // tl.from('.banner2', { x: -1000, y: 1000, duration: 4, ease: 'power4' }, '-=4')

    tl.to(humanCanvas, { opacity: 0, onComplete: afterHumanFadeOut })

}
const menuObserverCallback: IntersectionObserverCallback = (entries, observer) => {
    let tl = gsap.timeline()
    entries.forEach(entry => {
        let targetClasslist = entry.target.classList.value
        if (entry.intersectionRatio >= 0.6) {
            pageHead.value?.navItems.forEach(v => v.active = targetClasslist.includes(v.target))
        } else if (targetClasslist.includes('introduce') || targetClasslist.includes('hangingContact')) {
            return;
        } else if (entry.intersectionRatio >= 0.2 && entry.intersectionRatio < 0.5) {
            entry.target.childNodes.forEach(el => {
                tl.fromTo(el, { y: -50, opacity: 0 }, { opacity: 1, y: 0 })
            })
        } else if (entry.intersectionRatio < 0.2) {
            entry.target.childNodes.forEach(el => {
                gsap.to(el, { opacity: 0 })
            })
        }
    })
}

onMounted(() => {
    let faDom = document.querySelector('.webglMale');
    faDom?.appendChild(tRenderer.domElement);
    useIfPartDisplay(menuObserverCallback);
    document.body.classList.add('normal')
})

</script>


<style lang='less' scoped>
.common-layout {
    font-size: 20px;
    min-width: 1400px;
    background: var(--prmy-bg);
    background-repeat: repeat-y;
    display: flex;
    flex-direction: column;
    transition: all .3s;

    .introduce {
        height: min-content;
        min-height: calc(100vh - @headerHeight);
        // min-width: 1460px;
        background-image: url('../assets/Rectangle56.png');
        position: relative;
        padding-top: @headerHeight;
        display: grid;
        justify-content: center;
        grid-template-rows: min-content auto;
        grid-template-columns: repeat(2, 700px);

        .aboutMeText {
            height: min-content;
            font-size: 48px;
            color: var(--font-prmy-color);
            font-weight: bolder;
            line-height: 64px;
            position: relative;
            word-break: break-all;

            .textContent {
                position: relative;
                padding-top: 50px;
                padding-left: 20px;

                div {
                    filter: drop-shadow(2px 4px 6px var(--prmy-bg));
                    opacity: 0;
                }

                .bgtext {
                    font-size: 200px;
                    user-select: none;
                    opacity: .4;
                    color: var(--font-prmy-color);
                    line-height: 200px;
                }

                .name {
                    color: var(--mainColor);
                }

                .job {
                    font-size: 24px;

                    &::before {
                        content: '';
                        display: block;
                        height: 4px;
                        width: 6em;
                        background-color: var(--mainColor);
                        border-radius: 5px;
                        margin-bottom: 10px;
                    }
                }
            }

            .textAfter {
                position: absolute;
                width: 100%;
                height: 180px;
                left: 0;
                bottom: 0;
            }
        }

        .moduleMain {
            position: relative;
            transform: unset;
            display: flex;
            justify-content: center;
            height: min-content;

            .webglMale {
                position: relative;
                z-index: 2;
                cursor: grab;
                // background: rgba(255, 255, 255, .4);
                clip-path: path('M 187,0 L 147,297 L 303,453 C 368,508 404,442 423,427 L 561,292 L 508,0 z');
                @bannerTextSize: 100px;

                .banner1 {
                    position: absolute;
                    height: 180px;
                    width: 3000px;
                    font-size: 1rem;
                    line-height: 180px;
                    color: #d3d3d3;
                    font-weight: 700;
                    background-color: var(--mainColor);

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
                    bottom: 0;

                    &::before {
                        transform: rotate(180deg);
                    }

                    &::after {
                        transform: rotate(180deg);
                    }
                }

            }

            .moduleOuter {
                position: absolute;
                margin: auto;
                top: 136px;
                width: 300px;
                height: 300px;
                background-color: var(--mainColor);
                border-radius: 20%;
                transform: rotate(45deg);
                scale: 0;
            }

            .moduleAfter {
                .aboutMeText.textAfter()
            }
        }

        .moduleLanding {
            .landingOuter {
                position: fixed;
                top: 0;
                left: 0;
                // bottom: 0;
                z-index: 10;
                background-color: var(--prmy-bg);
                clip-path: unset;
                background-image: url('@/assets/Rectangle56.png');
                overflow: hidden;

            }
        }

        .bottomBlock {
            height: 0px;
            width: 0;
            margin: 20px;
            padding: 20px;
            overflow: hidden;
            position: relative;
            margin-top: 20px;
            border-radius: @normalBdRadius;
            border: solid 2px var(--prmy-bg);
            background: var(--sub-bg);
            opacity: 0;
            display: grid;
            grid-template-columns: repeat(2, 50%);
            grid-template-rows: repeat(2, 50%);
            align-items: center;

            .infoItem {
                height: 20px;
                width: 300px;
                display: flex;
                align-items: center;
                color: var(--font-prmy-color);

                .btmBlockIcon {
                    width: 1em;
                    height: 1em;
                    color: var(--mainColor);
                    margin-right: 10px;
                }
            }
        }

    }

    .aboutMySkills {
        height: 100vh;
        width: 100%;
        position: relative;

        .skill_block {
            // min-width: 900px;
            // max-width: 100%;
            margin: 50px 120px;
            display: grid;
            grid-template-columns: repeat(4, 2.5fr);
            grid-template-rows: repeat(1, 225px);
            column-gap: 20px;
            // justify-content: space-between;

            .skillItem {
                color: var(--mainColor);
                background: var(--sub-bg);
                border-radius: @normalBdRadius;
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

    .recentWork {
        height: 100vh;
    }

    .hangingContact {
        position: fixed;
        z-index: 4;
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
            background-color: var(--mainColor);
        }

        .concatItem {
            background: var(--obv-bg);
            width: 45px;
            height: 45px;
            display: flex;
            position: relative;
            justify-content: center;
            align-items: center;
            clip-path: path('M 22.5,0 L 0,13 L 0,33 L 22.5,45 L 45,33 L 45,13 z');
            transition: all 0.3s;
            color: var(--font-prmy-color);
            cursor: pointer;

            &:hover {
                background: #d3d3d3;
                color: var(--sub-bg);
                transition: all 0.3s;
            }

            .concatIcon {
                height: 50%;
                width: 50%;
            }
        }
    }

}

.hideOverlay {
    height: 100vh;
    overflow: hidden;
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
    background: var(--prmy-bg);
}

@import '@/css/mobile.less';
</style>
