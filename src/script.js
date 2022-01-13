import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"
import './style.css'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color("#181A1B")
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)
/**
 * Textures
 */
let decorations = []

const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/7.png')

const fontLoader = new FontLoader()

fontLoader.load(
    "/fonts/helvetiker_regular.typeface.json",
    (font) => {
        const textGeometry = new TextGeometry("Vaibhav\nChopra", {
            font,
            size: 0.5,
            height: 0.2,
            curveSegments: 6,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelOffset: 0,
            bevelSegments: 5,
            bevelSize: 0.02
        })

        const material = new THREE.MeshNormalMaterial(
            // {
            // // wireframe: true
            // matcap: matcapTexture
            // }
        )

        const text = new THREE.Mesh(textGeometry, material)
        textGeometry.center()
        scene.add(text)

        const donutGeometry = new THREE.TorusBufferGeometry(
            0.3, 0.2, 20, 45
        )
        const cubeGeometry = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5)

        for (let i = 0; i < 100; i++) {
            const decoration = new THREE.Mesh(i % 2 === 0 ? donutGeometry : cubeGeometry, material)

            decoration.position.x = (Math.random() - 0.5) * 12
            decoration.position.y = (Math.random() - 0.5) * 12
            decoration.position.z = (Math.random() - 0.5) * 12

            decoration.rotation.x = Math.random() * Math.PI
            decoration.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            decoration.scale.x = scale
            decoration.scale.y = scale
            decoration.scale.z = scale
            decorations.push(decoration)
            scene.add(decoration)
        }
    })


// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
const controls = new OrbitControls(camera, canvas)
camera.position.x = 0
camera.position.y = 2
camera.position.z = 10
scene.add(camera)

controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;

controls.screenSpacePanning = false;

controls.minDistance = 0;
controls.maxDistance = 5;

controls.maxPolarAngle = Math.PI / 2;
// Controls


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const tick = () => {
    // theta += 0.1;

    // Update controls
    controls.update()


    // Render
    renderer.render(scene, camera)
    decorations.map(d => {
        d.rotation.x += 0.005
        d.rotation.y += 0.005
    })
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()