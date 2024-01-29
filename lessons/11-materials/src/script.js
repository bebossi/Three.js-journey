import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

/**
 * Debug
 */

const gui = new GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorAmbientOcclusionTexture = textureLoader.load(
  '/textures/door/ambientOcclusion.jpg'
);
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');

const matCapTexture = textureLoader.load('/textures/matcaps/1.png');
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg');

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matCapTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Objects
 */
//MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial({
//   //   map: doorColorTexture,
//   //   color: 0xff0000,
//   //   wireframe: true,
//   //   opacity: 0.3,
//   alphaMap: doorAlphaTexture,
//   side: THREE.DoubleSide,
// });

// MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial();

// MeshMatcapMAterial
// const material = new THREE.MeshMatcapMaterial({ matcap: matCapTexture });

//MeshLambertMaterial
// const material = new THREE.MeshLambertMaterial();

//MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial({
//   shininess: 1000,
//   specular: new THREE.Color(0x1188ff),
// });

// // MeshToonMaterial

// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;
// const material = new THREE.MeshToonMaterial({
//   gradientMap: gradientTexture,
// });

//MeshStandardMaterial
// const material = new THREE.MeshStandardMaterial({
//   metalness: 1,
//   roughness: 1,
//   map: doorColorTexture,
//   aoMap: doorAmbientOcclusionTexture,
//   aoMapIntensity: 1,
//   displacementMap: doorHeightTexture,
//   displacementScale: 0.1,
//   metalnessMap: doorMetalnessTexture,
//   roughnessMap: doorRoughnessTexture,
//   normalMap: doorNormalTexture,

//   transparent: true,
//   alphaMap: doorAlphaTexture,
// });
// gui.add(material, 'metalness').min(0).max(1).step(0.0001);
// gui.add(material, 'roughness').min(0).max(1).step(0.0001);

//MeshPhysicalMaterial
const material = new THREE.MeshPhysicalMaterial({
  metalness: 1,
  roughness: 1,
  map: doorColorTexture,
  aoMap: doorAmbientOcclusionTexture,
  aoMapIntensity: 1,
  displacementMap: doorHeightTexture,
  displacementScale: 0.1,
  metalnessMap: doorMetalnessTexture,
  roughnessMap: doorRoughnessTexture,
  normalMap: doorNormalTexture,

  transparent: true,
  alphaMap: doorAlphaTexture,
});
gui.add(material, 'metalness').min(0).max(1).step(0.0001);
gui.add(material, 'roughness').min(0).max(1).step(0.0001);

//Clearcoat
// material.clearcoat = 1;
// material.clearcoatRoughness = 0;

// gui.add(material, 'clearcoat').min(0).max(1).step(0.0001);
// gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.0001);

// SHeenc   for fluffy material
// material.sheen = 1;
// material.sheenRoughness = 0.25;
// material.sheenColor.set(1, 1, 1);

// gui.add(material, 'sheen').min(0).max(1).step(0.0001);
// gui.add(material, 'sheenRoughness').min(0).max(1).step(0.0001);
// gui.addColor(material, 'sheenColor');

/**
 * Lights
 */

// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// const pointLight = new THREE.PointLight(0xffffff, 30);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);
// scene.add(ambientLight);

/**
 * Env map
 */
const rgbeLoader = new RGBELoader();
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = environmentMap;
  scene.environment = environmentMap;
});

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
sphere.position.x = -1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 64, 128), material);
torus.position.x = 1.5;

scene.add(sphere, plane, torus);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  sphere.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = -0.15 * elapsedTime;
  torus.rotation.x = -0.15 * elapsedTime;
  plane.rotation.x = -0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
