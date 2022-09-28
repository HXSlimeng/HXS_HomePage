import { ref, reactive, toRefs } from "vue";

export function useHeaderCtl() {
  interface NavItem {
    title: string;
    link: string;
    itemHidden?: boolean;
  }
  interface State {
    navItems: NavItem[];
  }
  let stickBox = ref(false);
  let state = reactive<State>({
    navItems: [
      {
        title: "首页",
        link: "",
      },
      {
        title: "沸点",
        link: "",
      },
      {
        title: "课程",
        link: "",
      },
      {
        title: "资讯",
        link: "",
      },
      {
        title: "活动",
        link: "",
      },
      {
        title: "开放社区",
        link: "",
      },
      {
        title: "下载app",
        link: "",
        itemHidden: true,
      },
      {
        title: "浏览器插件",
        link: "",
        itemHidden: true,
      },
    ],
  });
  let scrollTop = ref(300);
  let visible = ref(true);
  const scrollListener = function () {
    window.onscroll = () => {
      let currentScrollTop = document.documentElement.scrollTop | document.body.scrollTop;
      if (currentScrollTop < 300) {
        scrollTop.value = 100;
        visible.value = true;
      } else if (currentScrollTop > 300) {
        visible.value = Boolean(currentScrollTop < scrollTop.value);
        scrollTop.value = currentScrollTop;
      }
      //
      let stickyBox = document.querySelector(".topOfstickBox");
      let position: number | undefined = stickyBox?.getBoundingClientRect().y;
      if (position) {
        if (!stickBox.value && position <= -110) {
          stickBox.value = true;
        } else if (stickBox.value && position >= -110) {
          stickBox.value = false;
        }
      }
    };
  };
  return {
    scrollListener,
    visible,
    scrollTop,
    ...toRefs(state),
    stickBox,
  };
}
