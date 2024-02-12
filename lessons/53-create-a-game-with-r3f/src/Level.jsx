import React, { useMemo } from 'react'
import * as THREE from 'three'
import BlockStart from './Blocks/BlockStart'
import { BlockSpinner } from './Blocks/BlockSpinner'
import BlockLimbo from './Blocks/BlockLimbo'
import BlockAxe from './Blocks/BlockAxe'
import BlockEnd from './Blocks/BlockEnd'
import Bounds from './Blocks/Bounds'

export const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
export const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' })
export const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow' })
export const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' })
export const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' })

const Level = ({ count = 5, types = [BlockSpinner, BlockAxe, BlockLimbo], seed = 0 }) => {
  const blocks = useMemo(() => {
    const blocks = []

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)]
      blocks.push(type)
    }

    return blocks
  }, [count, types, seed])

  return (
    <>
      <BlockStart position={[0, 0, 0]} />
      {blocks.map((Block, index) => (
        <Block key={index} position={[0, 0, -(index + 1) * 4]} />
      ))}
      <BlockEnd position={[0, 0, -(count + 1) * 4]} />
      <Bounds length={count + 2} />
    </>
  )
}

export default Level
