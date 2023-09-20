import * as THREE from "three";

export class Scene {
  views: {
    camera: THREE.PerspectiveCamera;
    bottom: number;
    height: number;
  }[];
  modelGroup: any;
  constructor(model: {
    children: { geometry: any }[];
    layers: { set: (arg0: number) => void };
  }) {
    views = [
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

    document.body.appendChild(this.renderer.domElement);

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
    const light = new THREE.PointLight(16777215, 0.75);
    light.position.z = 150;
    light.position.x = 70;
    light.position.y = -20;
    scene.add(light);

    this.softLight = new THREE.AmbientLight(16777215, 1.5);
    this.scene.add(this.softLight);

    // group
    this.onResize();
    window.addEventListener("resize", this.onResize, false);

    var edges = new THREE.EdgesGeometry(model.children[0].geometry);
    let line = new THREE.LineSegments(edges);
    line.material.depthTest = false;
    line.material.opacity = 0.5;
    line.material.transparent = true;
    line.position.x = 0.5;
    line.position.z = -1;
    line.position.y = 0.2;

    this.modelGroup = new THREE.Group();

    model.layers.set(0);
    line.layers.set(1);

    this.modelGroup.add(model);
    this.modelGroup.add(line);
    this.scene.add(this.modelGroup);
  }

  renderer = () => {
    for (var ii = 0; ii < this.views.length; ++ii) {
      var view = this.views[ii];
      var camera = view.camera;

      var bottom = Math.floor(this.h * view.bottom);
      var height = Math.floor(this.h * view.height);

      this.renderer.setViewport(0, 0, this.w, this.h);
      this.renderer.setScissor(0, bottom, this.w, height);
      this.renderer.setScissorTest(true);

      camera.aspect = this.w / this.h;
      this.renderer.render(this.scene, camera);
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
