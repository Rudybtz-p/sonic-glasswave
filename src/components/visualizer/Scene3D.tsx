import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createCubeGeometry } from './CubeGeometry';
import { setupLights } from './Lights';
import { Text3D } from './Text3D';
import { ParticleSystem } from './ParticleSystem';

interface Scene3DProps {
  rotationSpeed: number;
  cubeColor: string;
  cubeSize: number;
  displayText?: string;
  audioData: Uint8Array | null;
  particleEnabled: boolean;
  neonEnabled: boolean;
}

export const Scene3D: React.FC<Scene3DProps> = ({
  rotationSpeed,
  cubeColor,
  cubeSize,
  displayText,
  audioData,
  particleEnabled,
  neonEnabled
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);
  const particleSystemRef = useRef<ParticleSystem | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    console.log('Initializing Three.js scene with enhanced features');
    
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const cube = createCubeGeometry();
    cubeRef.current = cube;
    scene.add(cube);

    setupLights(scene);

    if (displayText) {
      console.log('Adding 3D text to scene:', displayText);
      const text3D = new Text3D({
        text: displayText,
        color: cubeColor,
        size: 0.5,
        position: [0, 2, 0]
      });
      scene.add(text3D);
    }

    if (particleEnabled) {
      particleSystemRef.current = new ParticleSystem(scene);
    }

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      
      if (cubeRef.current) {
        cubeRef.current.rotation.x += rotationSpeed * 0.01;
        cubeRef.current.rotation.y += rotationSpeed * 0.01;
      }

      if (particleSystemRef.current && audioData) {
        particleSystemRef.current.update(audioData);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      console.log('Cleaning up Three.js scene');
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      if (particleSystemRef.current) {
        particleSystemRef.current.dispose();
      }
    };
  }, [rotationSpeed, displayText, cubeColor, particleEnabled]);

  useEffect(() => {
    if (cubeRef.current) {
      console.log('Updating cube properties:', { cubeColor, cubeSize });
      
      if (Array.isArray(cubeRef.current.material)) {
        cubeRef.current.material.forEach((material) => {
          if (material instanceof THREE.MeshPhongMaterial) {
            material.color.set(cubeColor);
          }
        });
      }
      
      cubeRef.current.scale.set(cubeSize, cubeSize, cubeSize);
    }
  }, [cubeColor, cubeSize]);

  return <div ref={containerRef} className="w-full h-full min-h-[400px]" />;
};