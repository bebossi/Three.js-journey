import { OrbitControls, Text3D, Center, useMatcapTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { useRef, useState } from 'react'

export default function Experience() {
  //   const donutsGroup = useRef()
  const donuts = useRef([])

  const matcapTexture = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)

  const [torusGeometry, setTorusGeometry] = useState(<torusGeometry />)
  const [material, setMaterial] = useState()

  useFrame((state, delta) => {
    // for (const donut of donutsGroup.current.children) {
    //   donut.rotation.y += delta * 0.1
    // }
    for (const donut of donuts.current) {
      donut.rotation.y += delta * 0.1
    }
  })

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <torusGeometry ref={setTorusGeometry} />
      <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture[0]} />

      <Center>
        <Text3D
          size={0.75}
          height={0.2}
          curveSegments={23}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          font="./fonts/helvetiker_regular.typeface.json"
        >
          HELLO R3F, ILOVE U
          <meshMatcapMaterial matcap={matcapTexture[0]} />
        </Text3D>
      </Center>

      {/* <group ref={donutsGroup}> */}
      {[...Array(100)].map((value, index) => (
        <mesh
          ref={(donut) => {
            donuts.current[index] = donut
          }}
          key={index}
          geometry={torusGeometry}
          material={material}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ]}
          scale={0.2 + Math.random() * 0.2}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        />
      ))}
      {/* </group> */}
    </>
  )
}
