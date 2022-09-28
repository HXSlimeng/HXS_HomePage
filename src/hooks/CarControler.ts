import { Vector3 } from "three";
import { debounce, throttle } from "lodash";
enum WHEEL_KEYS {
  F_LEFT = "Cylinder017",
  F_RIGHT = "Cylinder030",
  F_LEFT_IN = "Cylinder015",
  F_LEFT_IN_CIR = "Cylinder034",
  F_RIGHT_IN = "Cylinder020",
  F_RIGHT_IN_CIR = "Cylinder028",
  B_LEFT = "Cylinder027",
  B_RIGHT = "Cylinder029",
  B_LEFT_IN = "Cylinder025",
  B_RIGHT_IN = "Cylinder022",
}
enum MODULE_PART {
  CAR_NO2_1 = "Cylinder039",
  CAR_NO2_2 = "Cylinder040",
  CAR_LIGNT = "",
}
type IstraightDir = "forward" | "backward";
type Idirection = "left" | "right";

export class CarController {
  mainScene: THREE.Scene;
  allWheels: THREE.Object3D[] = [];
  frontWheels: THREE.Object3D[] = [];
  goStraightTimer: number | null = null;
  going: boolean = false;
  render: () => void;
  constructor(mainScene: THREE.Scene, renderFun: () => void) {
    this.mainScene = mainScene;
    this.allWheels = this.getWheels();
    this.getWheels();
    this.render = renderFun;
    this.hideNo2();
  }
  get allNo2() {
    let no1 = this.mainScene.getObjectByName(MODULE_PART.CAR_NO2_1);
    let no2 = this.mainScene.getObjectByName(MODULE_PART.CAR_NO2_2);
    return [no1, no2];
  }
  showNo2() {
    this.allNo2.forEach((v) => {
      v?.scale.setScalar(4.2);
    });
  }
  hideNo2() {
    this.allNo2.forEach((v) => {
      v?.scale.setScalar(0);
    });
  }
  goStraight(direction: IstraightDir) {
    cancelAnimationFrame(this.goStraightTimer as number);
    if (direction == "forward") {
      this.showNo2();
    }
    this.intervalRender(() => {
      this.allWheels.forEach((w, k) => {
        this.allWheels[k].rotateOnAxis(new Vector3(1, 0, 0), direction == "forward" ? 0.2 : -0.2);
      });

      this.render();
    });
  }
  intervalRender(callback: () => void): void {
    this.goStraightTimer = requestAnimationFrame(() => {
      callback();
      this.intervalRender(callback);
    });
  }
  stopGoStraight() {
    cancelAnimationFrame(this.goStraightTimer as number);
  }
  resetDirection(resetDirection: "right" | "left") {
    this.frontWheels.forEach((w, k) => {
      w.rotateOnWorldAxis(new Vector3(0, 1, 0), resetDirection == "left" ? -0.5 : 0.5);
    });
    this.render();
  }

  carTurnto(direction: Idirection) {
    // this.resetDirection();
    this.frontWheels.forEach((w, k) => {
      // w.rotateOnWorldAxis(new Vector3(0, 1, 0), 0);
      w.rotateOnWorldAxis(new Vector3(0, 1, 0), direction == "left" ? 0.5 : -0.5);
      //   w.rotation.z = direction === "left" ? 0.5 : -0.5;
      //   w.rotateOnAxis(new Vector3(0, 1, 1), direction === "left" ? 0.5 : -0.5);
    });
    this.render();
  }

  getWheels(): THREE.Object3D[] {
    let key: keyof typeof WHEEL_KEYS;
    let wheels: THREE.Object3D[] = [];
    let ftWheels: THREE.Object3D[] = [];
    for (key in WHEEL_KEYS) {
      if (Object.prototype.hasOwnProperty.call(WHEEL_KEYS, key)) {
        const moduleName = WHEEL_KEYS[key];
        let module = this.mainScene.getObjectByName(moduleName);
        if (module) {
          if (key.includes("F_")) {
            ftWheels.push(module);
          }
          wheels.push(module);
        }
      }
    }
    this.frontWheels = ftWheels;
    return wheels;
  }
}
