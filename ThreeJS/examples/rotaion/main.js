import * as THREE from "../../build/three.module.js";
import { GLTFLoader } from "../../ThreeJS/build/GLTFLoader.js.js";
import { OrbitControls } from "../../build/OrbitControls.js";

const canvas = document.querySelector("#c");

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.outputEncoding = THREE.sRGBEncoding;

const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  1,
  10000
);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 20, 90);

controls.update();

const PointLight = new THREE.PointLight(0xffffff, 1);
scene.add(PointLight);
const DirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(DirectionalLight);
const AmbientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(AmbientLight);

const loader = new GLTFLoader();

loader.load("viking_room/scene.gltf", function (gltf) {
  scene.add(gltf.scene);
  renderer.render(scene, camera);
  function animate() {
    requestAnimationFrame(animate);
    gltf.scene.rotation.y += 0.005;
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
});
