import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeDVisualizerProps {
  cubeStyle: 'neon' | 'wireframe' | 'realistic';
  audioData?: Float32Array;
}

export const ThreeDVisualizer = ({ cubeStyle, audioData }: ThreeDVisualizerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(rendererRef.current.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    sceneRef.current.add(ambientLight);
    sceneRef.current.add(directionalLight);

    // Create cube based on style
    const geometry = new THREE.BoxGeometry();
    let material: THREE.Material;

    switch (cubeStyle) {
      case 'neon':
        material = new THREE.MeshPhongMaterial({
          color: 0x8B5CF6,
          emissive: 0x4C1D95,
          shininess: 100,
          transparent: true,
          opacity: 0.8,
        });
        break;
      case 'wireframe':
        material = new THREE.MeshBasicMaterial({
          color: 0xD946EF,
          wireframe: true,
        });
        break;
      case 'realistic':
        material = new THREE.MeshStandardMaterial({
          color: 0x0EA5E9,
          metalness: 0.9,
          roughness: 0.1,
        });
        break;
    }

    cubeRef.current = new THREE.Mesh(geometry, material);
    sceneRef.current.add(cubeRef.current);
    cameraRef.current.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (cubeRef.current) {
        cubeRef.current.rotation.x += 0.01;
        cubeRef.current.rotation.y += 0.01;

        // Audio reactivity
        if (audioData) {
          const average = audioData.reduce((a, b) => a + Math.abs(b), 0) / audioData.length;
          const scale = 1 + average * 2;
          cubeRef.current.scale.set(scale, scale, scale);
        }
      }
      rendererRef.current?.render(sceneRef.current!, cameraRef.current!);
    };
    animate();

    // Cleanup
    return () => {
      containerRef.current?.removeChild(rendererRef.current!.domElement);
      rendererRef.current?.dispose();
    };
  }, [cubeStyle]);

  return <div ref={containerRef} className="w-full h-[400px] rounded-lg overflow-hidden" />;
};