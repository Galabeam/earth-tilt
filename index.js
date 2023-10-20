import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js'

var ts = 1

const texture = new THREE.TextureLoader()
const scene = new THREE.Scene()

// Textures
const txtr = 'txtr/'

var sunWrap = texture.load(txtr + 'sunwrap.jpg')
var mrcryWrap = texture.load(txtr + 'mrcrywrap.jpg')
var vnusWrap = texture.load(txtr + 'vnuswrap.jpg')
var erthWrap = texture.load(txtr + 'erthwrap.jpg')
    var mnWrap = texture.load(txtr + 'mnwrap.jpg')
var mrsWrap = texture.load(txtr + 'mrswrap.jpg')
var jptrWrap = texture.load(txtr + 'jptrwrap.jpg')
var strnWrap = texture.load(txtr + 'strnwrap.jpg')
    var strnRing = texture.load(txtr + 'strnring.png')
var urnsWrap = texture.load(txtr + 'urnswrap.jpg')
var nptnWrap = texture.load(txtr + 'nptnwrap.jpg')
var plutoWrap = texture.load(txtr + 'plutowrap.jpg')

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 0
camera.position.y = 90
camera.lookAt(new THREE.Vector3(0,0,0))

// Groups
const Celestials = new THREE.Group()

const MercuryGroup = new THREE.Group()
const VenusGroup = new THREE.Group()
const EarthGroup = new THREE.Group()
    const MoonGroup = new THREE.Group()
const MarsGroup = new THREE.Group()
const JupiterGroup = new THREE.Group()
const SaturnGroup = new THREE.Group()
const UranusGroup = new THREE.Group()
const NeptuneGroup = new THREE.Group()
const PlutoGroup = new THREE.Group()

// Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls( camera, renderer.domElement )

// Geometry
const sunMesh = new THREE.SphereGeometry(2, 32, 32)
const mrcryMesh = new THREE.SphereGeometry(0.4, 32, 32)
const vnusMesh = new THREE.SphereGeometry(0.8, 32, 32)
const erthMesh = new THREE.SphereGeometry(1, 32, 32)
    const mnMesh = new THREE.SphereGeometry(0.25, 32, 32)
const mrsMesh = new THREE.SphereGeometry(0.7, 32, 32)
const jptrMesh = new THREE.SphereGeometry(2.2, 32, 32)
const strnMesh = new THREE.SphereGeometry(2, 32, 32)
    const strnRingMesh = new THREE.TorusGeometry(2.5, 0.3, 30, 50)
const urnsMesh = new THREE.SphereGeometry(0.9, 32, 32)
const nptnMesh = new THREE.SphereGeometry(0.85, 32, 32)
const plutoMesh = new THREE.SphereGeometry(0.3, 32, 32)

// Materials
const sunMat = new THREE.MeshToonMaterial({ map: sunWrap })
const mrcryMat = new THREE.MeshStandardMaterial({ map: mrcryWrap })
const vnusMat = new THREE.MeshStandardMaterial({ map: vnusWrap })
const erthMat = new THREE.MeshStandardMaterial({ map: erthWrap })
    const mnMat = new THREE.MeshStandardMaterial({ map: mnWrap })
const mrsMat = new THREE.MeshStandardMaterial({ map: mrsWrap })
const jptrMat = new THREE.MeshStandardMaterial({ map: jptrWrap })
const strnMat = new THREE.MeshStandardMaterial({ map: strnWrap })
    const strnRingMat = new THREE.MeshStandardMaterial({ map: strnRing, transparent: true, opacity: 0.5})
const urnsMat = new THREE.MeshStandardMaterial({ map: urnsWrap })
const nptnMat = new THREE.MeshStandardMaterial({ map: nptnWrap })
const plutoMat = new THREE.MeshStandardMaterial({ map: plutoWrap })

// Meshes
const sun = new THREE.Mesh(sunMesh, sunMat)
sun.material.flatShading = false
sun.position.set(0, 0, 0)
scene.add(sun)

const sunlight = new THREE.PointLight(0xffffff, 2)
sunlight.position.set(0, 0, 0)
scene.add(sunlight)
sunlight.shadow.mapSize.width = 512
sunlight.shadow.mapSize.height = 512
sunlight.shadow.camera.near = 0.5
sunlight.shadow.camera.far = 1000

const debugLight = new THREE.AmbientLight(0xffffff)
debugLight.position.set(0, 0, 0)

// Distance from sun
let mrcrydistance = 5
let vnusdistance = 10
let erthdistance = 15
let mrsdistance = 24
let jptrdistance = 34
let strndistance = 45
let urnsdistance = 55
let nptndistance = 66
let plutodistance = 78

// Celestials
const clstials = []

const mrcrygrp = []
const vnusgrp = []
const erthgrp = []
    const mngrp = []
