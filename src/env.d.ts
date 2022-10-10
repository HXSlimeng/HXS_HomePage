/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module "three/addons/controls/OrbitControls.js" {
  export const OrbitControls: any;
}
// declare module "three" {
//   import type {} from 'three'
// }