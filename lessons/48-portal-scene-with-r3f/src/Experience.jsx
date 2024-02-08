import {
  OrbitControls,
  useGLTF,
  useTexture,
  Center,
  Sparkles,
  shaderMaterial,
} from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import portalVerteShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'
import * as THREE from 'three'
import { useRef } from 'react'

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color('#ffffff'),
    uColorEnd: new THREE.Color('#000000'),
  },
  portalVerteShader,
  portalFragmentShader
)
extend({
  PortalMaterial,
})

export default function Experience() {
  const { nodes } = useGLTF('./model/portal.glb')

  const bakedTexture = useTexture('./model/baked.jpg')
  bakedTexture.flipY = false

  const portalMaterial = useRef()

  useFrame((state, delta) => {
    portalMaterial.current.uTime += delta
  })

  return (
    <>
      <color args={['#030202']} attach="background" />

      <OrbitControls makeDefault />
      <Center>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh position={nodes.poleLightA.position} geometry={nodes.poleLightA.geometry}>
          <meshBasicMaterial color="#ffffe5" />
        </mesh>
        <mesh position={nodes.poleLightB.position} geometry={nodes.poleLightB.geometry}>
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        <mesh
          position={nodes.portalLight.position}
          geometry={nodes.portalLight.geometry}
          rotation={nodes.portalLight.rotation}
        >
          <portalMaterial ref={portalMaterial} />
        </mesh>

        <Sparkles size={6} scale={[4, 2, 4]} position-y={1} speed={0.2} />
      </Center>
    </>
  )
}
