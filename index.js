import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

var revolutionMultiplier = 1

const texture = new THREE.TextureLoader();
const scene = new THREE.Scene();

// Textures
var sunWrap = texture.load('txtr/sunwrap.jpg');
var mrcryWrap = texture.load('txtr/mrcrywrap.jpg');
var vnusWrap = texture.load('txtr/vnuswrap.jpg');
var erthWrap = texture.load('txtr/erthwrap.jpg');
var mrsWrap = texture.load('txtr/mrswrap.jpg');
var jptrWrap = texture.load('txtr/jptrwrap.jpg');
var strnWrap = texture.load('txtr/strnwrap.jpg');
    var strnRing = texture.load('txtr/strnring.png');
var urnsWrap = texture.load('txtr/urnswrap.jpg');
var nptnWrap = texture.load('txtr/nptnwrap.jpg');
var plutoWrap = texture.load('txtr/plutowrap.jpg');

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 0;
camera.position.y = 90;
camera.lookAt(new THREE.Vector3(0,0,0));

// Groups
const Planets = new THREE.Group();

const MercuryGroup = new THREE.Group();
const VenusGroup = new THREE.Group();
const EarthGroup = new THREE.Group();
const MarsGroup = new THREE.Group();
const JupiterGroup = new THREE.Group();
const SaturnGroup = new THREE.Group();
const UranusGroup = new THREE.Group();
const NeptuneGroup = new THREE.Group();
const PlutoGroup = new THREE.Group();

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const controls = new OrbitControls( camera, renderer.domElement );

// Geometry
const sunMesh = new THREE.SphereGeometry(2, 32, 32);
const mrcryMesh = new THREE.SphereGeometry(0.4, 32, 32);
const vnusMesh = new THREE.SphereGeometry(0.8, 32, 32);
const erthMesh = new THREE.SphereGeometry(1, 32, 32);
const mrsMesh = new THREE.SphereGeometry(0.7, 32, 32);
const jptrMesh = new THREE.SphereGeometry(2.2, 32, 32);
const strnMesh = new THREE.SphereGeometry(2, 32, 32);
    const strnRingMesh = new THREE.RingGeometry(2.1, 3, 30, 1, 0);
const urnsMesh = new THREE.SphereGeometry(0.9, 32, 32);
const nptnMesh = new THREE.SphereGeometry(0.85, 32, 32);
const plutoMesh = new THREE.SphereGeometry(0.3, 32, 32);

// Materials
const sunMat = new THREE.MeshToonMaterial({ map: sunWrap });
const mrcryMat = new THREE.MeshStandardMaterial({ map: mrcryWrap });
const vnusMat = new THREE.MeshStandardMaterial({ map: vnusWrap });
const erthMat = new THREE.MeshStandardMaterial({ map: erthWrap });
const mrsMat = new THREE.MeshStandardMaterial({ map: mrsWrap });
const jptrMat = new THREE.MeshStandardMaterial({ map: jptrWrap });
const strnMat = new THREE.MeshStandardMaterial({ map: strnWrap });
    const strnRingMat = new THREE.MeshStandardMaterial({ map: strnRing, transparent: true, opacity: 0.5});
const urnsMat = new THREE.MeshStandardMaterial({ map: urnsWrap });
const nptnMat = new THREE.MeshStandardMaterial({ map: nptnWrap });
const plutoMat = new THREE.MeshStandardMaterial({ map: plutoWrap });

// Meshes
const sun = new THREE.Mesh(sunMesh, sunMat);
sun.material.flatShading = false;
sun.position.set(0, 0, 0);
scene.add(sun);

const sunlight = new THREE.PointLight(0xffffff, 2);
sunlight.position.set(0, 0, 0);
scene.add(sunlight);
sunlight.shadow.mapSize.width = 512;
sunlight.shadow.mapSize.height = 512;
sunlight.shadow.camera.near = 0.5;
sunlight.shadow.camera.far = 1000;

const debugLight = new THREE.AmbientLight(0xffffff);
debugLight.position.set(0, 0, 0);

