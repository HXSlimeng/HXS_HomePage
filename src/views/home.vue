<template>
  <!-- <div class="common-layout"> -->
  <PageHead ref="pageHead"></PageHead>
  <main>
    <div class="introduce menuPart">
      <section class="aboutMeText">
        <span class="bgtext">HELLO</span>
        <div class="myName">
          <div class="avatar">
            <!-- <img src="../assets/avatar.png" class="avatarPng" alt="" srcset="" /> -->
          </div>
          <div>
            <span class="name">HXSlimeng</span>
            <br />
            <span class="job">A Front-End Engineer</span>
          </div>
        </div>
        <div class="fadeText">
          <p>👋Hi~，我是HXSlimeng，一个前端工程师，热爱技术和生活。</p>
        </div>

        <div class="addr">
          <svg-icon name="location" size="1.8em" />
          <div>Based In: TianJin(天津)</div>
        </div>
        <div class="contacts">
          <a href="https://github.com/HXSlimeng">
            <svg-icon name="github" size="1.5em"></svg-icon>
          </a>
          <a href="mailTo:limenglzh@163.com">
            <svg-icon name="mail" size="1.5em"></svg-icon>
          </a>
        </div>
      </section>
      <div class="moduleMain">
        <div class="moduleOuter">
          <!-- <LmButton ref="changeActBtn" class="changeActBtn" @click="changeAct">
            <div class="changeActBtn-icon">
              <svg-icon name="exchange"></svg-icon>
            </div>
          </LmButton> -->
        </div>
        <div class="loadingBlock" v-if="moduleLoading">
          <svg-icon name="config" color="var(--mainColor)" size="2rem"></svg-icon>
          <div>LOADING...</div>
        </div>
        <div class="webglMale landingOuter"></div>
      </div>
      <div class="huamnActBtn">
        <fieldset class="inspirGraph">
          <legend>Motto</legend>
          <!-- 是是是是是是是是是是是是是是是是是是是是是是是是是是是是是是是 -->
        </fieldset>
        <!--  -->
      </div>
    </div>
    <div class="skills menuPart">
      <ShadowText text="Skills"></ShadowText>
    </div>
    <div class="projects menuPart">
      <ShadowText text="Projects"></ShadowText>
      <PrjCard />
    </div>
    <ShadowText text="Contacts"></ShadowText>
  </main>
  <PageFooter></PageFooter>
</template>

<script setup lang="ts">
import { HUMAN_ACTIONS, useThree } from "@/hooks/useThree";
import { useIfPartDisplay } from "@/hooks/useIfPartDisplay";
import { onMounted, reactive, ref } from "vue";
import PageHead from "@/components/pageHead/index.vue";
import gsap from "gsap";
import { AnimationAction } from "three";

const pageHead = ref<InstanceType<typeof PageHead> | null>(null);
const { tCamera, humanActions, tRenderer, loadGLTF, loadingProgress, moduleLoading } = useThree(afterLoadingComplete);
let tl = gsap.timeline();
const displayOpenView = () => {
  tl.fromTo(".aboutMeText>div", { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.3 });
  tl.call(() => loadGLTF());
};
function afterLoadingComplete() {
  humanActions[HUMAN_ACTIONS.BORED].play();
  tl.fromTo(".moduleOuter", { rotate: 45 }, { scale: 1, ease: "elastic", duration: 1 });
  tl.to(".webglMale", { opacity: 1 });
}

const activeActionI = ref(HUMAN_ACTIONS.BORED);
const btnStuffs = reactive([
  {
    icon: "😮‍💨",
    text: "Relax",
  },
  {},
  {
    icon: "😕",
    text: "Idle",
  },
]);

const executeCrossFade = (startAction: AnimationAction, nextAction: AnimationAction) => {
  nextAction.enabled = true;
  nextAction.setEffectiveTimeScale(1);
  nextAction.setEffectiveWeight(1);
  nextAction.time = 0;
  startAction.crossFadeTo(nextAction, 1, true);
  nextAction.play();
};

