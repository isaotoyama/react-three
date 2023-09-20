import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import Stats from "three/examples/jsm/libs/stats.module";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { GUI } from "dat.gui";
// import Stats from "three/examples/jsm/libs/stats.module";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/dist/ScrollTrigger";

// clearing the console (just a CodePen thing)

console.clear();

// there are 3 parts to this
//
// Scene:           Setups and manages threejs rendering
// loadModel:       Loads the 3d obj file
// setupAnimation:  Creates all the GSAP
//                  animtions and scroll triggers
//
// first we call loadModel, once complete we call
// setupAnimation which creates a new Scene

// const scene = new THREE.Scene();

// class Scene {
//   views:
//     | {
//         camera: THREE.PerspectiveCamera;
//         bottom: number;
//         height: number;
//       }[]
//     | undefined;
//   modelGroup: any;
//   softLight: THREE.AmbientLight;
//   scene: any;
//   light: any;
//   constructor(model: {
//     children: { geometry: any }[];
//     layers: { set: (arg0: number) => void };
//   }) {
//     const views = [
//       { bottom: 0, height: 1 },
//       { bottom: 0, height: 0 },
//     ];

//     const renderer = new THREE.WebGLRenderer({
//       antialias: true,
//       alpha: true,
//     });

//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.shadowMap.enabled = true;
//     renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//     renderer.setPixelRatio(window.devicePixelRatio);

//     document.body.appendChild(this.renderer.domElement);

//     // scene

//     const scene = new THREE.Scene();

//     for (var ii = 0; ii < views.length; ++ii) {
//       const view = views[ii];
//       const camera = new THREE.PerspectiveCamera(
//         45,
//         window.innerWidth / window.innerHeight,
//         1,
//         2000
//       );
//       camera.position.fromArray([0, 0, 180]);
//       camera.layers.disableAll();
//       camera.layers.enable(ii);
//       view.camera = camera;
//       camera.lookAt(new THREE.Vector3(0, 5, 0));
//     }

//     //light

//     const light = new THREE.PointLight(0xffffff, 0.75);
//     light.position.z = 150;
//     light.position.x = 70;
//     light.position.y = -20;
//     scene.add(light);

//     this.softLight = new THREE.AmbientLight(0xffffff, 1.5);
//     this.scene.add(this.softLight);

//     // group

//     this.onResize();
//     window.addEventListener("resize", this.onResize, false);

//     var edges = new THREE.EdgesGeometry(model.children[0].geometry);
//     let line = new THREE.LineSegments(edges);
//     line.material.depthTest = false;
//     line.material.opacity = 0.5;
//     line.material.transparent = true;
//     line.position.x = 0.5;
//     line.position.z = -1;
//     line.position.y = 0.2;

//     this.modelGroup = new THREE.Group();

//     model.layers.set(0);
//     line.layers.set(1);

//     this.modelGroup.add(model);
//     this.modelGroup.add(line);
//     this.scene.add(this.modelGroup);
//   }

//   renderer = () => {
//     for (var ii = 0; ii < this.views.length; ++ii) {
//       var view = this.views[ii];
//       var camera = view.camera;

//       var bottom = Math.floor(this.h * view.bottom);
//       var height = Math.floor(this.h * view.height);

//       this.renderer.setViewport(0, 0, this.w, this.h);
//       this.renderer.setScissor(0, bottom, this.w, height);
//       this.renderer.setScissorTest(true);

//       camera.aspect = this.w / this.h;
//       this.renderer.render(this.scene, camera);
//     }
//   };

//   onResize = () => {
//     this.w = window.innerWidth;
//     this.h = window.innerHeight;

//     for (var ii = 0; ii < this.views.length; ++ii) {
//       var view = this.views[ii];
//       var camera = view.camera;
//       camera.aspect = this.w / this.h;
//       let camZ = (screen.width - this.w * 1) / 3;
//       camera.position.z = camZ < 180 ? 180 : camZ;
//       camera.updateProjectionMatrix();
//     }

//     this.renderer.setSize(this.w, this.h);
//     this.renderer();
//   };
// }
// function loadModel() {
//   gsap.registerPlugin(ScrollTrigger);
//   // gsap.registerPlugin(DrawSVGPlugin);
//   // gsap.set("#line-length", { drawSVG: 0 });
//   // gsap.set("#line-wingspan", { drawSVG: 0 });
//   // gsap.set("#circle-phalange", { drawSVG: 0 });

