import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import TWEEN from "@tweenjs/tween.js";
import { ref } from "vue";

export enum HUMAN_ACTIONS {
  IDLE,
  LANDING,
  BORED,
}

export function useThree(afterLandingComplete: () => void) {
  const moduleLoading = ref(true);
  const tScene = new THREE.Scene();
  const glbLoader = new GLTFLoader();
  const tCamera = new THREE.PerspectiveCamera(0.2, 400 / 500, 1, 10000);
  tCamera.position.set(0, 0, 500);

  const helper = new THREE.CameraHelper(tCamera);
  const axesHelper = new THREE.AxesHelper(5);
  //叠影失真  logarithmicDepthBuffer
  const tRenderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
  tRenderer.setClearColor(0xd3df56, 0);
  tRenderer.toneMappingExposure = 1;
  tRenderer.setPixelRatio(window.devicePixelRatio);
  tRenderer.outputEncoding = THREE.sRGBEncoding;
  tRenderer.setSize(400, 500);
  const render = () => {
    tRenderer.render(tScene, tCamera);
  };

  const controls = new OrbitControls(tCamera, tRenderer.domElement);
  controls.maxPolarAngle = Math.PI / 2;
  controls.minPolarAngle = Math.PI / 2;
  controls.minDistance = 500;
  controls.maxDistance = 860;
  controls.enabled = true;

  controls.addEventListener("change", render);
  let light = new THREE.DirectionalLight(0xffffff, 1);

  tScene.add(light);
  tScene.add(new THREE.AmbientLight(0xffffff, 0.5));
  // tScene.add(axesHelper);
  // tScene.add(helper);

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

  const humanEntryNoAction = (gltf: GLTF) => {
    moduleLoading.value = false;
    tScene.add(gltf.scene);
    humanMixer = new THREE.AnimationMixer(gltf.scene);
    gltf.scene.position.y = -1;
    gltf.animations.forEach((animate) => {
      let action = humanMixer.clipAction(animate);
      humanActions.push(action);
    });
    afterLandingComplete();
  };
  const afterLoadHuman = (gltf: GLTF) => {
    humanEntryNoAction(gltf);
    animate();
    render();
  };
  const loadingProgress = ref(0);
  const gltfLoaderProgress = (xhr: ProgressEvent) => {
    loadingProgress.value = Math.round((xhr.loaded / xhr.total) * 100);
  };

  const loadGLTF = () => {
    glbLoader.load("/glbs/standing-prcesd.glb", afterLoadHuman, gltfLoaderProgress, (err) => {
      moduleLoading.value = false;
    });
  };

  let moveCameraFin = false;
  let mvCameraTimer: number;
  type MovePos = { x: number; y: number; z: number };
  const animateCamera = (current1: MovePos, target1: MovePos, current2: MovePos, target2: MovePos) => {
    let obj = {
      x1: current1.x,
      y1: current1.y,
      z1: current1.z,
      x2: current2.x,
      y2: current2.y,
      z2: current2.z,
    };

    let tween = new TWEEN.Tween(obj);
    tween.to(
      {
        x1: target1.x,
        y1: target1.y,
        z1: target1.z,
        x2: target2.x,
        y2: target2.y,
        z2: target2.z,
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
    moduleLoading,
    loadGLTF,
    loadingProgress,
  };
}
