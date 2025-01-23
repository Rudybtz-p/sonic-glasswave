import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { AudioAnalyzer } from './visualizer/AudioAnalyzer';
import { ParticleSystem } from './visualizer/ParticleSystem';
import { createCubeGeometry } from './visualizer/CubeGeometry';
import { setupLights } from './visualizer/Lights';
import { Text3D } from './visualizer/Text3D';

interface AudioVisualizerProps {
  rotationSpeed: number;
  cubeColor: string;
  cubeSize: number;
  particleEnabled: boolean;
  neonEnabled: boolean;
  displayText?: string;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  rotationSpeed,
  cubeColor,
  cubeSize,
  particleEnabled,
  neonEnabled,
  displayText
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);
  const audioAnalyzerRef = useRef<AudioAnalyzer | null>(null);
  const particleSystemRef = useRef<ParticleSystem | null>(null);
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);

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
      scene.add(text3D as unknown as THREE.Object3D);
    }

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
        setAudioData(audioData);
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
      audioAnalyzerRef.current?.dispose();
      particleSystemRef.current?.dispose();
    };
  }, [rotationSpeed, particleEnabled, displayText, cubeColor]);

  useEffect(() => {
    if (cubeRef.current) {
      console.log('Updating cube properties:', { cubeColor, cubeSize });
      
      if (Array.isArray(cubeRef.current.material)) {
        cubeRef.current.material.forEach((material) => {
          if (material instanceof THREE.MeshPhongMaterial) {
            material.color.set(cubeColor);
          }
        });
      } else if (cubeRef.current.material instanceof THREE.MeshPhongMaterial) {
        cubeRef.current.material.color.set(cubeColor);
      }
      
      cubeRef.current.scale.set(cubeSize, cubeSize, cubeSize);
    }
  }, [cubeColor, cubeSize]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[400px]">
      {audioData && (
        <div className="absolute bottom-4 left-4 right-4 bg-black/50 p-2 rounded-lg">
          <div className="flex gap-1 h-16">
            {Array.from(audioData).map((value, index) => (
              <div
                key={index}
                className="flex-1 bg-primary"
                style={{
                  height: `${(value / 255) * 100}%`,
                  transition: 'height 0.1s ease'
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioVisualizer;