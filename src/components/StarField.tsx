import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  attribute float size;
  attribute float speed;
  varying float vAlpha;
  
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    vAlpha = 1.0 - (length(position) / 100.0);
  }
`

const fragmentShader = `
  varying float vAlpha;
  
  void main() {
    float distance = length(gl_PointCoord - vec2(0.5));
    float alpha = 1.0 - smoothstep(0.0, 0.5, distance);
    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * vAlpha);
  }
`

export function StarField() {
  const meshRef = useRef<THREE.Points>(null)
  
  const [positions, sizes, speeds] = useMemo(() => {
    const count = 2000
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const speeds = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 200
      positions[i3 + 1] = (Math.random() - 0.5) * 200
      positions[i3 + 2] = (Math.random() - 0.5) * 200
      
      sizes[i] = Math.random() * 2 + 0.5
      speeds[i] = Math.random() * 0.5 + 0.1
    }
    
    return [positions, sizes, speeds]
  }, [])
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
      meshRef.current.rotation.x += 0.0005
    }
  })
  
  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
          args={[sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-speed"
          count={speeds.length}
          array={speeds}
          itemSize={1}
          args={[speeds, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
} 