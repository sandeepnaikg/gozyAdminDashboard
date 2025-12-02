import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Gradient mesh
    const geometry = new THREE.PlaneGeometry(50, 50, 64, 64)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(0.431, 0.271, 0.631) }, // rgb(110, 69, 161)
        uColor2: { value: new THREE.Color(0.569, 0.412, 0.765) }, // rgb(145, 105, 195)
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          
          float elevation = sin(pos.x * 0.5 + uTime * 0.5) * 0.5;
          elevation += sin(pos.y * 0.3 + uTime * 0.3) * 0.5;
          pos.z += elevation;
          
          vElevation = elevation;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uTime;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          vec3 color = mix(uColor1, uColor2, vUv.y + sin(uTime * 0.2) * 0.1);
          color = mix(color, uColor2 * 1.2, vElevation * 0.5);
          gl_FragColor = vec4(color, 0.4);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.x = -Math.PI / 3
    scene.add(mesh)

    // Particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 1000
    const positions = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 100
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x6e45a1,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    camera.position.z = 15
    camera.position.y = 5

    // Animation
    const clock = new THREE.Clock()
    const animate = () => {
      const elapsedTime = clock.getElapsedTime()
      
      // Update shader time
      material.uniforms.uTime.value = elapsedTime
      
      // Rotate particles
      particles.rotation.y = elapsedTime * 0.05
      particles.rotation.x = elapsedTime * 0.02
      
      // Animate mesh
      mesh.rotation.z = Math.sin(elapsedTime * 0.1) * 0.1
      
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 opacity-30"
      style={{ pointerEvents: 'none' }}
    />
  )
}
