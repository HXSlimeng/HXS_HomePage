<template>
  <!-- <div class="common-layout"> -->
  <PageHead ref="pageHead"></PageHead>
  <main>
    <div class="introduce menuPart">
      <section class="aboutMeText">
        <span class="bgtext">HELLO</span>
        <div class="myName">
          <div class="avatar">
            <img src="../assets/avatar.png" class="avatarPng" alt="" srcset="" />
          </div>
          <div>
            <span class="name">HXSlimeng</span>
            <br />
            <span class="job">A Front-End Engineer</span>
          </div>
        </div>
        <div class="addr">
          <svg-icon name="location" size="1.8em" />
          <div>Based In: TianJin(天津)</div>
        </div>
        <div class="fadeText">
          <!-- 是是是是是是是是是是是是是是是是是是是是是是是是是是是是是是是是是是是是是是是 -->
          <p>Hi~👋，我是HXSlimeng，一个前端工程师，热爱技术和生活。</p>
        </div>
      </section>
      <div class="moduleMain">
        <div class="moduleOuter"></div>
        <div class="loadingBlock" v-if="moduleLoading">
          <svg-icon name="config" size="1rem" color="var(--mainColor)"></svg-icon>
          <div>LOADING...</div>
        </div>
        <div class="webglMale landingOuter"></div>
      </div>
      <!-- <div>
        <div v-for="item in selfInfos" :key="item.label"></div>
      </div> -->
      <div class="huamnActBtn">
        <LmButton ref="changeActBtn" class="changeActBtn" @click="changeAct">
          <div class="changeActBtn-text">
            {{ btnStuffs[activeActionI].text }}
          </div>
          <div class="changeActBtn-icon">
            {{ btnStuffs[activeActionI].icon }}
          </div>
        </LmButton>
        <!--  -->
      </div>
    </div>
    <div class="aboutMySkills menuPart">
      <ShadowText text="Skills"></ShadowText>
      <div class="skill_block">
        <div class="skillItem" v-for="item in 4">
          <svg-icon name="fullScreen" class="skillIcon"></svg-icon>
          <div class="skillTitle">Product Design</div>
        </div>
      </div>
    </div>
    <div class="recentWork menuPart">
      <ShadowText text="Projects"></ShadowText>
      <div class="skill_block">
        <div class="skillItem" v-for="item in 0">
          <svg-icon name="fullScreen" class="skillIcon"></svg-icon>
          <div class="skillTitle">Product Design</div>
        </div>
      </div>
    </div>
    <div class="contacts menuPart">
      <ShadowText text="Contacts"></ShadowText>
      <a href="https://github.com/HXSlimeng">
        <svg-icon name="github" size="1.3em"></svg-icon>
      </a>
      <a href="mailTo:limenglzh@163.com">
        <svg-icon name="mail" size="1.3em"></svg-icon>
      </a>
    </div>
  </main>

  <!-- <div class="hangingContact menuPart">
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
  <!-- </div> -->
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
  tl.to(".changeActBtn-text", { y: -50, opacity: 0 }).to(".changeActBtn-icon", { scale: 0 }, "<");
  tl.call(() => {
    let startAct = humanActions[activeActionI.value];
    activeActionI.value = activeActionI.value == HUMAN_ACTIONS.BORED ? HUMAN_ACTIONS.IDLE : HUMAN_ACTIONS.BORED;
    let endAct = humanActions[activeActionI.value];
    executeCrossFade(startAct, endAct);
  });
  tl.fromTo(".changeActBtn-text", { y: 50 }, { y: 0, opacity: 1 }).to(".changeActBtn-icon", { scale: 1, ease: "elastic" }, "<");
};

const selfInfos = [
  {
    label: "Addr",
    value: "TianJin",
  },
  {
    label: "",
  },
];

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
    grid-template-columns: minmax(500px, 850px) 500px;

    .aboutMeText {
      color: var(--font-prmy-color);
      font-weight: bolder;
      grid-area: 1/1 / span 2 / span 1;
      display: flex;
      flex-direction: column;
      // font-size: 1em;
      position: relative;
      padding: 30px 20px 0px 20px;
      .myName {
        margin: 20px 0px 0px 20px;
        display: flex;
        align-items: flex-end;
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
          font-size: 2em;
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
        margin-top: 20px;
        line-height: 1.5em;
      }
      .addr {
        font-size: 0.8em;
        height: 50px;
        display: flex;
        align-items: center;
        color: var(--obv-bg);
      }
      .contacts {
        height: 50px;
        display: flex;
        align-items: center;
        column-gap: 10px;
        color: var(--font-sub-color);
        a {
          color: var(--mainColor);
          cursor: pointer;
          opacity: 0.6;
          &:hover {
            opacity: 1;
          }
        }
      }

      .bgtext {
        font-size: 200px;
        user-select: none;
        opacity: 0.1;
        color: var(--font-prmy-color);
        line-height: 180px;
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
        // background: rgba(255, 255, 255, .4);
        // clip-path: path('M 187,0 L 147,297 L 303,453 C 368,508 404,442 423,427 L 561,292 L 508,0 z');
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
      .changeActBtn {
        column-gap: 20px;
        transition: 0.3s;
        font-size: 18px;

        .changeActBtn-text {
          position: relative;
          width: 50px;
        }

        /* &::before {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 5px;
                    opacity: 0;
                    transform: scale(1);
                    transition: .3s;
                } */
      }
    }
  }

  .aboutMySkills {
    position: relative;
    .skill_block {
      // min-width: 900px;
      // max-width: 100%;
      margin: auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(105px, 400px));
      grid-template-rows: repeat(auto-fill, 225px);
      gap: 20px;
      justify-content: center;
      // justify-content: space-between;

      .skillItem {
        height: 225px;
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
          color: var(--font-prmy-color);
          font-size: 22px;
        }
      }
    }
  }

  .recentWork {
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
      clip-path: path("M 22.5,0 L 0,13 L 0,33 L 22.5,45 L 45,33 L 45,13 z");
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
