import {
  useGLTF,
  Environment,
  Float,
  PresentationControls,
  ContactShadows,
  Html,
  Text,
} from '@react-three/drei'

export default function Experience() {
  const computer = useGLTF(
    'https://threejs-journey.com/resources/models/macbook_model.gltf'
  )

  return (
    <>
      <Environment preset="city" />

      <color args={['#241a1a']} attach="background" />

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={'#ff6900'}
            rotation={[-0.1, Math.PI, 0]}
            position={[1, 0.55, -2.15]}
          />
          <primitive position={[1, -1.2, -1]} object={computer.scene}>
            <Html
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
              distanceFactor={1.17}
              wrapperClass="htmlScreen"
              transform
            >
              <iframe src="https://bruno-simon.com/html/" />
            </Html>
          </primitive>
          <Text
            font="./bangers-v20-latin-regular.woff"
            fontSize={1}
            position={[2, 0.75, 0.75]}
            rotation-y={-1.25}
            children="Bernardo"
            maxWidth={2}
            textAlign="center"
          >
            Bernardo
          </Text>
        </Float>
      </PresentationControls>
      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  )
}
