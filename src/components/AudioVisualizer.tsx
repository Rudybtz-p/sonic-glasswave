import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { AudioAnalyzer } from './AudioAnalyzer';
import { ParticleSystem } from './ParticleSystem';
import { createCubeGeometry } from './CubeGeometry';
import { setupLights } from './Lights';

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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const audioAnalyzerRef = useRef<AudioAnalyzer | null>(null);
  const particleSystemRef = useRef<ParticleSystem | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const cube = createCubeGeometry();
    scene.add(cube);
    setupLights(scene);

    audioAnalyzerRef.current = new AudioAnalyzer();
    audioAnalyzerRef.current.connectToAudio(new Audio('/audio/sample-beat.mp3'));

    if (particleEnabled) {
      particleSystemRef.current = new ParticleSystem(scene);
    }

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += rotationSpeed * 0.01;
      cube.rotation.y += rotationSpeed * 0.01;

      if (particleSystemRef.current) {
        const audioData = audioAnalyzerRef.current.getAudioData();
        particleSystemRef.current.update(audioData);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      audioAnalyzerRef.current?.dispose();
      particleSystemRef.current?.dispose();
    };
  }, [rotationSpeed, particleEnabled]);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default AudioVisualizer;
