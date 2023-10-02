import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

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
var urnsWrap = texture.load('txtr/urnswrap.jpg');
var nptnWrap = texture.load('txtr/nptnwrap.jpg');
var plutoWrap = texture.load('txtr/plutowrap.jpg');

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 0;
camera.position.y = 90;
camera.lookAt(new THREE.Vector3(0,0,0));

// Groups
const group = new THREE.Group();
const group2 = new THREE.Group();

const mrcryGroup = new THREE.Group();
const vnusGroup = new THREE.Group();
const mrsGroup = new THREE.Group();
const jptrGroup = new THREE.Group();
const strnGroup = new THREE.Group();
const urnsGroup = new THREE.Group();
const nptnGroup = new THREE.Group();
const plutoGroup = new THREE.Group();

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls( camera, renderer.domElement );

// Geometry
const sunMesh = new THREE.SphereGeometry(2, 32, 32);
const mrcryMesh = new THREE.SphereGeometry(0.4, 32, 32);
const vnusMesh = new THREE.SphereGeometry(0.8, 32, 32);
const erthMesh = new THREE.SphereGeometry(1, 32, 32);
const mrsMesh = new THREE.SphereGeometry(0.7, 32, 32);
const jptrMesh = new THREE.SphereGeometry(2.2, 32, 32);
const strnMesh = new THREE.SphereGeometry(2, 32, 32);
const urnsMesh = new THREE.SphereGeometry(0.9, 32, 32);
const nptnMesh = new THREE.SphereGeometry(0.85, 32, 32);
const plutoMesh = new THREE.SphereGeometry(0.3, 32, 32);

const lineMesh = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, -2, 0), // Start point (vertical line segment)
    new THREE.Vector3(0, 2, 0)   // End point (vertical line segment)
]);

// Materials
const sunMat = new THREE.MeshToonMaterial({ map: sunWrap });
const mrcryMat = new THREE.MeshStandardMaterial({ map: mrcryWrap });
const vnusMat = new THREE.MeshStandardMaterial({ map: vnusWrap });
const erthMat = new THREE.MeshStandardMaterial({ map: erthWrap });
const mrsMat = new THREE.MeshStandardMaterial({ map: mrsWrap });
const jptrMat = new THREE.MeshStandardMaterial({ map: jptrWrap });
const strnMat = new THREE.MeshStandardMaterial({ map: strnWrap });
const urnsMat = new THREE.MeshStandardMaterial({ map: urnsWrap });
const nptnMat = new THREE.MeshStandardMaterial({ map: nptnWrap });
const plutoMat = new THREE.MeshStandardMaterial({ map: plutoWrap });

const lineMat = new THREE.LineBasicMaterial({color: 0xFFFFFF, linewidth: 100});

// Meshes
const sun = new THREE.Mesh(sunMesh, sunMat);
sun.material.flatShading = false;
sun.position.set(0, 0, 0);
scene.add(sun);

const sunlight = new THREE.PointLight(0xffffff, 2);
sunlight.position.set(0, 0, 0);
scene.add(sunlight);

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

const mrcrygrp = [];
for (let i = 0; i<12; i++){
    const mrcry = new THREE.Mesh(mrcryMesh, mrcryMat);
    mrcry.material.flatShading = false;
    mrcrygrp.push(mrcry);
}
for(let i = 0; i<12; i++){
    mrcrygrp[i].position.set(mrcrydistance*Math.sin(i*Math.PI/2/3),0,mrcrydistance*Math.cos(i*Math.PI/2/3));
    mrcryGroup.add(mrcrygrp[i]);
}

const vnusgrp = [];
for (let i = 0; i<12; i++){
    const vnus = new THREE.Mesh(vnusMesh, vnusMat);
    vnus.material.flatShading = false;
    vnusgrp.push(vnus);
}
for(let i = 0; i<12; i++){
    vnusgrp[i].position.set(vnusdistance*Math.sin(i*Math.PI/2/3),0,vnusdistance*Math.cos(i*Math.PI/2/3));
    vnusGroup.add(vnusgrp[i]);
}

const erthgrp = [];
for (let i = 0; i<12; i++){
    const erth = new THREE.Mesh(erthMesh, erthMat);
    erth.material.flatShading = false;
    erthgrp.push(erth);
}
for(let i = 0; i<12; i++){
    erthgrp[i].position.set(erthdistance*Math.sin(i*Math.PI/2/3),0,erthdistance*Math.cos(i*Math.PI/2/3));
    group.add(erthgrp[i]);
}

const mrsgrp = [];
for (let i = 0; i<12; i++){
    const mrs = new THREE.Mesh(mrsMesh, mrsMat);
    mrs.material.flatShading = false;
    mrsgrp.push(mrs);
}
for(let i = 0; i<12; i++){
    mrsgrp[i].position.set(mrsdistance*Math.sin(i*Math.PI/2/3),0,mrsdistance*Math.cos(i*Math.PI/2/3));
    mrsGroup.add(mrsgrp[i]);
}

const jptrgrp = [];
for (let i = 0; i<12; i++){
    const jptr = new THREE.Mesh(jptrMesh, jptrMat);
    jptr.material.flatShading = false;
    jptrgrp.push(jptr);
}
for(let i = 0; i<12; i++){
    jptrgrp[i].position.set(jptrdistance*Math.sin(i*Math.PI/2/3),0,jptrdistance*Math.cos(i*Math.PI/2/3));
    jptrGroup.add(jptrgrp[i]);
}

