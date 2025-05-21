
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeAnimationProps {
  isTyping: boolean;
  className?: string;
}

const ThreeAnimation: React.FC<ThreeAnimationProps> = ({ isTyping, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);
  const torusRef = useRef<THREE.Mesh | null>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize Three.js
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x1a1b26);
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.z = 5;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xe91e63, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial({ 
      color: 0xd946ef,
      emissive: 0x451a5c,
      shininess: 50
    });
    const cube = new THREE.Mesh(geometry, material);
    cubeRef.current = cube;
    cube.position.x = -1.5;
    scene.add(cube);
    
    // Add a torus
    const torusGeometry = new THREE.TorusGeometry(0.7, 0.3, 16, 32);
    const torusMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xe91e63,
      emissive: 0x451a3c,
      shininess: 50
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torusRef.current = torus;
    torus.position.x = 1.5;
    scene.add(torus);
    
    // Animation loop
    let frameCount = 0;
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);
      frameCount++;
      
      if (cubeRef.current && torusRef.current) {
        // Base animation
        cubeRef.current.rotation.x += 0.01;
        cubeRef.current.rotation.y += 0.01;
        
        torusRef.current.rotation.x += 0.01;
        torusRef.current.rotation.y += 0.01;
        
        // Add a pulse effect when typing
        if (isTyping) {
          // Make the objects pulse when typing
          const pulseFactor = Math.sin(frameCount * 0.1) * 0.1 + 1.1;
          cubeRef.current.scale.set(pulseFactor, pulseFactor, pulseFactor);
          torusRef.current.scale.set(pulseFactor, pulseFactor, pulseFactor);
        }
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (containerRef.current && cameraRef.current && rendererRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
      }
      
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Effect to handle typing state changes
  useEffect(() => {
    if (!isTyping && cubeRef.current && torusRef.current) {
      // Reset scale when not typing
      cubeRef.current.scale.set(1, 1, 1);
      torusRef.current.scale.set(1, 1, 1);
    }
    
    // Update materials based on typing state
    if (cubeRef.current && torusRef.current) {
      if (cubeRef.current.material instanceof THREE.MeshPhongMaterial) {
        cubeRef.current.material.emissiveIntensity = isTyping ? 1 : 0.5;
        cubeRef.current.material.needsUpdate = true;
      }
      
      if (torusRef.current.material instanceof THREE.MeshPhongMaterial) {
        torusRef.current.material.emissiveIntensity = isTyping ? 1 : 0.5;
        torusRef.current.material.needsUpdate = true;
      }
    }
  }, [isTyping]);

  return <div ref={containerRef} className={className} />;
};

export default ThreeAnimation;
