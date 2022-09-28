<template>
  <header class="header" :class="{ visible: visible }">
    <ul class="navUl">
      <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg" width="136.28" height="23" style="display: bolck" />
      <li v-for="(item, index) in navItems" :key="index" :class="item.itemHidden ? 'itemHidden' : ''">
        <a>{{ item.title }}</a>
      </li>
      <img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed44c6756d7b4c4989e9623baad731b9~tplv-k3u1fbpfcp-image.image" height="40" width="140" />
    </ul>
    <ul class="rightNav">
      <ul class="flowItem">
        <li>
          <input type="text" placeholder="搜索稀土掘金" />
          <button>
            <svg-icon name="search" color="#8a919f" class="headeIcons"></svg-icon>
          </button>
        </li>
        <li>
          <button>创作者中心</button>
          <button>
            <svg-icon name="flow" color="#fff" class="headeIcons"></svg-icon>
          </button>
        </li>
      </ul>
      <li>
        <img src="https://p6-passport.byteacctimg.com/img/user-avatar/da94f483dd3e467d8198c01fe9cb555b~300x300.image" height="32" width="32" />
      </li>
    </ul>
  </header>
  <main class="appMain">
    <div class="mainArt">
      <el-card class="artArea">
        <span class="mainArtTitle">分分钟带你了解 ES2022 最重要的 4 个特性！</span>
        <div class="authorInfo">
          <div class="leftDetail">
            <el-avatar :size="50" :src="avatarUrl"></el-avatar>
            <div>
              <div>{{ editorInfo.name }}</div>
              <div>{{ editorInfo.publishData }}</div>
            </div>
          </div>
          <el-button>关注</el-button>
          <el-button @click="linkToGame">跳转小游戏</el-button>
        </div>
        <ExampleMarkdown></ExampleMarkdown>
      </el-card>
      <div class="leftEditBtn">
        <div v-for="(item, index) in artEditItem" :key="index">
          <el-badge :value="12" type="info">
            <div class="artEditItem">
              <svg-icon ref="svgIcons" :name="item" color="#8a919f" class="leftBtns"></svg-icon>
            </div>
          </el-badge>
        </div>
        <el-divider></el-divider>
        <div v-for="(item, index) in artEditItem2" :key="index" class="artEditItem">
          <svg-icon ref="svgIcons" :name="item" color="#8a919f" class="leftBtns"></svg-icon>
        </div>
      </div>
      <div class="rightDetail">
        <el-card>
          <div class="editorInfo">
            <el-avatar :size="50" :src="avatarUrl"></el-avatar>
            <div class="info-box">
              <a>{{ editorInfo.name }}</a>
              <div>{{ editorInfo.jobTitle }}</div>
            </div>
          </div>
          <el-divider style="margin: 10px 0px"></el-divider>
          <div class="artInfo">
            <div>
              <div class="allArtMessage">
                <svg-icon name="support" color="#7BB9FF" class="infoSvg"></svg-icon>
              </div>
              <span>获得点赞 {{ editorInfo.like }}</span>
            </div>
            <div>
              <div class="allArtMessage">
                <svg-icon name="read" color="#7BB9FF" class="infoSvg"></svg-icon>
              </div>
              <span>文章被阅读 {{ editorInfo.read }}</span>
            </div>
          </div>
        </el-card>
        <el-card style="margin-top: 20px" class="topOfstickBox">
          <div class="downloadApp">
            <div class="appQrCode"></div>
            <div class="appText">
              <div>下载稀土掘金APP</div>
              <div>一个帮助开发者成长的社区</div>
            </div>
          </div>
        </el-card>
        <el-card style="margin-top: 20px" :class="{ artCatalogue: true, stickBox: stickBox, stickTop: visible }">
          <h2>目录</h2>
          <el-divider></el-divider>
          <div>
            <a :href="'#' + item.id" v-for="item in artAreaList" :key="item.id" :class="[getTitleMargin(item.nodeType), { mdTitleActive: item.active }]" class="mdTitle">
              <div>{{ item.textContent }}</div>
            </a>
          </div>
        </el-card>
      </div>
    </div>
  </main>
</template>
<script lang="ts" setup>
import { reactive, ref } from "@vue/reactivity";
import { onMounted, onUnmounted } from "vue";
import { getUser } from "../../request/api/getUser";
import { useHeaderCtl } from "@/components/testTable/compositionApi/headCtl";
import ExampleMarkdown from "../markdown/index.vue";
import _ from "lodash";
import { useRouter } from "vue-router";

let { scrollListener, visible, scrollTop, navItems, stickBox } = useHeaderCtl();

const avatarUrl = ref("https://p6-passport.byteacctimg.com/img/user-avatar/da94f483dd3e467d8198c01fe9cb555b~300x300.image");

