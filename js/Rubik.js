import * as THREE from './libs/three'

const colors = [0xC41E3A, 0x009E60, 0x0051BA, 0xFF5800, 0xFFD500, 0xFFFFFF]
const faceMaterials = colors.map(c => new THREE.MeshLambertMaterial({ color: c }))
// const cubeMaterials = new THREE.MeshFaceMaterial(faceMaterials)

class Rubik {
  constructor(dimension = 3, background = 0x303030) {
    this.dimension = dimension
    this.background = background
    this.cubeSize = 3
    this.spacing = 0.5
    this.allCubes = []
    this.init()
  }

  init(){
    // init atomic cube
    let positionOffset = (this.dimension - 1) / 2
    const increment = this.cubeSize + this.spacing
    for (let i = 0; i < this.dimension; i++) {
      for (let j = 0; j < this.dimension; j++) {
        for (let k = 0; k < this.dimension; k++) {
          const cube = new Cube((i - positionOffset) * increment,
            (j - positionOffset) * increment,
            (k - positionOffset) * increment,
          )
          this.allCubes.push(cube)
        }
      }
    }
  }
}

class Cube {
  constructor(x, y, z, size = 3) {
    this.defaultConfig = {
      castShadow: true,
    }
    this.x = x
    this.y =y
    this.z = z
    this.size = size
    this.init()
  }
  static cubeConfig = {

  }
  init() {
    const {x, y, z, size, defaultConfig} = this
    
    this.geometry = new THREE.CubeGeometry(size, size, size)
    this.cube = new THREE.Mesh(this.geometry, faceMaterials)
    this.cube.castShadow = true
    // Object.assign(this.cube, defaultConfig)
    console.log('xx', x);
    
    this.cube.position.set(x, y, z)
    this.cube.rubikPosition = new THREE.Vector3(x, y, z)
  }
}

export default Rubik