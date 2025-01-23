import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { AudioAnalyzer } from './visualizer/AudioAnalyzer';
import { ParticleSystem } from './visualizer/ParticleSystem';
import { createCubeGeometry } from './visualizer/CubeGeometry';
import { setupLights } from './visualizer/Lights';

interface AudioVisualizerProps {
  rotationSpeed: number;
  cubeColor: string;
  cubeSize: number;
  particleEnabled: boolean;
  neonEnabled: boolean;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  rotationSpeed,
  cubeColor,
  cubeSize,
  particleEnabled,
  neonEnabled,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);
  const audioAnalyzerRef = useRef<AudioAnalyzer | null>(null);
  const particleSystemRef = useRef<ParticleSystem | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    console.log('Initializing Three.js scene');
    
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

    audioAnalyzerRef.current = new AudioAnalyzer();
    audioAnalyzerRef.current.connectToAudio(new Audio('/audio/sample-beat.mp3'));

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

      if (particleSystemRef.current && audioAnalyzerRef.current) {
        const audioData = audioAnalyzerRef.current.getAudioData();
        particleSystemRef.current.update(audioData);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      console.log('Cleaning up Three.js scene');
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      audioAnalyzerRef.current?.dispose();
      particleSystemRef.current?.dispose();
    };
  }, [rotationSpeed, particleEnabled]);

  // Update cube properties when they change
  useEffect(() => {
    if (cubeRef.current) {
      console.log('Updating cube properties:', { cubeColor, cubeSize });
      
      // Update cube color
      if (Array.isArray(cubeRef.current.material)) {
        cubeRef.current.material.forEach(material => {
          material.color.set(cubeColor);
        });
      }
      
      // Update cube size
      cubeRef.current.scale.set(cubeSize, cubeSize, cubeSize);
    }
  }, [cubeColor, cubeSize]);

  // Update particle system when enabled/disabled
  useEffect(() => {
    if (!sceneRef.current) return;
    
    if (particleEnabled && !particleSystemRef.current) {
      particleSystemRef.current = new ParticleSystem(sceneRef.current);
    } else if (!particleEnabled && particleSystemRef.current) {
      particleSystemRef.current.dispose();
      particleSystemRef.current = null;
    }
  }, [particleEnabled]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[400px]" />
  );
};

export default AudioVisualizer;