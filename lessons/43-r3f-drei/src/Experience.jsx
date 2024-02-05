import {
  MeshReflectorMaterial,
  Float,
  Html,
  OrbitControls,
  TransformControls,
  PivotControls,
  Text,
} from '@react-three/drei'
import { useRef } from 'react'

export default function Experience() {
  const cubeRef = useRef()
  const sphereRef = useRef()
  return (
    <>
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />
      <PivotControls
        anchor={[0, 0, 0]}
        depthTest={false}
        lineWidth={4}
        scale={100}
        fixed={true}
      >
        <mesh ref={sphereRef} position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
          <Html
            occlude={[sphereRef, cubeRef]}
            center
            wrapperClass="label"
            position={[1, 1, 0]}
            distanceFactor={6}
          >
            That's a sphere
          </Html>
        </mesh>
      </PivotControls>

      <mesh ref={cubeRef} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <TransformControls object={cubeRef} mode="translate" />

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        {/* <meshStandardMaterial color="greenyellow" /> */}
        <MeshReflectorMaterial mirror={0.9} color="greenyellow" resolution={512} />
      </mesh>
      <Float speed={5} floatIntensity={2}>
        <Text
          textAlign="center"
          position-y={2}
          maxWidth={2}
          fontSize={1}
          color="salmon"
          font="./bangers-v20-latin-regular.woff"
        >
          I LOVE R3F
        </Text>
      </Float>
    </>
  )
}