// Distance from sun
let mrcrydistance = 5;
let vnusdistance = 10;
let erthdistance = 15;
let mrsdistance = 24;
let jptrdistance = 34;
let strndistance = 45;
let urnsdistance = 55;
let nptndistance = 66;
let plutodistance = 78;

// Objects
const mrcrygrp = [];
for (let i = 0; i<12; i++){
    const mrcry = new THREE.Mesh(mrcryMesh, mrcryMat);
    mrcrygrp.push(mrcry);
}
for(let i = 0; i<12; i++){
    mrcrygrp[i].position.set(mrcrydistance*Math.sin(i*Math.PI/2/3),0,mrcrydistance*Math.cos(i*Math.PI/2/3));
    MercuryGroup.add(mrcrygrp[i]);
}

const vnusgrp = [];
for (let i = 0; i<12; i++){
    const vnus = new THREE.Mesh(vnusMesh, vnusMat);
    vnus.material.flatShading = false;
    vnusgrp.push(vnus);
}
for(let i = 0; i<12; i++){
    vnusgrp[i].position.set(vnusdistance*Math.sin(i*Math.PI/2/3),0,vnusdistance*Math.cos(i*Math.PI/2/3));
    VenusGroup.add(vnusgrp[i]);
}

const erthgrp = [];
for (let i = 0; i<12; i++){
    const erth = new THREE.Mesh(erthMesh, erthMat);
    erth.material.flatShading = false;
    erthgrp.push(erth);
}
for(let i = 0; i<12; i++){
    erthgrp[i].position.set(erthdistance*Math.sin(i*Math.PI/2/3),0,erthdistance*Math.cos(i*Math.PI/2/3));
    EarthGroup.add(erthgrp[i]);
}

const mrsgrp = [];
for (let i = 0; i<12; i++){
    const mrs = new THREE.Mesh(mrsMesh, mrsMat);
    mrs.material.flatShading = false;
    mrsgrp.push(mrs);
}
for(let i = 0; i<12; i++){
    mrsgrp[i].position.set(mrsdistance*Math.sin(i*Math.PI/2/3),0,mrsdistance*Math.cos(i*Math.PI/2/3));
    MarsGroup.add(mrsgrp[i]);
}

const jptrgrp = [];
for (let i = 0; i<12; i++){
    const jptr = new THREE.Mesh(jptrMesh, jptrMat);
    jptr.material.flatShading = false;
    jptrgrp.push(jptr);
}
for(let i = 0; i<12; i++){
    jptrgrp[i].position.set(jptrdistance*Math.sin(i*Math.PI/2/3),0,jptrdistance*Math.cos(i*Math.PI/2/3));
    JupiterGroup.add(jptrgrp[i]);
}

const strngrp = [];
const strnRingGrp = [];
for (let i = 0; i<12; i++){
    const strn = new THREE.Mesh(strnMesh, strnMat);
    strn.material.flatShading = false;
    const strnRing = new THREE.Mesh(strnRingMesh, strnRingMat)
    strnRing.material.flatShading = false;
    strnRing.rotation.set(-90,0,0)
    strngrp.push(strn);
    strnRingGrp.push(strnRing)
}
for(let i = 0; i<12; i++){
    strngrp[i].position.set(strndistance*Math.sin(i*Math.PI/2/3),0,strndistance*Math.cos(i*Math.PI/2/3));
    strnRingGrp[i].position.set(strndistance*Math.sin(i*Math.PI/2/3),0,strndistance*Math.cos(i*Math.PI/2/3));
    SaturnGroup.add(strngrp[i]);
    SaturnGroup.add(strnRingGrp[i]);
}

const urnsgrp = [];
for (let i = 0; i<12; i++){
    const urns = new THREE.Mesh(urnsMesh, urnsMat);
    urns.material.flatShading = false;
    urnsgrp.push(urns);
}
for(let i = 0; i<12; i++){
    urnsgrp[i].position.set(urnsdistance*Math.sin(i*Math.PI/2/3),0,urnsdistance*Math.cos(i*Math.PI/2/3));
    UranusGroup.add(urnsgrp[i]);
}

