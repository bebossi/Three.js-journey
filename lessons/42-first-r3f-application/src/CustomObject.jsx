import { useEffect } from 'react'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const CustomObject = () => {
  const geometryRef = useRef()

  const verticesCount = 10 * 3

  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3)

    for (let i = 0; i < verticesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 3
    }
    return positions
  }, [])

  useEffect(() => {
    geometryRef.current.computeVertexNormals()
  }, [positions])

  return (
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={verticesCount}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <meshStandardMaterial side={THREE.DoubleSide} color="red" />
    </mesh>
  )
}

export default CustomObject
