import { useFrame } from '@react-three/fiber'
import {
  OrbitControls,
  useHelper,
  RandomizedLight,
  BakeShadows,
  SoftShadows,
  AccumulativeShadows,
  ContactShadows,
  Sky,
  Environment,
  Lightformer,
  Stage,
} from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { useControls } from 'leva'

export default function Experience() {
  const directionaLightRef = useRef()
  useHelper(directionaLightRef, THREE.DirectionalLightHelper, 1)

  const cube = useRef()

  useFrame((state, delta) => {
    // const time = state.clock.elapsedTime
    // cube.current.position.x = 2 + Math.sin(time)
    cube.current.rotation.y += delta * 0.2
  })

  const { color, opacity, blur } = useControls('contact shadows', {
    color: '#4b2709',
    opacity: { value: 0.4, min: 0, max: 1 },
    blur: { value: 2.8, min: 0, max: 10 },
  })

  const { sunPosition } = useControls('sun position', {
    sunPosition: { value: [1, 2, 3] },
  })

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } = useControls(
    'environment Map',
    {
      envMapIntensity: { value: 3.5, min: 0, max: 12 },
      envMapHeight: { value: 7, min: 0, max: 100 },
      envMapRadius: { value: 20, min: 10, max: 1000 },
      envMapScale: { value: 100, min: 10, max: 1000 },
    }
  )

  return (
    <>
      {/* <Environment
        // background
        preset="sunset"
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
        // resolution={32}
        // files="./environmentMaps/the_sky_is_on_fire_2k.hdr"

        // files={[
        //   './environmentMaps/2/px.jpg',
        //   './environmentMaps/2/nx.jpg',
        //   './environmentMaps/2/py.jpg',
        //   './environmentMaps/2/ny.jpg',
        //   './environmentMaps/2/pz.jpg',
        //   './environmentMaps/2/nz.jpg',
        // ]}
      >
        {/* <color args={['black']} attach="background" />
        <Lightformer position-z={-5} scale={10} color="red" intensity={10} form="ring" /> */}
      {/* <mesh position-z={-5} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color={[10, 0, 0]} />
        </mesh> */}
      {/* </Environment> */}

      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* <ContactShadows
        color={color}
        opacity={opacity}
        blur={blur}
        position={[0, 0, 0]}
        scale={10}
        resolution={512}
        far={5}
        frames={1}
      /> */}
      <Stage
        shadows={{
          type: 'contact',
          opacity: 0.2,
          blur: 3,
        }}
        environment="sunset"
        preset="portrait"
        intensity={6}
      >
        <mesh castShadow position-y={1} position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity} />
        </mesh>
        <mesh position-y={1} castShadow ref={cube} position-x={2} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity} />
        </mesh>
      </Stage>

      {/* <mesh castShadow position-y={1} position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity} />
      </mesh>

      <mesh position-y={1} castShadow ref={cube} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity} />
      </mesh> */}

      {/* <mesh position-y={0} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" envMapIntensity={envMapIntensity} />
      </mesh> */}

      {/* <BakeShadows /> */}
      {/* <SoftShadows size={25} samples={10} focus={0} /> */}
      {/* <directionalLight
        ref={directionaLightRef}
        castShadow
        position={sunPosition}
        intensity={4.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      /> */}
      {/* <ambientLight intensity={1.5} /> */}
      {/* <Sky sunPosition={sunPosition} /> */}

      {/* <AccumulativeShadows
        color="#316d39"
        opacity={0.8}
        scale={10}
        position={[0, -0.99, 0]}
        frames={Infinity}
        temporal
        blend={100}
      > */}
      {/* <directionalLight position={[1, 2, 3]} castShadow /> */}
      {/* <RandomizedLight
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={3}
          position={[1, 2, 3]}
          bias={0.001}
        /> */}
      {/* </AccumulativeShadows> */}
    </>
  )
}
