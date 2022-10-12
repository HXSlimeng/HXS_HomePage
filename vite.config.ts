import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from "vite-plugin-mock";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import Markdown from "vite-plugin-md";
import ViteComponents from "vite-plugin-components";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    Markdown(),
    ViteComponents({
      // allow auto load markdown components under `./src/components/`
      extensions: ["vue", "md"],

      // allow auto import and register components used in markdown
      customLoaderMatcher: (path) => path.endsWith(".md"),
    }),
    viteMockServe({
      supportTs: true,
      watchFiles: false,
      localEnabled: false, // 开发打包开关
      mockPath: "./src/mock",
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/svgs")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
      customDomId: "__svg__icons__dom__",
    }),
  ],
  server: {
    //设置 server.hmr.overlay 为 false 可以禁用开发服务器错误的屏蔽
    host: "0.0.0.0",
    hmr: true,
    //开发时启动的端口
    port: 4000,
    //在服务器启动时自动在浏览器中打开应用程序
    open: false,
    //true, 启用并允许任何源
    cors: true,
    //代理跨域配置
    //proxy look for https://vitejs.cn/config/#server-proxy
    // proxy: {
    //   '/api': {
    //     target: loadEnv(mode, process.cwd()).VITE_APP_PROXY_URL,
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  },
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 把 @ 指向到 src 目录去
    },
  },
  build: {
    target: "modules", // 设置最终构建的浏览器兼容目标。modules:支持原生 ES 模块的浏览器
    outDir: "dist", // 指定输出路径
    assetsDir: "assets", // 指定生成静态资源的存放路径
    sourcemap: false, // 构建后是否生成 source map 文件
    minify: "terser", // 混淆器，terser构建后文件体积更小
  },
  css: {
    //配置全局css文件
    preprocessorOptions: {
      less: {
        // additionalData: `@import "${path.resolve(__dirname, "src/css/global.less")}";@import "${path.resolve(__dirname, "src/css/darkMode.less")}";`,
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve("src/css/global.less")}"; @import (reference) "${path.resolve("src/css/darkMode.less")}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
});
