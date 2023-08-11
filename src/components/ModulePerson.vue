<template>
    <div class="moduleMain">
        <Circlebox></Circlebox>
        <div class="moduleOuter">
        </div>
        <div class="loadingBlock" v-if="moduleLoading">
            <svg-icon name="config" color="var(--mainColor)" size="2rem"></svg-icon>
            <div>LOADING...</div>
        </div>
        <div class="webglMale landingOuter"></div>
    </div>
</template>

<script setup lang='ts'>
import { HUMAN_ACTIONS, useThree } from '@/hooks/useThree';
import { onMounted } from 'vue';
import Circlebox from '@/components/circleBoxs/index.vue'
import gsap from 'gsap'


onMounted(() => {
    mount(document.querySelector('.webglMale')!)
})

let tl = gsap.timeline();
const { humanActions, tRenderer, loadGLTF, moduleLoading } = useThree(afterLoadingComplete);
function afterLoadingComplete() {
    humanActions[HUMAN_ACTIONS.BORED].play();
    tl.fromTo(".moduleOuter", { rotate: 45 }, { scale: 1, ease: "elastic", duration: 1 });
    tl.to(".webglMale", { opacity: 1 });
}
function mount(root: HTMLElement) {
    root.appendChild(tRenderer.domElement);
}
defineExpose({
    loadGLTF,
    humanActions
})
</script>

<style lang='less' scoped>
.moduleMain {
    position: relative;
    transform: unset;
    display: flex;
    justify-content: center;
    height: 500px;

    .webglMale {
        position: relative;
        z-index: 2;
        cursor: move;
        clip-path: path("M 58,0 L 4,303 L 157,457 C 224,514 272,416 301,398 L 404,297 L 285,0 z");
        // opacity: 0;
    }

    .moduleOuter {
        position: absolute;
        top: 136px;
        width: 300px;
        height: 300px;
        background-color: var(--mainColor);
        border-radius: 20%;
        transform: scale(0) rotate(45deg);

        .changeActBtn {
            column-gap: 20px;
            transition: 0.3s;
            font-size: 18px;
            position: absolute;
            right: -100px;
            transform: rotate(-45deg);

            .changeActBtn-text {
                position: relative;
                width: 50px;
            }

            .changeActBtn-icon {
                position: relative;
                color: var(--mainColor);
            }
        }
    }

    .loadingBlock {
        position: absolute;
        width: 100px;
        height: 100px;
        opacity: 0.8;
        color: var(--font-sub-color);
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        top: 50%;
        transform: translateY(-50%);

        @keyframes iconRotate {
            from {
                transform: rotate(0);
            }

            to {
                transform: rotate(359deg);
            }
        }

        @keyframes loadingText {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }

        svg {
            animation: iconRotate 3s linear infinite;
        }

        div {
            animation: loadingText 1s ease infinite alternate;
        }

        // border-image:  5;
    }
}
</style>
