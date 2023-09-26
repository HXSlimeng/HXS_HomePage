<template>
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
      <p>
        👋Hi~，我是HXSlimeng，一个注重效率的前端工程师，目前有三年的开发经验。没事喜欢跑跑步，平常比较感兴趣的有吉他（一直想学但没开始😶‍🌫️），个人风向标<a href="https://github.com/antfu">Anthony Fu</a
        >。
      </p>
    </div>
    <div class="addr">
      <svg-icon name="location" size="1.5em" />&nbsp;
      <div>Current Based In: TianJin(天津)</div>
    </div>
    <div class="contacts">
      <a href="https://github.com/HXSlimeng">
        <svg-icon name="github" size="1.5em"></svg-icon>
      </a>
      <a href="mailTo:limenglzh@gamil.com">
        <svg-icon name="mail" size="1.5em"></svg-icon>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { defineEmits } from "vue";
import gsap from "gsap";

const emits = defineEmits(["loadGLTF"]);

onMounted(() => {
  displayFadeIn();
});
function displayFadeIn() {
  let tl = gsap.timeline();
  tl.fromTo(".aboutMeText>div", { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.3 });
  tl.call(() => emits("loadGLTF"));
}
</script>

<style lang="less" scoped>
.aboutMeText {
  color: var(--font-prmy-color);
  grid-area: 1/1 / span 2 / span 1;
  display: flex;
  flex-direction: column;
  // row-gap: 20px;
  justify-content: space-around;
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
    padding: 10px;
    font-size: 0.9em;
    border-radius: 10px;
    border: solid 2px var(--prmy-bg);
    background: var(--sub-bg);
    width: fit-content;
    line-height: 2em;
    text-indent: 2em;
    a:hover {
      border-bottom: 2px var(--mainColor) solid;
    }
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
</style>