const mrsgrp = []
const jptrgrp = []
const strngrp = []
    const strnRingGrp = []
const urnsgrp = []
const nptngrp = []
const plutogrp = []

for (let i = 0; i < 12; i++) {
    const mrcry = new THREE.Mesh(mrcryMesh, mrcryMat)
    mrcrygrp.push(mrcry)
    clstials.push(mrcry)
    
    const vnus = new THREE.Mesh(vnusMesh, vnusMat)
    vnusgrp.push(vnus)
    clstials.push(vnus)

    const erth = new THREE.Mesh(erthMesh, erthMat)
    erthgrp.push(erth)
    clstials.push(erth)
    for (let o = 0; o < 12; o++) {
        const mn = new THREE.Mesh(mnMesh, mnMat)
        mngrp.push(mn)
        clstials.push(mn)
    }

    const mrs = new THREE.Mesh(mrsMesh, mrsMat)
    mrsgrp.push(mrs)
    clstials.push(mrs)

    const jptr = new THREE.Mesh(jptrMesh, jptrMat)
    jptrgrp.push(jptr)
    clstials.push(jptr)

    const strn = new THREE.Mesh(strnMesh, strnMat)
    const strnRing = new THREE.Mesh(strnRingMesh, strnRingMat)
    strnRing.rotation.set(-90,0,0)
    strngrp.push(strn)
    strnRingGrp.push(strnRing)
    clstials.push(strn)
    clstials.push(strnRing)

    const urns = new THREE.Mesh(urnsMesh, urnsMat)
    urnsgrp.push(urns)
    clstials.push(urns)

    const nptn = new THREE.Mesh(nptnMesh, nptnMat)
    nptngrp.push(nptn)
    clstials.push(nptn)

    const pluto = new THREE.Mesh(plutoMesh, plutoMat)
    plutogrp.push(pluto)
    clstials.push(pluto)

}
const mn = new THREE.Mesh(mnMesh, mnMat)
mngrp.push(mn)
clstials.push(mn)
for (let i = 0; i < clstials.length; i++) {
    clstials[i].material.flatShading = false
}
var cycle = 0
for (let i = 0; i < 12; i++) {
    mrcrygrp[i].position.set(mrcrydistance*Math.sin(i*Math.PI/2/3),0,mrcrydistance*Math.cos(i*Math.PI/2/3))
    MercuryGroup.add(mrcrygrp[i])

    vnusgrp[i].position.set(vnusdistance*Math.sin(i*Math.PI/2/3),0,vnusdistance*Math.cos(i*Math.PI/2/3))
    VenusGroup.add(vnusgrp[i])

    erthgrp[i].position.set(erthdistance*Math.sin(i*Math.PI/2/3),0,erthdistance*Math.cos(i*Math.PI/2/3))
    EarthGroup.add(erthgrp[i])
    
    for (let o = 0; o < 12; o++) {
        mngrp[cycle].position.set(
            (2 * Math.sin(o * Math.PI / 2 / 3)) + erthdistance * Math.sin(i * Math.PI / 2 / 3), 
            0, 
            (2 * Math.cos(o * Math.PI / 2 / 3)) + erthdistance * Math.cos(i * Math.PI / 2 / 3)
        )
        cycle += 1
        MoonGroup.add(mngrp[cycle])
    }

    mrsgrp[i].position.set(mrsdistance*Math.sin(i*Math.PI/2/3),0,mrsdistance*Math.cos(i*Math.PI/2/3))
    MarsGroup.add(mrsgrp[i])

    jptrgrp[i].position.set(jptrdistance*Math.sin(i*Math.PI/2/3),0,jptrdistance*Math.cos(i*Math.PI/2/3))
    JupiterGroup.add(jptrgrp[i])

    strngrp[i].position.set(strndistance*Math.sin(i*Math.PI/2/3),0,strndistance*Math.cos(i*Math.PI/2/3))
    strnRingGrp[i].position.set(strndistance*Math.sin(i*Math.PI/2/3),0,strndistance*Math.cos(i*Math.PI/2/3))
    SaturnGroup.add(strngrp[i])
    SaturnGroup.add(strnRingGrp[i])

    urnsgrp[i].position.set(urnsdistance*Math.sin(i*Math.PI/2/3),0,urnsdistance*Math.cos(i*Math.PI/2/3))
    UranusGroup.add(urnsgrp[i])

    nptngrp[i].position.set(nptndistance*Math.sin(i*Math.PI/2/3),0,nptndistance*Math.cos(i*Math.PI/2/3))
    NeptuneGroup.add(nptngrp[i])

    plutogrp[i].position.set(plutodistance*Math.sin(i*Math.PI/2/3),0,plutodistance*Math.cos(i*Math.PI/2/3))
    PlutoGroup.add(plutogrp[i])
}
mngrp[144].position.set(
    (2 * Math.sin(12 * Math.PI / 2 / 3)) + erthdistance * Math.sin(12 * Math.PI / 2 / 3), 
    0, 
    (2 * Math.cos(12 * Math.PI / 2 / 3)) + erthdistance * Math.cos(12 * Math.PI / 2 / 3)
)