const changeAct = () => {
  let tl = gsap.timeline();
  tl.to(".changeActBtn-icon", { scale: 0 }, "<");
  tl.call(() => {
    let startAct = humanActions[activeActionI.value];
    activeActionI.value = activeActionI.value == HUMAN_ACTIONS.BORED ? HUMAN_ACTIONS.IDLE : HUMAN_ACTIONS.BORED;
    let endAct = humanActions[activeActionI.value];
    executeCrossFade(startAct, endAct);
  });
  tl.to(".changeActBtn-icon", { scale: 1, ease: "elastic" }, "<");
};

onMounted(() => {
  let faDom = document.querySelector(".webglMale");
  faDom?.appendChild(tRenderer.domElement);
  useIfPartDisplay(pageHead);
  document.body.classList.add("normal");
  displayOpenView();
});
</script>

<style lang="less">
#app {
  font-size: 20px;
  // min-width: 1400px;
  background: var(--prmy-bg);
  background-repeat: repeat-y;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // transition: all .3s;
  .menuPart {
    width: 100%;
  }
  .introduce {
    min-height: calc(100vh - @headerHeight);
    background-image: url("../assets/Rectangle56.png");
    position: relative;
    padding-top: @headerHeight;
    display: grid;
    justify-content: center;
    grid-template-rows: min-content auto;
    grid-template-columns: minmax(500px, 1050px) 700px;

    .aboutMeText {
      color: var(--font-prmy-color);
      font-weight: bolder;
      grid-area: 1/1 / span 2 / span 1;
      display: flex;
      flex-direction: column;
      row-gap: 20px;
      position: relative;
      padding: 30px 20px 0px 80px;
      .myName {
        display: flex;
        align-items: flex-end;
        font-weight: bolder;
        .avatar {
          margin-right: 20px;
          height: 100px;
          width: 100px;
          display: block;
          border-radius: 50%;
          border: 3px solid var(--mainColor);
          overflow: hidden;
          .avatarPng {
            height: 100%;
            width: 100%;
          }
        }
        .name {
          color: var(--mainColor);
          font-size: 2.5em;
        }
        .job {
          color: var(--font-sub-color);
        }
      }

      .fadeText {
        padding: 20px;
        border-radius: 10px;
        border: solid 2px var(--prmy-bg);
        background: var(--sub-bg);
        width: fit-content;
        line-height: 1.5em;
      }

      .addr {
        font-size: 0.8em;
        height: 50px;
        display: flex;
        align-items: center;
        color: #8f8f8f;
      }
      .contacts {
        height: 50px;
        display: flex;
        align-items: center;
        column-gap: 20px;
        color: var(--font-sub-color);
        a {
          color: var(--mainColor);
          cursor: pointer;
          opacity: 0.5;
          &:hover {
            opacity: 1;
            filter: drop-shadow(0px 0px 2px currentColor);
          }
        }
      }

      .bgtext {
        font-size: 200px;
        user-select: none;
        opacity: 0.1;
        font-weight: bolder;
        color: var(--font-prmy-color);
        line-height: 180px;
        align-self: flex-start;
      }
    }

    .moduleMain {
      position: relative;
      transform: unset;
      display: flex;
      justify-content: center;
      height: 500px;

      .webglMale {
        position: relative;
        z-index: 2;
        cursor: grab;
        clip-path: path("M 58,0 L 4,303 L 157,457 C 224,514 272,416 301,398 L 404,297 L 285,0 z");
        opacity: 0;
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

    .huamnActBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      .inspirGraph {
        border: var(--mainColor) 3px solid;
        padding: 20px;
        border-radius: 20px;
        legend {
          padding: 0px 20px;
          color: var(--font-sub-color);
        }
      }
    }
  }

  .projects {
    position: relative;
  }

  .recentWork {
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
  background: var(--prmy-bg);
}

@import "@/css/mobile.less";
</style>