const nptngrp = [];
for (let i = 0; i<12; i++){
    const nptn = new THREE.Mesh(nptnMesh, nptnMat);
    nptn.material.flatShading = false;
    nptngrp.push(nptn);
}
for(let i = 0; i<12; i++){
    nptngrp[i].position.set(nptndistance*Math.sin(i*Math.PI/2/3),0,nptndistance*Math.cos(i*Math.PI/2/3));
    NeptuneGroup.add(nptngrp[i]);
}

const plutogrp = [];
for (let i = 0; i<12; i++){
    const pluto = new THREE.Mesh(plutoMesh, plutoMat);
    pluto.material.flatShading = false;
    plutogrp.push(pluto);
}
for(let i = 0; i<12; i++){
    plutogrp[i].position.set(plutodistance*Math.sin(i*Math.PI/2/3),0,plutodistance*Math.cos(i*Math.PI/2/3));
    PlutoGroup.add(plutogrp[i]);
}

// Add all planets to their own group
for (let i = 0; i < 12; i++) {
    MercuryGroup.add(mrcrygrp[i])
    VenusGroup.add(vnusgrp[i])
    EarthGroup.add(erthgrp[i])
    MarsGroup.add(mrsgrp[i])
    JupiterGroup.add(jptrgrp[i])
    SaturnGroup.add(strngrp[i])
    UranusGroup.add(urnsgrp[i])
    NeptuneGroup.add(nptngrp[i])
    PlutoGroup.add(plutogrp[i])
}

// Add all planets to a group
Planets.add(MercuryGroup);
Planets.add(VenusGroup);
Planets.add(EarthGroup);
Planets.add(MarsGroup);
Planets.add(JupiterGroup);
Planets.add(SaturnGroup);
Planets.add(UranusGroup);
Planets.add(NeptuneGroup);
Planets.add(PlutoGroup);

scene.add(Planets);

// Revolution
var time = new Date();

const animate = () => {
    requestAnimationFrame(animate);

    MercuryGroup.rotation.y += (0.00107 * revolutionMultiplier); // 107mph
    VenusGroup.rotation.y += (0.00078 * revolutionMultiplier); // 78mph
    EarthGroup.rotation.y += (0.00067 * revolutionMultiplier); // 67mph
    MarsGroup.rotation.y += (0.00053 * revolutionMultiplier); // 53mph
    JupiterGroup.rotation.y += (0.00029 * revolutionMultiplier); // 29mph
    SaturnGroup.rotation.y += (0.00021 * revolutionMultiplier); // 21mph
    UranusGroup.rotation.y += (0.00015 * revolutionMultiplier); // 15mph
    NeptuneGroup.rotation.y += (0.00012 * revolutionMultiplier); // 12mph
    PlutoGroup.rotation.y += (0.00010 * revolutionMultiplier); // 10mph

    time = new Date();
    controls.update();
    renderer.render(scene, camera);
};

animate();

// Window fix
window.addEventListener("resize", () => {
    // Get the new window dimensions
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    // Adjust the Three.js renderer size to fill the new window size
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
});

// Input
var debug = false;
const allMats = [];
scene.traverse(function(obj) {
    if (obj.material) allMats.push(obj.material);
});

const revmult = document.getElementById("revmult");
revmult.value = 1
document.addEventListener('keydown', event => {
    const key = event.key.toLowerCase();

    if (key === 'a') {
        revolutionMultiplier += 1
    } else if (key === 'd') {
        revolutionMultiplier -= 1
    }

    if (key === '`') {
        if (debug == false) {
            debug = true;

            scene.add(debugLight)

            for (let i = 0; i < allMats.length; i++) {
                allMats[i].wireframe = true;
            }
        } else if (debug == true) {
            debug = false

            scene.remove(debugLight)

            for (let i = 0; i < allMats.length; i++) {
                allMats[i].wireframe = false;
            }
        }
    }
    revmult.value = revolutionMultiplier
});

var nonumrevmult = 1
var isNegative = false
revmult.addEventListener('input', function(){
    nonumrevmult = revmult.value
    revolutionMultiplier = nonumrevmult.replace(/[^-]\D/g,'')
});