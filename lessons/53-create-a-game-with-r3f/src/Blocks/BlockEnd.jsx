import { RigidBody } from '@react-three/rapier'
import { boxGeometry, floor1Material } from '../Level'
import { Text, useGLTF } from '@react-three/drei'

export default function BlockEnd({ position = [0, 0, 0] }) {
  const hamburguer = useGLTF('./hamburger.glb')

  hamburguer.scene.children.forEach((mesh) => {
    mesh.castShadow = true
  })

  return (
    <group position={position}>
      <Text position={[0, 2.25, 2]} font="./bebas-neue-v9-latin-regular.woff" scale={1}>
        FINISH
        <meshBasicMaterial toneMapped={false} />
      </Text>
      <mesh
        material={floor1Material}
        geometry={boxGeometry}
        scale={[4, 0.2, 4]}
        receiveShadow
        position={[0, 0, 0]}
      />
      <RigidBody
        type="fixed"
        colliders="hull"
        restitution={0.2}
        friction={0}
        position={[0, 0.25, 0]}
      >
        <primitive object={hamburguer.scene} scale={0.2} />
      </RigidBody>
    </group>
  )
}