// Add all celestials to a group
Celestials.add(MercuryGroup)
Celestials.add(VenusGroup)
Celestials.add(EarthGroup)
    Celestials.add(MoonGroup)
Celestials.add(MarsGroup)
Celestials.add(JupiterGroup)
Celestials.add(SaturnGroup)
Celestials.add(UranusGroup)
Celestials.add(NeptuneGroup)
Celestials.add(PlutoGroup)

scene.add(Celestials)

const animate = () => {
    requestAnimationFrame(animate);

    // Revolution
    MercuryGroup.rotation.y += (0.00107 * ts) // 107mph
    VenusGroup.rotation.y += (0.00078 * ts) // 78mph
    EarthGroup.rotation.y += (0.00067 * ts) // 67mph
        MoonGroup.rotation.y += (0.00067 * ts) // 67mph
    MarsGroup.rotation.y += (0.00053 * ts) // 53mph
    JupiterGroup.rotation.y += (0.00029 * ts) // 29mph
    SaturnGroup.rotation.y += (0.00021 * ts) // 21mph
    UranusGroup.rotation.y += (0.00015 * ts) // 15mph
    NeptuneGroup.rotation.y += (0.00012 * ts) // 12mph
    PlutoGroup.rotation.y += (0.00010 * ts) // 10mph

    // Rotation
    for (let i = 0; i < 12; i++) {
        mrcrygrp[i].rotation.y += (0.00677 * ts) // 6.77mph
        vnusgrp[i].rotation.y += (0.00405 * ts) // 4.05mph
        erthgrp[i].rotation.y += (0.1037 * ts) // 1037mph
            for (let o = 0; o < 145; o++) {
                mngrp[o].rotation.y += (0.0010 * ts) // 10mph
            }
        mrsgrp[i].rotation.y += (0.054 * ts) // 540mph
        jptrgrp[i].rotation.y += (2.8273 * ts) // 28273mph
        strngrp[i].rotation.y += (2.3 * ts) // 23000mph
            strnRingGrp[i].rotation.z += (2.3 * ts)
        urnsgrp[i].rotation.y += (1.529 * ts) // 15290mph
        nptngrp[i].rotation.y += (0.6 * ts) // 6000mph
        plutogrp[i].rotation.y += (0.003 * ts) // 30mph
    }

    controls.update()
    renderer.render(scene, camera)
}

animate()

// Window fix
window.addEventListener("resize", () => {
    // Get the new window dimensions
    const newWidth = window.innerWidth
    const newHeight = window.innerHeight

    // Adjust the Three.js renderer size to fill the new window size
    camera.aspect = newWidth / newHeight
    camera.updateProjectionMatrix()
    renderer.setSize(newWidth, newHeight)
})

// Input
var debug = false
var debugWireframe = true
const allMats = []
scene.traverse(function(obj) {
    if (obj.material) allMats.push(obj.material)
})

const tsElement = document.getElementById("ts")
tsElement.value = 1
document.addEventListener('keydown', event => {
    const key = event.key.toLowerCase()

    if (key === 'a') {
        ts += 1
    } else if (key === 'd') {
        ts -= 1
    }

    if (key === '`') {
        if (debug == false) {
            debug = true

            scene.add(debugLight)

            if (debugWireframe == true) {
                for (let i = 0; i < allMats.length; i++) {
                    allMats[i].wireframe = true
                }
            }
        } else if (debug == true) {
            debug = false

            scene.remove(debugLight)

            for (let i = 0; i < allMats.length; i++) {
                allMats[i].wireframe = false
            }
        }
    }
    if (key === 't') {
        if (debug == true) {
            if (debugWireframe == false) {
                debugWireframe = true

                for (let i = 0; i < allMats.length; i++) {
                    allMats[i].wireframe = true
                }
            } else if (debugWireframe == true) {
                debugWireframe = false

                for (let i = 0; i < allMats.length; i++) {
                    allMats[i].wireframe = false
                }
            }
        }
    }
    tsElement.value = ts
})

var filteredTsElement = 1
tsElement.addEventListener('input', function(){
    filteredTsElement = tsElement.value
    if (filteredTsElement.replace(/(?!^[+-])[^0-9.]/g,'') == '-') {
        ts = '-1'
    } else {
        ts = filteredTsElement.replace(/(?!^[+-])[^0-9.]/g,'')
    }
})