import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CarController } from "./CarControler";
import TWEEN from "@tweenjs/tween.js";
import { ref } from "vue";
export enum HUMAN_ACTIONS {
  IDLE,
  LANDING,
  BORED,
}

export function useThree(afterLandingComplete: () => void) {
  let carInstance: CarController;
  const moduleLoading = ref(true);
  const tScene = new THREE.Scene();
  const glbLoader = new GLTFLoader();
  const tCamera = new THREE.PerspectiveCamera(0.2, window.innerWidth / window.innerHeight, 1, 10000);
  tCamera.position.set(0, 100, 1000);

  const helper = new THREE.CameraHelper(tCamera);
  const axesHelper = new THREE.AxesHelper(5);

  //叠影失真  logarithmicDepthBuffer
  const tRenderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
  tRenderer.setClearColor(0xd3df56, 0);
  tRenderer.toneMappingExposure = 1;
  tRenderer.setPixelRatio(window.devicePixelRatio);
  tRenderer.outputEncoding = THREE.sRGBEncoding;
  tRenderer.setSize(window.innerWidth, window.innerHeight);

  const render = () => {
    tRenderer.render(tScene, tCamera);
  };

  const controls = new OrbitControls(tCamera, tRenderer.domElement);

  controls.addEventListener("change", render);
  controls.enabled = false;

  let light = new THREE.DirectionalLight(0xffffff, 1);

  tScene.add(light);
  tScene.add(new THREE.AmbientLight(0xffffff, 0.5));
  // tScene.add(axesHelper);
  // tScene.add(helper);

  const setCarKeyUpListener = (instance: CarController) => {
    //判断是不是正在转向
    let leftning = false;
    let rightning = false;

    window.addEventListener("keydown", (event) => {
      let keyCode = event.code;
      switch (keyCode) {
        /* 控制小车模型的变化 */
        //向前
        case "KeyW":
          instance.goStraight("forward");
          break;
        //向后
        case "KeyS":
          instance.goStraight("backward");
          break;
        //向右
        case "KeyA":
          if (!rightning && !leftning) {
            instance.carTurnto("left");
            leftning = true;
          }
          break;
        //向左
        case "KeyD":
          if (!rightning && !leftning) {
            instance.carTurnto("right");
            rightning = true;
          }
          break;
        default:
          break;
      }
    });
    window.addEventListener("keyup", (event) => {
      let keyUpCode = event.code;
      if (keyUpCode == "KeyW" || keyUpCode == "KeyS") {
        instance.stopGoStraight();
        instance.hideNo2();
      } else if (keyUpCode == "KeyA" || keyUpCode == "KeyD") {
        if (leftning) {
          leftning = false;
          instance.resetDirection("left");
        } else if (rightning) {
          rightning = false;
          instance.resetDirection("right");
        }
      }
      render();
    });
  };

  let clock = new THREE.Clock();
  let mixer: THREE.AnimationMixer;
  const animate = () => {
    requestAnimationFrame(() => {
      animate();
      const delta = clock.getDelta();
      humanMixer.update(delta);
      render();
    });
  };

  let humanActions: THREE.AnimationAction[] = []; //人物动作
  let humanMixer: THREE.AnimationMixer;
  const afterLoadHuman = (gltf: GLTF) => {
    moduleLoading.value = false;
    tScene.add(gltf.scene);
    humanMixer = new THREE.AnimationMixer(gltf.scene);
    gltf.scene.position.y = -1;
    gltf.animations.forEach((animate) => {
      let action = humanMixer.clipAction(animate);
      humanActions.push(action);
    });
    //入场动作不重复执行
    humanActions[HUMAN_ACTIONS.LANDING].loop = THREE.LoopOnce;
    humanActions[HUMAN_ACTIONS.LANDING].clampWhenFinished = true;
    humanActions[HUMAN_ACTIONS.LANDING].play();
    humanMixer.addEventListener("finished", (e) => {
      const { name } = e.action._clip;
      if (name === "landing") {
        cameraFocusHuman();
      }
    });
    animate();
    render();
  };
  /* glbLoader.load(
    "/src/glbs/yellow_muscle_car1.glb",
    function (gltf) {
      gltf.scene.position.y = 1;
      tScene.add(gltf.scene);
      mixer = new THREE.AnimationMixer(gltf.scene);
      let animations = gltf.animations;
      let action = mixer.clipAction(animations[0]);
      // action.play();
      animate();
      carInstance = new CarController(tScene, render);
      render();
      setKeyUpListener(carInstance);
    },
    undefined,
    (err) => {
      console.log(err);
    }
  ); */
  glbLoader.load("/src/glbs/standing1.glb", afterLoadHuman, undefined, (err) => {
    moduleLoading.value = false;
    console.log(err);
  });

  const moveHuman2Idle = () => {
    tCamera.aspect = 700 / 500;
    tRenderer.setSize(700, 500);
    tCamera.position.set(0, 0, 500);
    controls.update();
    tScene.position.y = -0.1;
    tCamera.updateProjectionMatrix();
    humanActions[HUMAN_ACTIONS.LANDING].fadeOut(0.1);
    humanActions[HUMAN_ACTIONS.BORED].play();
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 2;
    controls.minDistance = 500;
    controls.maxDistance = 860;
    controls.enabled = true;
  };

  let moveCameraFin = false;
  let mvCameraTimer: number;
  type MovePos = { x: number; y: number; z: number };
  const animateCamera = (current1: MovePos, target1: MovePos, current2: MovePos, target2: MovePos) => {
    let obj = {
      x1: current1.x, // 相机当前位置x
      y1: current1.y, // 相机当前位置y
      z1: current1.z, // 相机当前位置z
      x2: current2.x, // 控制当前的中心点x
      y2: current2.y, // 控制当前的中心点y
      z2: current2.z, // 控制当前的中心点z
    };

    let tween = new TWEEN.Tween(obj);
    tween.to(
      {
        x1: target1.x, // 新的相机位置x
        y1: target1.y, // 新的相机位置y
        z1: target1.z, // 新的相机位置z
        x2: target2.x, // 新的控制中心点位置x
        y2: target2.y, // 新的控制中心点位置x
        z2: target2.z, // 新的控制中心点位置x
      },
      600
    );
    tween.onUpdate(() => {
      tCamera.position.x = obj.x1;
      tCamera.position.y = obj.y1;
      tCamera.position.z = obj.z1;
      controls.target.x = obj.x2;
      controls.target.y = obj.y2;
      controls.target.z = obj.z2;
      // tCamera.lookAt(tScene.children[0].position);
      controls.update();
    });
    tween.onComplete(function () {
      moveCameraFin = true;
      window.cancelAnimationFrame(mvCameraTimer);
      afterLandingComplete();
    });
    tween.easing(TWEEN.Easing.Cubic.InOut);
    tween.start();
  };
  const cameraFocusHuman = () => {
    // 0, 100, 1000;
    let endPos = { x: 15, y: -30, z: 500 };
    animateCamera({ ...tCamera.position }, endPos, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 });
    (function animateReq() {
      mvCameraTimer = window.requestAnimationFrame(animateReq);
      TWEEN.update();
    })();
  };

  return {
    tCamera,
    tRenderer,
    humanActions,
    controls,
    moveHuman2Idle,
    moduleLoading,
  };
}
