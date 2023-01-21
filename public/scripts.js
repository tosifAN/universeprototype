import * as THREE from 'https://unpkg.com/three@0.148.0/build/three.module.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.114/examples/jsm/controls/OrbitControls.js';


const starsTexture= new Image();
starsTexture.src='./img/stars.jpg';
// import starsTexture from '../img/stars.jpg' ;

const sunTexture= new Image();
sunTexture.src = './img/sun.jpg'
// import sunTexture from '../img/sun.jpg';

const mercuryTexture= new Image();
mercuryTexture.src='./img/mercury.jpg'
// import mercuryTexture from '../img/mercury.jpg';


const venusTexture= new Image();
venusTexture.src='./img/venus.jpg'
// import venusTexture from '../img/venus.jpg';

const earthTexture= new Image();
earthTexture.src='./img/earth.jpg';
// import earthTexture from '../img/earth.jpg';

const marsTexture= new Image();
marsTexture.src='./img/mars.jpg'
// import marsTexture from '../img/mars.jpg';

const jupiterTexture= new Image();
jupiterTexture.src='./img/jupiter.jpg'
// import jupiterTexture from '../img/jupiter.jpg';

const saturnTexture= new Image();
saturnTexture.src='./img/saturn.jpg'
// import saturnTexture from '../img/saturn.jpg';

const saturnRingTexture= new Image();
saturnRingTexture.src='./img/saturn ring.png'
// import saturnRingTexture from '../img/saturn ring.png';

const uranusTexture= new Image();
uranusTexture.src='./img/uranus.jpg'
// import uranusTexture from '../img/uranus.jpg';

const uranusRingTexture= new Image();
uranusRingTexture.src='./img/uranus ring.png'
// import uranusRingTexture from '../img/uranus ring.png';

const neptuneTexture= new Image();
neptuneTexture.src='./img/neptune.jpg'
// import neptuneTexture from '../img/neptune.jpg';

const plutoTexture= new Image();
plutoTexture.src='./img/pluto.jpg'
// import plutoTexture from '../img/pluto.jpg';


const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture.src,
    starsTexture.src,
    starsTexture.src,
    starsTexture.src,
    starsTexture.src,
    starsTexture.src
]);

const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture.src)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

function createPlanete(size, texture, position, ring) {
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    if(ring) {
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32);
        const ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(obj);
    mesh.position.x = position;
    return {mesh, obj}
}

const mercury = createPlanete(3.2, mercuryTexture.src, 28);
const venus = createPlanete(5.8, venusTexture.src, 44);
const earth = createPlanete(6, earthTexture.src, 62);
const mars = createPlanete(4, marsTexture.src, 78);
const jupiter = createPlanete(12, jupiterTexture.src, 100);
const saturn = createPlanete(10, saturnTexture.src, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture.src
});
const uranus = createPlanete(7, uranusTexture.src, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture.src
});
const neptune = createPlanete(7, neptuneTexture.src, 200);
const pluto = createPlanete(2.8, plutoTexture.src, 216);

const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300);
scene.add(pointLight);

function animate() {
    //Self-rotation
    sun.rotateY(0.004);
    mercury.mesh.rotateY(0.004);
    venus.mesh.rotateY(0.002);
    earth.mesh.rotateY(0.02);
    mars.mesh.rotateY(0.018);
    jupiter.mesh.rotateY(0.04);
    saturn.mesh.rotateY(0.038);
    uranus.mesh.rotateY(0.03);
    neptune.mesh.rotateY(0.032);
    pluto.mesh.rotateY(0.008);

    //Around-sun-rotation
    mercury.obj.rotateY(0.04);
    venus.obj.rotateY(0.015);
    earth.obj.rotateY(0.01);
    mars.obj.rotateY(0.008);
    jupiter.obj.rotateY(0.002);
    saturn.obj.rotateY(0.0009);
    uranus.obj.rotateY(0.0004);
    neptune.obj.rotateY(0.0001);
    pluto.obj.rotateY(0.00007);

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});