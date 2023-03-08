import { createApp } from "vue";
import App from "./App.vue";
// import "element-plus/dist/index.css";
import SvgIcon from "./components/svgComp/SvgIcon.vue";
import "virtual:svg-icons-register";
import router from "@/router/index";

const app = createApp(App);

app.use(router);
app.mount("#app");
app.component("svg-icon", SvgIcon);
