import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

const texture = new THREE.TextureLoader();
const scene = new THREE.Scene();

// Textures to load
var earthWrap = texture.load('txtr/earthwrap.jpg');
var sunWrap = texture.load('txtr/sunwrap.jpg');

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 20;
camera.position.y = 8;
camera.lookAt(new THREE.Vector3(0,0,0));
const group = new THREE.Group();
const group2 = new THREE.Group();
// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls( camera, renderer.domElement );

// Create a cube
const geometry = new THREE.SphereGeometry(1, 32, 32);
const sunmesh = new THREE.SphereGeometry(2, 32, 32);

const sunmat = new THREE.MeshToonMaterial({ map: sunWrap });
const sun = new THREE.Mesh(sunmesh, sunmat);
sun.material.flatShading = false;
sun.position.set(0, 0, 0);
scene.add(sun);

const sunlight = new THREE.PointLight(0xffff00, 2);
sunlight.position.set(0, 0, 0);
scene.add(sunlight);

const erthmat = new THREE.MeshStandardMaterial({ map: earthWrap });
const erths = [];
for (let i = 0; i<12; i++){
    const erth = new THREE.Mesh(geometry, erthmat);
    erth.material.flatShading = false;
    erths.push(erth);
}
let dis = 10;
for(let i = 0; i<12; i++){
    erths[i].position.set(dis*Math.sin(i*Math.PI/2/3),0,dis*Math.cos(i*Math.PI/2/3));
    group.add(erths[i]);
}

const lines = [];

const lineMaterial = new THREE.LineBasicMaterial({color: 0xFFFFFF, linewidth: 100});

for (let i = 0; i < 12; i++) {
    // Calculate the position of the current segment
    const angle = i * Math.PI/2/3;
    const x = dis * Math.cos(angle);
    const y = dis * Math.sin(angle);

    // Create a line segment
    const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -2, 0), // Start point (vertical line segment)
        new THREE.Vector3(0, 2, 0)   // End point (vertical line segment)
    ]);
    const line = new THREE.Line(geometry, lineMaterial);

    // Position the line segment in the circular pattern
    line.position.set(x, 0, y);

    // Apply a slight rotation to the line segment
    line.rotation.z = 0.4;

    // Add the line segment to the scene
    lines.push(line);
    group2.add(line);
}

//group.add(lines);

scene.add(group);
scene.add(group2);

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
    group.rotation.y += 0.005;
    group2.rotation.y += 0.005;

    lines.forEach(lin => {
        lin.rotation.y -= 0.005;
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