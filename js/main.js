import * as THREE from 'libs/three'
import Rubik from './Rubik'
import './libs/threex.domevent'
import './libs/threex.domevent.object3d'
import './libs/OrbitControls'
import './libs/three.Projector'

const ctx = canvas.getContext('webgl')

const debug = false
const SCREEN_HEIGHT = window.innerHeight
const SCREEN_WIDTH = window.innerWidth

export default class Main {
  constructor() {
    this.start()
  }
  start() {
    this.scene = new THREE.Scene()
    // renderer
    this.renderer = new THREE.WebGLRenderer({
      context: ctx,
      antialias: true
    })
    this.renderer.setClearColor(0x303030, 1.0)
    this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)
    canvas.appendChild(this.renderer.domElement)

    // camera
    this.camera = new THREE.PerspectiveCamera(45, SCREEN_WIDTH / SCREEN_HEIGHT, 0.1, 1000)
   
    
    this.camera.position.set(-20, 20, 30)
    console.log(this.camera.position);
    this.camera.lookAt(this.scene.position)
    THREE.Object3D._threexDomEvent.camera(this.camera)
    // camera control
    this.orbitControl = new THREE.OrbitControls(this.camera, this.renderer.domElement)

    // light
    this.scene.add(new THREE.AmbientLight(0xffffff))

    if (debug) {
      this.scene.add(new THREE.AxisHelper(20))
    }
    
    const rubik = new Rubik()
    rubik.allCubes.forEach(cube => {
      // console.log(cube);
      
      this.scene.add(cube.cube)
    })
    

    this.loop()
  }
  update() {

  }
  render() {
    // this.cube.rotation.x += 0.01
    // this.cube.rotation.z += 0.01
    this.renderer.render(this.scene, this.camera)
  }
  loop() {
    window.requestAnimationFrame(this.loop.bind(this))
    this.update()
    this.render()


  }
}