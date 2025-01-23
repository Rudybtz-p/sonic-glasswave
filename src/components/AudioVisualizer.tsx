import React, { useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Controls } from './visualizer/Controls';
import { CubeUploader } from './visualizer/CubeUploader';
import { Scene } from './visualizer/Scene';
import { AudioController } from './visualizer/AudioController';
import { CubeImageUploader } from './visualizer/CubeImageUploader';

export const AudioVisualizer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSceneReady = useCallback((
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    cube: THREE.Mesh
  ) => {
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    cubeRef.current = cube;

    const animate = () => {
      if (!cube || !scene || !camera || !renderer) return;

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
  }, []);

  const handleAudioData = useCallback((audioData: Uint8Array) => {
    // Update particle system with audio data
    if (sceneRef.current) {
      const particles = sceneRef.current.children.find(
        child => child instanceof THREE.Points
      );
      if (particles) {
        const positions = (particles.geometry as THREE.BufferGeometry).attributes.position.array as Float32Array;
        const colors = (particles.geometry as THREE.BufferGeometry).attributes.color.array as Float32Array;
        
        for (let i = 0; i < positions.length; i += 3) {
          const audioIndex = Math.floor(i / 3) % audioData.length;
          const amplitude = audioData[audioIndex] / 255;
          
          positions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.01 * amplitude;
          colors[i] = amplitude;
          colors[i + 1] = 0.5 * amplitude;
          colors[i + 2] = 1.0 - amplitude;
        }
        
        (particles.geometry as THREE.BufferGeometry).attributes.position.needsUpdate = true;
        (particles.geometry as THREE.BufferGeometry).attributes.color.needsUpdate = true;
      }
    }
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden border border-neon-purple/20">
      <div ref={containerRef} className="w-full h-full">
        <Scene
          containerRef={containerRef}
          onSceneReady={handleSceneReady}
        />
      </div>
      <AudioController
        isPlaying={isPlaying}
        onAudioData={handleAudioData}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm">
        <Controls isPlaying={isPlaying} onPlayPause={handlePlayPause} />
      </div>
      <CubeImageUploader
        cube={cubeRef.current}
        onImageUpload={(face, file) => {
          if (cubeRef.current) {
            handleImageUpload(face, file);
          }
        }}
      />
    </div>
  );
};