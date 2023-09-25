<template>
  <header :class="{ mainHeader: true, menuOpen: menuOpened }">
    <nav class="headerNavs">
      <div v-for="nav in navItems" :class="{ navItem: true, activeNav: nav.active }">
        <a @click="scrollToPart(nav.target)">{{ nav.text }}</a>
      </div>
    </nav>
    <ToggleThemeSwitch></ToggleThemeSwitch>
    <div class="mobileTiOuter">
      <div class="mobileTi" :style="{ bottom: `${activeNavItemIndex * 60}px` }">
        <div v-for="item in navItems" :class="{ mobileTiItem: true, mobileTiNotActive: item.active }">{{ item.text }}</div>
      </div>
    </div>
    <div class="toggleMenuBtn" @click="showMenu">
      <svg-icon :name="menuOpened ? 'menuClosed' : 'menuOpened'" size="35px"></svg-icon>
    </div>
    <div class="headerConcat">
      <a href="https://github.com/HXSlimeng">
        <svg-icon name="github" size="48px"></svg-icon>
      </a>
      <a href="mailTo:limenglzh@163.com">
        <svg-icon name="mail" size="48px"></svg-icon>
      </a>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, unref } from "vue";
import ToggleThemeSwitch from "@/components/toggleThemeSwitch/index.vue";
import { computed } from "@vue/reactivity";

interface InavItem {
  text: string;
  target: string;
  active: boolean;
}

const navItems = ref<InavItem[]>([
  {
    text: "Home",
    target: "introduce",
    active: true,
  },
  {
    text: "Skills",
    target: "skills",
    active: false,
  },
  {
    text: "Projects",
    target: "projects",
    active: false,
  },
  {
    text: "Contact",
    target: "Contact",
    active: false,
  },
]);

const activeNavItemIndex = computed(() => navItems.value.findIndex((v) => v.active));
const menuOpened = ref(false);

const scrollToPart = (tarSign: string) => {
  navItems.value.forEach((v) => (v.active = v.target == tarSign));
  let dom = document.querySelector(`.${tarSign}`) as HTMLElement;
  dom.scrollIntoView({ behavior: "smooth" });
  dom.classList.add("fade-in"); // Add fade-in animation
  menuOpened.value = false;
};
const showMenu = () => {
  menuOpened.value = !unref(menuOpened);
};
defineExpose({
  navItems,
});
</script>

<style lang="less">
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.fade-in {
  opacity: 0;
  animation: fadeIn ease 1s;
  animation-fill-mode: forwards;
}

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
  -webkit-backdrop-filter: blur(10px);
  background-image: radial-gradient(transparent 1px, var(--prmy-bg) 1px);
  background-size: 4px 4px;
  border-bottom: solid 2px var(--sub-bg);

  .headerNavs {
    display: flex;
    justify-content: space-around;
    column-gap: 10px;
    position: relative;
    .navItem {
      font-size: 24px;

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
          content: "";
          display: block;
          width: 0;
          height: 2px;
          position: absolute;
          bottom: -8px;
          border-radius: 5px;
          transition: width 0.3s;
          background: var(--mainColor);
        }
      }
    }

    .activeNav {
      a {
        color: var(--mainColor);
        &::after {
          width: 100%;
        }
      }
    }
  }
  .headerConcat {
    display: none;
  }

  .mobileTiOuter {
    display: none;
  }

  .toggleMenuBtn {
    display: none;
  }
}

@import "@/css/mobile.less";
</style>