//   const objLoader = new OBJLoader();
//   objLoader.load(
//     "https://assets.codepen.io/557388/1405+Plane_1.obj",
//     (object) => {
//       // (object.children[0] as THREE.Mesh).material = material
//       // object.traverse(function (child) {
//       //     if ((child as THREE.Mesh).isMesh) {
//       //         (child as THREE.Mesh).material = material
//       //     }
//       // })
//       scene.add(object);
//     },
//     (xhr) => {
//       console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
//     },
//     (error) => {
//       console.log(error);
//     }
//   );

//   // function onModelLoaded() {
//   //   object.traverse(function (child) {
//   //     let mat = new THREE.MeshPhongMaterial({
//   //       color: 0x171511,
//   //       specular: 0xd0cbc7,
//   //       shininess: 5,
//   //       flatShading: true,
//   //     });
//   //     child.material = mat;
//   //   });

//   //   setupAnimation(object);
//   // }

//   // var manager = new THREE.LoadingManager(onModelLoaded);
//   // manager.onProgress = (item, loaded, total) =>
//   //   console.log(item, loaded, total);

//   // var loader = new THREE.Loader(manager);
//   // loader.load(
//   //   "https://assets.codepen.io/557388/1405+Plane_1.obj",
//   //   function (obj) {
//   //     object = obj;
//   //   }
//   // );
// }

// function setupAnimation(model) {
//   let scene = new Scene(model);
//   let plane = scene.modelGroup;

//   gsap.fromTo(
//     "canvas",
//     { x: "50%", autoAlpha: 0 },
//     { duration: 1, x: "0%", autoAlpha: 1 }
//   );
//   gsap.to(".loading", { autoAlpha: 0 });
//   gsap.to(".scroll-cta", { opacity: 1 });
//   gsap.set("svg", { autoAlpha: 1 });

//   let tau = Math.PI * 2;

//   gsap.set(plane.rotation, { y: tau * -0.25 });
//   gsap.set(plane.position, { x: 80, y: -32, z: -60 });

//   scene.renderer();

//   let sectionDuration = 1;
//   gsap.fromTo(
//     scene.views[1],
//     { height: 1, bottom: 0 },
//     {
//       height: 0,
//       bottom: 1,
//       ease: "none",
//       scrollTrigger: {
//         trigger: ".blueprint",
//         scrub: true,
//         start: "bottom bottom",
//         end: "bottom top",
//       },
//     }
//   );

//   gsap.fromTo(
//     scene.views[1],
//     { height: 0, bottom: 0 },
//     {
//       height: 1,
//       bottom: 0,
//       ease: "none",
//       scrollTrigger: {
//         trigger: ".blueprint",
//         scrub: true,
//         start: "top bottom",
//         end: "top top",
//       },
//     }
//   );

//   gsap.to(".ground", {
//     y: "30%",
//     scrollTrigger: {
//       trigger: ".ground-container",
//       scrub: true,
//       start: "top bottom",
//       end: "bottom top",
//     },
//   });

//   gsap.from(".clouds", {
//     y: "25%",
//     scrollTrigger: {
//       trigger: ".ground-container",
//       scrub: true,
//       start: "top bottom",
//       end: "bottom top",
//     },
//   });

//   gsap.to("#line-length", {
//     drawSVG: 100,
//     scrollTrigger: {
//       trigger: ".length",
//       scrub: true,
//       start: "top bottom",
//       end: "top top",
//     },
//   });

//   gsap.to("#line-wingspan", {
//     drawSVG: 100,
//     scrollTrigger: {
//       trigger: ".wingspan",
//       scrub: true,
//       start: "top 25%",
//       end: "bottom 50%",
//     },
//   });

//   gsap.to("#circle-phalange", {
//     drawSVG: 100,
//     scrollTrigger: {
//       trigger: ".phalange",
//       scrub: true,
//       start: "top 50%",
//       end: "bottom 100%",
//     },
//   });

//   gsap.to("#line-length", {
//     opacity: 0,
//     drawSVG: 0,
//     scrollTrigger: {
//       trigger: ".length",
//       scrub: true,
//       start: "top top",
//       end: "bottom top",
//     },
//   });

