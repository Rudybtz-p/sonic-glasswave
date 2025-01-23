import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { setupLights } from './Lights';
import { createCubeGeometry } from './CubeGeometry';
import { ParticleSystem } from './ParticleSystem';
import { loadFont } from './FontLoader';

interface SceneProps {
  containerRef: React.RefObject<HTMLDivElement>;
  onSceneReady: (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, cube: THREE.Mesh) => void;
}

export const Scene: React.FC<SceneProps> = ({ containerRef, onSceneReady }) => {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    console.log('Initializing Three.js scene');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    scene.background = new THREE.Color(0x000000);
    camera.position.z = 5;

    const cube = createCubeGeometry();
    scene.add(cube);

    setupLights(scene);
    new ParticleSystem(scene);

    loadFont(scene);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    
    onSceneReady(scene, camera, renderer, cube);

    return () => {
      console.log('Cleaning up Three.js scene');
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      renderer.dispose();
    };
  }, [containerRef, onSceneReady]);

  return null;
};