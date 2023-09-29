import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

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
const material = new THREE.MeshToonMaterial({ color: 0x00ff00 });
const sunmaterial = new THREE.MeshToonMaterial({ color: 0xffff00 });

const geometry = new THREE.SphereGeometry(1, 32, 32);
const sungeometry = new THREE.SphereGeometry(10, 32, 32);

const sun = new THREE.Mesh(sungeometry, sunmaterial);
sun.material.flatShading = false;
sun.position.set( 0, 0, 0 );
// scene.add( sun );

const erths = [];
for (let i = 0; i<12; i++){
    const erth = new THREE.Mesh(geometry, material);
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




const geometry2 = new THREE.PlaneGeometry( 100, 100 );
const material2 = new THREE.MeshBasicMaterial( {color: 0x444444, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry2, material2 );
plane.rotation.x = (Math.PI/2);
plane.position.set(0,-10,0);
scene.add( plane );

//group.add(lines);

scene.add(group);
scene.add(group2);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.01); // Color and intensity (0.5)
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(0,2,0);
//scene.add(directionalLight);

const light = new THREE.PointLight( 0xffFFFF, 3 );
light.position.set( 0, 0, 0 );
scene.add( light );

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

document.addEventListener('keydown', event => {
    const key = event.key.toLowerCase();
    
    if (key === 'w') {
        // Rotate spheres about their X-axes in the positive direction
            lines.forEach( lin => {
                lin.rotation.z += 0.01;
            })
            
    } else if (key === 's') {
        // Rotate spheres about their X-axes in the negative direction
        lines.forEach( lin => {
            lin.rotation.z -= 0.01;
        })
    }
});
