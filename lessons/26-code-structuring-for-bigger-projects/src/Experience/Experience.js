import Sizes from './utils/sizes'
import Time from './utils/Time'
import Camera from './Camera'
import * as THREE from 'three'
import Renderer from './Rendere'
import World from './World/World'
import Resources from './utils/Resources'
import sources from './sources'
import Debug from './utils/Debug'

let instance = null
export default class Experience {
  constructor(canvas) {
    if (instance) {
      return instance
    }
    instance = this
    // Global access
    window.experience = this
    //Options
    this.canvas = canvas
    // Setup
    this.debug = new Debug()
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.resources = new Resources(sources)
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.world = new World()

    // Sizes resize event
    this.sizes.on('resize', () => {
      this.resize()
    })
    // Time tick event
    this.time.on('tick', () => {
      this.update()
    })
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    this.camera.update()
    this.world.update()
    this.renderer.update()
  }

  destroy() {
    this.sizes.off('resize')
    this.sizes.off('tick')

    //Traverse the whole scene

    this.scene.traverse((child) => {
      if (child.isMesh) {
        child.geometry.dispose()

        for (const key in child.material) {
          const value = child.material[key]

          if (value && typeof value.dispose === 'function') {
            value.dispose()
          }
        }
      }
    })

    this.camera.controls.dispose()
    this.renderer.instance.dispose()

    if (this.debug.active) {
      this.debug.ui.destroy()
    }
  }
}
