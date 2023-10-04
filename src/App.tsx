import { useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import Stats from "three/examples/jsm/libs/stats.module";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
//import { GUI } from "dat.gui";
// import Stats from "three/examples/jsm/libs/stats.module";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
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

  class Scene {
    renderer = new THREE.WebGLRenderer();
    views: any;
    w!: number;
    h!: number;
    modelGroup: any;
    constructor(model: {
      children: { geometry: any }[];
      layers: { set: (arg0: number) => void };
    }) {
      const views = [
        { bottom: 0, height: 1 },
        { bottom: 0, height: 0 },
      ];

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.setPixelRatio(window.devicePixelRatio);

      document.body.appendChild(renderer.domElement);

      // scene

      const scene = new THREE.Scene();

      for (var ii = 0; ii < views.length; ++ii) {
        const view = views[ii];
        const camera = new THREE.PerspectiveCamera(
          45,
          window.innerWidth / window.innerHeight,
          1,
          2000
        );
        camera.position.fromArray([0, 0, 180]);
        camera.layers.disableAll();
        camera.layers.enable(ii);
        view.camera = camera;
        camera.lookAt(new THREE.Vector3(0, 5, 0));
      }

      //light

      const light = new THREE.PointLight(0xffffff, 0.75);
      light.position.z = 150;
      light.position.x = 70;
      light.position.y = -20;
      scene.add(light);

      const softLight = new THREE.AmbientLight(0xffffff, 1.5);
      scene.add(softLight);

      // group

      this.onResize();
      window.addEventListener("resize", this.onResize, false);

      const edges = new THREE.EdgesGeometry(model.children[0].geometry);
      const line = new THREE.LineSegments(edges);
      line.material.depthTest = false;
      line.material.opacity = 0.5;
      line.material.transparent = true;
      line.position.x = 0.5;
      line.position.z = -1;
      line.position.y = 0.2;

      const modelGroup = new THREE.Group();

      model.layers.set(0);
      line.layers.set(1);

      modelGroup.add(model);
      modelGroup.add(line);
      scene.add(modelGroup);
    }

    render = () => {
      for (var ii = 0; ii < view.length; ++ii) {
        var view = this.views[ii];
        var camera = view.camera;

        var bottom = Math.floor(this.h * view.bottom);
        var height = Math.floor(this.h * view.height);

        this.renderer.setViewport(0, 0, this.w, this.h);
        this.renderer.setScissor(0, bottom, this.w, height);
        this.renderer.setScissorTest(true);

        camera.aspect = this.w / this.h;
        this.renderer.render(Scene, camera);
      }
    };

    onResize = () => {
      this.w = window.innerWidth;
      this.h = window.innerHeight;

      for (var ii = 0; ii < this.views.length; ++ii) {
        var view = this.views[ii];
        var camera = view.camera;
        camera.aspect = this.w / this.h;
        let camZ = (screen.width - this.w * 1) / 3;
        camera.position.z = camZ < 180 ? 180 : camZ;
        camera.updateProjectionMatrix();
      }

      this.renderer.setSize(this.w, this.h);
      this.render();
    };
  }

  function loadModel() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(DrawSVGPlugin);
    gsap.set("#line-length", { drawSVG: 0 });
    gsap.set("#line-wingspan", { drawSVG: 0 });
    gsap.set("#circle-phalange", { drawSVG: 0 });

    let object: unknown;

    function onModelLoaded() {
      object.traverse(function (child: { material: THREE.MeshPhongMaterial }) {
        let mat = new THREE.MeshPhongMaterial({
          color: 0x171511,
          specular: 0xd0cbc7,
          shininess: 5,
          flatShading: true,
        });
        child.material = mat;
      });

      setupAnimation(object);
    }

    var manager = new THREE.LoadingManager(onModelLoaded);
    manager.onProgress = (item, loaded, total) =>
      console.log(item, loaded, total);

    var loader = new THREE.Loader(manager);
    loader.load(
      "https://assets.codepen.io/557388/1405+Plane_1.obj",
      function (obj) {
        object = obj;
      }
    );
  }

  function setupAnimation(model: unknown) {
    let scene = new Scene(model);
    let plane = scene.modelGroup;

    gsap.fromTo(
      "canvas",
      { x: "50%", autoAlpha: 0 },
      { duration: 1, x: "0%", autoAlpha: 1 }
    );
    gsap.to(".loading", { autoAlpha: 0 });
    gsap.to(".scroll-cta", { opacity: 1 });
    gsap.set("svg", { autoAlpha: 1 });

    let tau = Math.PI * 2;

    gsap.set(plane.rotation, { y: tau * -0.25 });
    gsap.set(plane.position, { x: 80, y: -32, z: -60 });

    scene.render();

    var sectionDuration = 1;
    gsap.fromTo(
      scene.views[1],
      { height: 1, bottom: 0 },
      {
        height: 0,
        bottom: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".blueprint",
          scrub: true,
          start: "bottom bottom",
          end: "bottom top",
        },
      }
    );

    gsap.fromTo(
      scene.views[1],
      { height: 0, bottom: 0 },
      {
        height: 1,
        bottom: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".blueprint",
          scrub: true,
          start: "top bottom",
          end: "top top",
        },
      }
    );

    gsap.to(".ground", {
      y: "30%",
      scrollTrigger: {
        trigger: ".ground-container",
        scrub: true,
        start: "top bottom",
        end: "bottom top",
      },
    });

    gsap.from(".clouds", {
      y: "25%",
      scrollTrigger: {
        trigger: ".ground-container",
        scrub: true,
        start: "top bottom",
        end: "bottom top",
      },
    });

    gsap.to("#line-length", {
      drawSVG: 100,
      scrollTrigger: {
        trigger: ".length",
        scrub: true,
        start: "top bottom",
        end: "top top",
      },
    });

    gsap.to("#line-wingspan", {
      drawSVG: 100,
      scrollTrigger: {
        trigger: ".wingspan",
        scrub: true,
        start: "top 25%",
        end: "bottom 50%",
      },
    });

    gsap.to("#circle-phalange", {
      drawSVG: 100,
      scrollTrigger: {
        trigger: ".phalange",
        scrub: true,
        start: "top 50%",
        end: "bottom 100%",
      },
    });

    gsap.to("#line-length", {
      opacity: 0,
      drawSVG: 0,
      scrollTrigger: {
        trigger: ".length",
        scrub: true,
        start: "top top",
        end: "bottom top",
      },
    });

    gsap.to("#line-wingspan", {
      opacity: 0,
      drawSVG: 0,
      scrollTrigger: {
        trigger: ".wingspan",
        scrub: true,
        start: "top top",
        end: "bottom top",
      },
    });

    gsap.to("#circle-phalange", {
      opacity: 0,
      drawSVG: 0,
      scrollTrigger: {
        trigger: ".phalange",
        scrub: true,
        start: "top top",
        end: "bottom top",
      },
    });

    let tl = new gsap.timeline({
      onUpdate: scene.render,
      scrollTrigger: {
        trigger: ".content",
        scrub: true,
        start: "top top",
        end: "bottom bottom",
      },
      defaults: { duration: sectionDuration, ease: "power2.inOut" },
    });

    let delay = 0;

    tl.to(".scroll-cta", { duration: 0.25, opacity: 0 }, delay);
    tl.to(plane.position, { x: -10, ease: "power1.in" }, delay);

    delay += sectionDuration;

    tl.to(
      plane.rotation,
      { x: tau * 0.25, y: 0, z: -tau * 0.05, ease: "power1.inOut" },
      delay
    );
    tl.to(
      plane.position,
      { x: -40, y: 0, z: -60, ease: "power1.inOut" },
      delay
    );

    delay += sectionDuration;

    tl.to(
      plane.rotation,
      { x: tau * 0.25, y: 0, z: tau * 0.05, ease: "power3.inOut" },
      delay
    );
    tl.to(plane.position, { x: 40, y: 0, z: -60, ease: "power2.inOut" }, delay);

    delay += sectionDuration;

    tl.to(
      plane.rotation,
      { x: tau * 0.2, y: 0, z: -tau * 0.1, ease: "power3.inOut" },
      delay
    );
    tl.to(
      plane.position,
      { x: -40, y: 0, z: -30, ease: "power2.inOut" },
      delay
    );

    delay += sectionDuration;

    tl.to(plane.rotation, { x: 0, z: 0, y: tau * 0.25 }, delay);
    tl.to(plane.position, { x: 0, y: -10, z: 50 }, delay);

    delay += sectionDuration;
    delay += sectionDuration;

    tl.to(
      plane.rotation,
      { x: tau * 0.25, y: tau * 0.5, z: 0, ease: "power4.inOut" },
      delay
    );
    tl.to(plane.position, { z: 30, ease: "power4.inOut" }, delay);

    delay += sectionDuration;

    tl.to(
      plane.rotation,
      { x: tau * 0.25, y: tau * 0.5, z: 0, ease: "power4.inOut" },
      delay
    );
    tl.to(plane.position, { z: 60, x: 30, ease: "power4.inOut" }, delay);

    delay += sectionDuration;

    tl.to(
      plane.rotation,
      { x: tau * 0.35, y: tau * 0.75, z: tau * 0.6, ease: "power4.inOut" },
      delay
    );
    tl.to(plane.position, { z: 100, x: 20, y: 0, ease: "power4.inOut" }, delay);

    delay += sectionDuration;

    tl.to(
      plane.rotation,
      { x: tau * 0.15, y: tau * 0.85, z: -tau * 0, ease: "power1.in" },
      delay
    );
    tl.to(plane.position, { z: -150, x: 0, y: 0, ease: "power1.inOut" }, delay);

    delay += sectionDuration;

    tl.to(
      plane.rotation,
      {
        duration: sectionDuration,
        x: -tau * 0.05,
        y: tau,
        z: -tau * 0.1,
        ease: "none",
      },
      delay
    );
    tl.to(
      plane.position,
      { duration: sectionDuration, x: 0, y: 30, z: 320, ease: "power1.in" },
      delay
    );

    tl.to(
      scene.light.position,
      { duration: sectionDuration, x: 0, y: 0, z: 0 },
      delay
    );
  }

  loadModel();
  return (
    <div className="content">
      <div className="loading">Loading</div>
      <div className="trigger"></div>
      <div className="section">
        <h1>Airplanes.</h1>
        <h3>The beginners guide.</h3>
        <p>You've probably forgotten what these are.</p>
        <div className="scroll-cta">Scroll</div>
      </div>

      <div className="section right">
        <h2>They're kinda like buses...</h2>
      </div>

      <div className="ground-container">
        <div className="parallax ground"></div>
        <div className="section right">
          <h2>..except they leave the ground.</h2>
          <p>Saaay what!?.</p>
        </div>

        <div className="section">
          <h2>They fly through the sky.</h2>
          <p>For realsies!</p>
        </div>

        <div className="section right">
          <h2>Defying all known physical laws.</h2>
          <p>It's actual magic!</p>
        </div>
        <div className="parallax clouds"></div>
      </div>

      <div className="blueprint">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <line id="line-length" x1="10" y1="80" x2="90" y2="80"></line>
          <path
            id="line-wingspan"
            d="M10 50, L40 35, M60 35 L90 50"
            // stroke-width="0.5"
          ></path>
          <circle
            id="circle-phalange"
            cx="60"
            cy="60"
            r="15"
            fill="transparent"
            // stroke-width="0.5"
          ></circle>
        </svg>
        <div className="section dark ">
          <h2>The facts and figures.</h2>
          <p>Lets get into the nitty gritty...</p>
        </div>
        <div className="section dark length">
          <h2>Length.</h2>
          <p>Long.</p>
        </div>
        <div className="section dark wingspan">
          <h2>Wing Span.</h2>
          <p>I dunno, longer than a cat probably.</p>
        </div>
        <div className="section dark phalange">
          <h2>Left Phalange</h2>
          <p>Missing</p>
        </div>
        <div className="section dark">
          <h2>Engines</h2>
          <p>Turbine funtime</p>
        </div>
      </div>
      <div className="sunset">
        <div className="section"></div>
        <div className="section end">
          <h2>Fin.</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
