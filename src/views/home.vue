<template>
  <!-- <div class="common-layout"> -->
  <PageHead ref="pageHead"></PageHead>
  <main id="main">
    <div class="introduce menuPart">
      <AboutMe @loadGLTF="loadGLTF"></AboutMe>
      <ModulePerson ref="personMDL"></ModulePerson>
      <div class="huamnActBtn">
        <fieldset class="inspirGraph">
          <h3 strong>Stay Hungry, Stay Foolish</h3>
          <p style="text-align: right">——Steve Jobs</p>
        </fieldset>
      </div>
    </div>
    <div class="skills menuPart">
      <ShadowText text="Skills" @click="linkToBook"></ShadowText>
      <Skills></Skills>
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
import { HUMAN_ACTIONS } from "@/hooks/useThree";
import { useIfPartDisplay } from "@/hooks/useIfPartDisplay";
import { onMounted, ref } from "vue";
import PageHead from "@/components/pageHead/index.vue";
import ModulePerson from "@/components/ModulePerson.vue";
import { AnimationAction } from "three";
import AboutMe from "@/components/aboutMe/index.vue";
import Skills from "@/components/skills/Skills.vue";
import gsap from "gsap";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  useIfPartDisplay(pageHead);
  document.body.classList.add("normal");
});

const personMDL = ref<typeof ModulePerson>();

const pageHead = ref<InstanceType<typeof PageHead> | null>(null);

const loadGLTF = () => {
  personMDL.value!.loadGLTF();
};

const activeActionI = ref(HUMAN_ACTIONS.BORED);

function executeCrossFade(startAction: AnimationAction, nextAction: AnimationAction) {
  nextAction.enabled = true;
  nextAction.setEffectiveTimeScale(1);
  nextAction.setEffectiveWeight(1);
  nextAction.time = 0;
  startAction.crossFadeTo(nextAction, 1, true);
  nextAction.play();
}

const toogleAct = () => {
  let tl = gsap.timeline();
  tl.to(".changeActBtn-icon", { scale: 0 }, "<");
  let target = personMDL.value!;
  tl.call(() => {
    let startAct = target.humanActions[activeActionI.value];
    activeActionI.value = activeActionI.value == HUMAN_ACTIONS.BORED ? HUMAN_ACTIONS.IDLE : HUMAN_ACTIONS.BORED;
    let endAct = target.humanActions[activeActionI.value];
    executeCrossFade(startAct, endAct);
  });
  tl.to(".changeActBtn-icon", { scale: 1, ease: "elastic" }, "<");
};

const linkToBook = () => {
  console.log("link");

  router.push({ path: "/bookkeeping" });
};
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
        line-height: 1.5em;
        border-bottom: var(--mainColor) 2px solid;
        padding: 15px;
        margin: 0px 20px;
        color: var(--font-sub-color);
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