//   gsap.to("#line-wingspan", {
//     opacity: 0,
//     drawSVG: 0,
//     scrollTrigger: {
//       trigger: ".wingspan",
//       scrub: true,
//       start: "top top",
//       end: "bottom top",
//     },
//   });

//   gsap.to("#circle-phalange", {
//     opacity: 0,
//     drawSVG: 0,
//     scrollTrigger: {
//       trigger: ".phalange",
//       scrub: true,
//       start: "top top",
//       end: "bottom top",
//     },
//   });

//   let tl = new gsap.timeline({
//     onUpdate: scene.renderer,
//     scrollTrigger: {
//       trigger: ".content",
//       scrub: true,
//       start: "top top",
//       end: "bottom bottom",
//     },
//     defaults: { duration: sectionDuration, ease: "power2.inOut" },
//   });

//   let delay = 0;

//   tl.to(".scroll-cta", { duration: 0.25, opacity: 0 }, delay);
//   tl.to(plane.position, { x: -10, ease: "power1.in" }, delay);

//   delay += sectionDuration;

//   tl.to(
//     plane.rotation,
//     { x: tau * 0.25, y: 0, z: -tau * 0.05, ease: "power1.inOut" },
//     delay
//   );
//   tl.to(plane.position, { x: -40, y: 0, z: -60, ease: "power1.inOut" }, delay);

//   delay += sectionDuration;

//   tl.to(
//     plane.rotation,
//     { x: tau * 0.25, y: 0, z: tau * 0.05, ease: "power3.inOut" },
//     delay
//   );
//   tl.to(plane.position, { x: 40, y: 0, z: -60, ease: "power2.inOut" }, delay);

//   delay += sectionDuration;

//   tl.to(
//     plane.rotation,
//     { x: tau * 0.2, y: 0, z: -tau * 0.1, ease: "power3.inOut" },
//     delay
//   );
//   tl.to(plane.position, { x: -40, y: 0, z: -30, ease: "power2.inOut" }, delay);

//   delay += sectionDuration;

//   tl.to(plane.rotation, { x: 0, z: 0, y: tau * 0.25 }, delay);
//   tl.to(plane.position, { x: 0, y: -10, z: 50 }, delay);

//   delay += sectionDuration;
//   delay += sectionDuration;

//   tl.to(
//     plane.rotation,
//     { x: tau * 0.25, y: tau * 0.5, z: 0, ease: "power4.inOut" },
//     delay
//   );
//   tl.to(plane.position, { z: 30, ease: "power4.inOut" }, delay);

//   delay += sectionDuration;

//   tl.to(
//     plane.rotation,
//     { x: tau * 0.25, y: tau * 0.5, z: 0, ease: "power4.inOut" },
//     delay
//   );
//   tl.to(plane.position, { z: 60, x: 30, ease: "power4.inOut" }, delay);

//   delay += sectionDuration;

//   tl.to(
//     plane.rotation,
//     { x: tau * 0.35, y: tau * 0.75, z: tau * 0.6, ease: "power4.inOut" },
//     delay
//   );
//   tl.to(plane.position, { z: 100, x: 20, y: 0, ease: "power4.inOut" }, delay);

//   delay += sectionDuration;

//   tl.to(
//     plane.rotation,
//     { x: tau * 0.15, y: tau * 0.85, z: -tau * 0, ease: "power1.in" },
//     delay
//   );
//   tl.to(plane.position, { z: -150, x: 0, y: 0, ease: "power1.inOut" }, delay);

//   delay += sectionDuration;

//   tl.to(
//     plane.rotation,
//     {
//       duration: sectionDuration,
//       x: -tau * 0.05,
//       y: tau,
//       z: -tau * 0.1,
//       ease: "none",
//     },
//     delay
//   );
//   tl.to(
//     plane.position,
//     { duration: sectionDuration, x: 0, y: 30, z: 320, ease: "power1.in" },
//     delay
//   );

//   tl.to(
//     scene.light.position,
//     { duration: sectionDuration, x: 0, y: 0, z: 0 },
//     delay
//   );
// }

// loadModel();

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

const light1 = new THREE.PointLight(0xffffff, 100);
light1.position.set(2.5, 2.5, 2.5);
scene.add(light1);