onMounted(() => {
  getArtlist();
  scrollCtlMdlist();
  scrollListener();
});

onUnmounted(() => {
  window.removeEventListener("scroll", _.throttle(setmdListActive, 500));
});
interface Artlist {
  id: string;
  nodeType: string;
  textContent: string | null;
  active: boolean;
}
const router = useRouter();
const linkToGame: () => void = () => {
  router.push("/game");
};

const artAreaList: Artlist[] = reactive([]);
const getTitleMargin = (nodeName: string) => {
  let className: string = "";
  switch (nodeName) {
    case "H1":
      className = "h1Margin";
      break;
    case "H2":
      className = "h2Margin";
      break;
    case "H3":
      className = "h3Margin";
      break;

    default:
      break;
  }
  return className;
};

const getArtlist = () => {
  let markdownArea = document.getElementsByClassName("markdown-body");
  let titleStr = "H1H2H3";
  let childrenLen = markdownArea[0].children.length;
  for (let i = 0; i < childrenLen; i++) {
    const ele: HTMLElement = markdownArea[0].children.item(i) as HTMLElement;
    if (titleStr.includes(ele?.nodeName)) {
      ele?.setAttribute("id", "mdTitle" + i);
      artAreaList.push({
        id: "mdTitle" + i,
        nodeType: ele?.nodeName,
        textContent: ele?.textContent,
        active: false,
      });
    }
  }
};

interface UserInfo {
  name: string;
  age: number;
  city?: string;
  email?: string;
}

interface ArtInfo extends UserInfo {
  jobTitle: string;
  read: number;
  like: number;
  publishData: string;
}

interface MdItemScrollTop {
  id: string;
  scrollTop: number | undefined;
}

const tableData = reactive<UserInfo[]>([]);
const artEditItem = reactive(["support", "message", "star", "share"]);
const artEditItem2 = reactive(["warning", "fullScreen"]);
const editorInfo: ArtInfo = reactive({
  name: "HXSLimeng",
  age: 22,
  jobTitle: "前端工程师",
  read: 20,
  like: 30,
  publishData: "2022-2-14",
});

const scrollCtlMdlist = () => {
  window.addEventListener("scroll", _.throttle(setmdListActive, 500));
};

const resetActiveMdlist = (id: string) => {
  artAreaList.forEach((item) => {
    if (item.id == id && !item.active) {
      item.active = true;
    } else if (item.id != id) {
      item.active = false;
    }
  });
};

const setmdListActive = () => {
  let mdScrollTops = getMdItemScrollTop();
  let activeTarget = mdScrollTops.reduce((prev, cur, index) => {
    if (typeof prev.scrollTop == "number" && typeof cur.scrollTop == "number") {
      if (Math.abs(prev.scrollTop) > Math.abs(cur.scrollTop)) {
        prev = cur;
      }
    }
    return prev;
  });
  resetActiveMdlist(activeTarget.id);
};

const getMdItemScrollTop = (): MdItemScrollTop[] => {
  let mdTitleList: MdItemScrollTop[] = [];
  artAreaList.forEach((item) => {
    let itemScrollTop = document.getElementById(item.id)?.getBoundingClientRect().top;

    mdTitleList.push({
      id: item.id,
      scrollTop: itemScrollTop,
    });
  });
  return mdTitleList;
};
class Person {
  private name: string;
  private age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  sayName(): string {
    return `我的名字是${this.name}`;
  }

  set setName(v: string) {
    this.name = v;
  }

  get getName(): string {
    return this.name;
  }
}

