import { ref } from "vue";

export function useHeaderCtl() {
  let scrollTop = ref(300);
  let visible = ref(true);
  (function () {
    window.onscroll = () => {
      let currentScrollTop = document.documentElement.scrollTop | document.body.scrollTop;
      if (currentScrollTop < 500) {
        scrollTop.value = 100;
        visible.value = true;
      } else {
        visible.value = Boolean(currentScrollTop < scrollTop.value);
        scrollTop.value = currentScrollTop;
      }
    };
  })();

  return {
    visible,
    scrollTop,
  };
}