const strngrp = [];
for (let i = 0; i<12; i++){
    const strn = new THREE.Mesh(strnMesh, strnMat);
    strn.material.flatShading = false;
    strngrp.push(strn);
}
for(let i = 0; i<12; i++){
    strngrp[i].position.set(strndistance*Math.sin(i*Math.PI/2/3),0,strndistance*Math.cos(i*Math.PI/2/3));
    strnGroup.add(strngrp[i]);
}

const urnsgrp = [];
for (let i = 0; i<12; i++){
    const urns = new THREE.Mesh(urnsMesh, urnsMat);
    urns.material.flatShading = false;
    urnsgrp.push(urns);
}
for(let i = 0; i<12; i++){
    urnsgrp[i].position.set(urnsdistance*Math.sin(i*Math.PI/2/3),0,urnsdistance*Math.cos(i*Math.PI/2/3));
    urnsGroup.add(urnsgrp[i]);
}

const nptngrp = [];
for (let i = 0; i<12; i++){
    const nptn = new THREE.Mesh(nptnMesh, nptnMat);
    nptn.material.flatShading = false;
    nptngrp.push(nptn);
}
for(let i = 0; i<12; i++){
    nptngrp[i].position.set(nptndistance*Math.sin(i*Math.PI/2/3),0,nptndistance*Math.cos(i*Math.PI/2/3));
    urnsGroup.add(nptngrp[i]);
}

const plutogrp = [];
for (let i = 0; i<12; i++){
    const pluto = new THREE.Mesh(plutoMesh, plutoMat);
    pluto.material.flatShading = false;
    plutogrp.push(pluto);
}
for(let i = 0; i<12; i++){
    plutogrp[i].position.set(plutodistance*Math.sin(i*Math.PI/2/3),0,plutodistance*Math.cos(i*Math.PI/2/3));
    plutoGroup.add(plutogrp[i]);
}

const lines = [];
for (let i = 0; i < 12; i++) {
    // Calculate the position of the current segment
    const angle = i * Math.PI/2/3;
    const x = erthdistance * Math.cos(angle);
    const y = erthdistance * Math.sin(angle);

    // Create a line segment
    const line = new THREE.Line(lineMesh, lineMat);

    // Position the line segment in the circular pattern
    line.position.set(x, 0, y);

    // Apply a slight rotation to the line segment
    line.rotation.z = 0.4;

    // Add the line segment to the scene
    lines.push(line);
    group2.add(line);
}

scene.add(group);
scene.add(group2);
scene.add(mrcryGroup);
scene.add(vnusGroup);
scene.add(mrsGroup);
scene.add(jptrGroup);
scene.add(strnGroup);
scene.add(urnsGroup);
scene.add(nptnGroup);
scene.add(plutoGroup);

// Animation loop
var time = new Date();
const center = new THREE.Vector3(0, 0, 0);

// Set initial translation values (to position the sphere initially)
const translateX = 2; // Change this value to set the initial position along the X-axis
const translateY = 0; // Change this value to set the initial position along the Y-axis
const translateZ = 0; // Change this value to set the initial position along the Z-axis

const radius = 2;       // Change this value to set the radius of the orbit
const rotationSpeed = 0.01; // Change this value to control the speed of revolution


const animate = () => {
    requestAnimationFrame(animate);

    // Rotate the cube
    group.rotation.y += 0.00067;
    group2.rotation.y += 0.00067;

    mrcryGroup.rotation.y += 0.00107;
    vnusGroup.rotation.y += 0.00078;
    mrsGroup.rotation.y += 0.00053;
    jptrGroup.rotation.y += 0.00029;
    strnGroup.rotation.y += 0.00021;
    urnsGroup.rotation.y += 0.00015;
    nptnGroup.rotation.y += 0.00012;
    plutoGroup.rotation.y += 0.00010;

    lines.forEach(lin => {
        lin.rotation.y -= 0.00067;
    });


    time = new Date();
    controls.update();
    renderer.render(scene, camera);
};

animate();

window.addEventListener("resize", () => {
    // Get the new window dimensions
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    // Adjust the Three.js renderer size to fill the new window size
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
});

var shift = false;
document.addEventListener('keydown', event => {
    const key = event.key.toLowerCase();

    if (key === 'shift') {
        shift = true;
    }
    
    if (shift == false) {
        if (key === 'w') {
            // Rotate spheres about their X-axes in the positive direction
            lines.forEach( lin => {
                lin.rotation.z += 0.01;
            })
        } else if (key === 's') {
            // Rotate spheres about their X-axes in the positive direction
            lines.forEach( lin => {
                lin.rotation.z -= 0.01;
            })
        }
    }
    else if (shift == true) {
        if (key === 'w') {
            lines.forEach( lin => {
                lin.rotation.z += 1;
            })
        }
        else if (key === 's') {
            lines.forEach( lin => {
                lin.rotation.z -= 1;
            })
        }
    }
});

document.addEventListener('keyup', event => {
    const key = event.key.toLowerCase();

    if (key === 'shift') {
        shift = false;
    }
});