const per = new Person("李孟", 22);
per.getName;
</script>
<style lang="less" scoped>
@iconColor: #8a919f;
.main_card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.page {
  width: fit-content;
  margin: 0 auto;
}
.header {
  width: 100%;
  height: 60px;
  background: rgb(255, 255, 255);
  transform: translate3d(0, -100%, 0);
  transition: all 0.2s;
  position: sticky;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
  .navUl {
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 30px;
    font-size: 15px;
    .itemHidden {
      @media (max-width: 1430px) {
        display: none;
      }
    }
    li {
      padding: 0 10px;
      height: 100%;
      line-height: 60px;
      text-align: center;
      min-width: 60px;
      font-size: 16px;
      cursor: pointer;
      &:hover {
        &::after {
          content: "";
          display: block;
          border-bottom: solid #1e80ff 3px;
          position: relative;
          bottom: 3px;
        }
      }
      a {
        color: #666;
      }
    }
  }
  .rightNav {
    display: flex;
    @media screen and (max-width: 1200px) {
      display: none;
    }
    .flowItem {
      display: flex;
      overflow: hidden;
      width: 280px;
      .headeIcons {
        width: 22px;
        height: 22px;
        transform: translateY(-50%);
        position: relative;
        top: 50%;
      }
    }
    li:nth-child(1) {
      display: flex;
      height: 30px;
      button {
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        height: 30px;
      }
    }
    li:nth-child(2) {
      display: flex;
      button {
        &:nth-child(1) {
          border-radius: 3px;
          color: white;
          background-color: #1e80ff;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          padding: 0 12px;
          height: 30px;
          width: 100px;
        }
        &:nth-child(2) {
          height: 30px;
          color: white;
          background-color: #1e80ff;
          width: unset;
          border-radius: unset;
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
        }
        .headeIcons {
          width: 10px;
          height: 10px;
          transform: translateY(0);
          position: relative;
          top: 0;
        }
      }
    }
    li {
      margin: 0 10px;
      display: flex;
    }
    input {
      background-color: rgb(243, 244, 245);
      width: 100px;
      border-radius: 3px;
      color: #86909c;
      padding: 5px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      transition: all 0.3s;
      &:focus {
        width: 230px;
        &::-webkit-input-placeholder,
        &:-moz-placeholder,
        &:-ms-input-placeholder {
          display: none;
        }
      }
    }

    img {
      border-radius: 16px;
      margin-right: 10px;
    }
  }
}
.appMain {
  position: relative;
  top: 20px;
  margin: 0 auto;
  overflow: hidden;
  min-width: 1140px;
  display: table;
  &:after {
    display: table;
    content: "";
    clear: both;
  }
  .mainArt {
    width: 820px;
    overflow: hidden;

    .leftEditBtn {
      width: 50px;
      position: fixed;
      top: 120px;
      margin-left: -70px;
      text-align: center;
      overflow: visible;
      @media screen and (max-width: 1000px) {
        display: none;
      }
      .artEditItem {
        width: 50px;
        height: 50px;
        border-radius: 25px;
        background-color: #fff;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
        margin-bottom: 20px;
        overflow: visible;
        &:hover {
          .leftBtns {
            opacity: 1;
          }
        }
        .leftBtns {
          height: 22px;
          width: 22px;
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.5;
        }
      }
    }
    .artArea {
      overflow: hidden;
      padding: 32px;
      &::after {
        display: table;
        content: "";
        clear: both;
      }
      .mainArtTitle {
        font-size: xx-large;
        font-weight: bold;
        display: block;
        margin-bottom: 30px;
      }
      .authorInfo {
        display: flex;
        justify-content: space-between;
        padding: 20px 0px;
        .leftDetail {
          display: flex;
          div {
            line-height: 25px;
            margin-left: 5px;
            div:nth-child(2) {
              color: #8a919f;
            }
          }
        }
      }
    }
    .rightDetail {
      position: absolute;
      width: 300px;
      right: 0;
      top: 0;
      margin-left: 5px;
      overflow: visible;
      @media screen and (max-width: 1000px) {
        display: none;
      }
      .editorInfo {
        width: 100%;
        display: flex;
        .info-box {
          margin-left: 20px;
          text-align: left;
          line-height: 25px;
        }
      }
      .artInfo {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        line-height: 25px;
        span {
          margin-left: 10px;
        }
        .allArtMessage {
          height: 25px;
          width: 25px;
          text-align: center;
          background-color: rgb(225, 239, 255);
          border-radius: 12.5px;
          display: inline-block;

          &:nth-child(1) {
            margin-top: 10px;
          }
          .infoSvg {
            width: 14px;
            height: 14px;
            position: relative;
            top: 50%;
            transform: translateY(-75%);
          }
        }
      }
    }
    .downloadApp {
      display: flex;
      .appQrCode {
        width: 60px;
        height: 60px;
        background-color: @iconColor;
      }
      .appText {
        margin: 5px;
        line-height: 25px;
        div:nth-child(2) {
          color: @iconColor;
        }
      }
    }
    .artCatalogue {
      a {
        display: block;
        color: black;
      }
      .mdTitle {
        line-height: 40px;
        padding-left: 20px;
        position: relative;
        border-radius: 5px;
        &:hover {
          background-color: #f8f8f8;
        }
      }
      .mdTitleActive {
        color: #1e80ff;
        background-color: #f8f8f8;
        &::before {
          content: "";
          position: absolute;
          top: 4px;
          left: 0;
          margin-top: 7px;
          width: 4px;
          height: 16px;
          background: #1e80ff;
          border-radius: 0 4px 4px 0;
        }
      }
      .h1Margin {
        padding-left: 10px;
      }
      .h2Margin {
        padding-left: 20px;
      }
      .h3Margin {
        padding-left: 30px;
      }
    }
    .stickBox {
      position: fixed;
      top: 0px;
      width: inherit;
      // margin-top: 5px;
      transition: all 0.2s;
    }
    .stickTop {
      top: 60px;
    }
  }
}
.visible {
  //开启硬件加速
  transform: translateZ(0);
}
</style>