const light2 = new THREE.PointLight(0xffffff, 100);
light2.position.set(-2.5, 2.5, 2.5);
scene.add(light2);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0.8, 0, 1.0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 1, 0);

// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })

// const objLoader = new OBJLoader();
// objLoader.load(
//   "https://assets.codepen.io/557388/1405+Plane_1.obj",
//   (object) => {
//     // (object.children[0] as THREE.Mesh).material = material
//     // object.traverse(function (child) {
//     //     if ((child as THREE.Mesh).isMesh) {
//     //         (child as THREE.Mesh).material = material
//     //     }
//     // })
//     scene.add(object);
//   },
//   (xhr) => {
//     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
//   },
//   (error) => {
//     console.log(error);
//   }
// );
// Instantiate a loader

let mixer: THREE.AnimationMixer;
let modelReady = false;
const animationActions: THREE.AnimationAction[] = [];
let activeAction: THREE.AnimationAction;
let lastAction: THREE.AnimationAction;
const gltfLoader = new GLTFLoader();

gltfLoader.load(
  "./src/plane/scene.gltf",
  (gltf) => {
    // gltf.scene.scale.set(.01, .01, .01)

    mixer = new THREE.AnimationMixer(gltf.scene);

    const animationAction = mixer.clipAction((gltf as any).animations[0]);
    animationActions.push(animationAction);
    animationsFolder.add(animations, "default");
    activeAction = animationActions[0];

    scene.add(gltf.scene);

    //add an animation from another file
    gltfLoader.load(
      "./src/plane/scene.gltf",
      (gltf) => {
        console.log("loaded 1");
        const animationAction = mixer.clipAction((gltf as any).animations[0]);
        animationActions.push(animationAction);
        animationsFolder.add(animations, "1");

        //add an animation from another file
        gltfLoader.load(
          "./src/plane/scene.gltf",
          (gltf) => {
            console.log("loaded 2");
            const animationAction = mixer.clipAction(
              (gltf as any).animations[0]
            );
            animationActions.push(animationAction);
            animationsFolder.add(animations, "2");

            //add an animation from another file
            gltfLoader.load(
              "./src/plane/scene.gltf",
              (gltf) => {
                console.log("loaded 3");
                (gltf as any).animations[0].tracks.shift(); //delete the specific track that moves the object forward while running
                const animationAction = mixer.clipAction(
                  (gltf as any).animations[0]
                );
                animationActions.push(animationAction);
                animationsFolder.add(animations, "3");

                modelReady = true;
              },
              (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
              },
              (error) => {
                console.log(error);
              }
            );
          },
          (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log(error);
  }
);
// Optional: Provide a DRACOLoader instance to decode compressed mesh data
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
// loader.setDRACOLoader(dracoLoader);

// Load a glTF resource
// loader.load(
//   // resource URL
//   "./src/plane/scene.gltf",
//   // called when the resource is loaded
//   function (gltf) {
//     scene.add(gltf.scene);

//     gltf.animations; // Array<THREE.AnimationClip>
//     gltf.scene; // THREE.Group
//     gltf.scenes; // Array<THREE.Group>
//     gltf.cameras; // Array<THREE.Camera>
//     gltf.asset; // Object
//   },
//   // called while loading is progressing
//   function (xhr) {
//     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
//   },
//   // called when loading has errors
//   function (error) {
//     console.log("An error happened");
//   }
// );
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

const stats = new Stats();
document.body.appendChild(stats.dom);

const animations = {
  default: function () {
    setAction(animationActions[0]);
  },
  1: function () {
    setAction(animationActions[1]);
  },
  2: function () {
    setAction(animationActions[2]);
  },
  3: function () {
    setAction(animationActions[3]);
  },
};

const setAction = (toAction: THREE.AnimationAction) => {
  if (toAction != activeAction) {
    lastAction = activeAction;
    activeAction = toAction;
    //lastAction.stop()
    lastAction.fadeOut(1);
    activeAction.reset();
    activeAction.fadeIn(1);
    activeAction.play();
  }
};

const gui = new GUI();
const animationsFolder = gui.addFolder("Animations");
animationsFolder.open();

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  if (modelReady) mixer.update(clock.getDelta());

  render();

  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
