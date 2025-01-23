import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Controls } from './visualizer/Controls';
import { CubeUploader } from './visualizer/CubeUploader';
import { createCubeGeometry } from './visualizer/CubeGeometry';
import { setupLights } from './visualizer/Lights';
import { ParticleSystem } from './visualizer/ParticleSystem';
import { AudioAnalyzer } from './visualizer/AudioAnalyzer';
import { createCubeText } from './visualizer/CubeText';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

export const AudioVisualizer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);
  const particleSystemRef = useRef<ParticleSystem | null>(null);
  const audioAnalyzerRef = useRef<AudioAnalyzer | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    console.log('Initializing Three.js scene');

    // Initialize scene
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

    // Setup scene
    scene.background = new THREE.Color(0x000000);
    camera.position.z = 5;

    // Create cube
    const cube = createCubeGeometry();
    scene.add(cube);

    // Setup lights
    setupLights(scene);

    // Create particle system
    const particleSystem = new ParticleSystem(scene);

    // Load font and create text
    const fontLoader = new FontLoader();
    const fontPath = '/fonts/helvetiker_regular.typeface.json';
    console.log('Loading font from:', fontPath);
    
    fontLoader.load(
      fontPath,
      (font) => {
        console.log('Font loaded successfully');
        try {
          const { textMesh, strokeMesh } = createCubeText(
            font,
            new THREE.Vector3(0, 2, 0),
            new THREE.Euler(0, 0, 0)
          );
          scene.add(textMesh);
          scene.add(strokeMesh);
        } catch (error) {
          console.error('Error creating text meshes:', error);
        }
      },
      (progress) => {
        console.log('Font loading progress:', (progress.loaded / progress.total * 100) + '%');
      },
      (error) => {
        console.error('Error loading font:', error);
        console.error('Font path attempted:', fontPath);
      }
    );

    // Store refs
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    cubeRef.current = cube;
    particleSystemRef.current = particleSystem;

    // Initialize audio
    const audio = new Audio();
    audio.src = '/audio/sample-beat.mp3';
    audio.loop = true;
    audioRef.current = audio;

    const audioAnalyzer = new AudioAnalyzer();
    audioAnalyzerRef.current = audioAnalyzer;

    // Animation loop
    const animate = () => {
      if (!cube || !scene || !camera || !renderer) return;

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      if (particleSystem && audioAnalyzer) {
        const audioData = audioAnalyzer.getAudioData();
        particleSystem.update(audioData);
      }

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      console.log('Cleaning up Three.js scene');
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioAnalyzerRef.current) {
        audioAnalyzerRef.current.dispose();
      }
      if (particleSystemRef.current) {
        particleSystemRef.current.dispose();
      }
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current && audioAnalyzerRef.current) {
      console.log('Connecting audio element to analyzer');
      audioAnalyzerRef.current.connectToAudio(audioRef.current);
    }
  }, []);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleImageUpload = (face: string, file: File) => {
    if (!cubeRef.current) {
      console.error('Cube not initialized');
      return;
    }

    const faceIndex = ['right', 'left', 'top', 'bottom', 'front', 'back'].indexOf(face);
    if (faceIndex === -1) {
      console.error('Invalid face:', face);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result || !cubeRef.current) return;

      const texture = new THREE.TextureLoader().load(event.target.result as string);
      const materials = Array.isArray(cubeRef.current.material) 
        ? cubeRef.current.material 
        : [cubeRef.current.material];

      if (materials[faceIndex] && materials[faceIndex] instanceof THREE.MeshPhongMaterial) {
        materials[faceIndex].map = texture;
        console.log(`Updated texture for ${face} face at index ${faceIndex}`);
      } else {
        console.error('Invalid material at index:', faceIndex);
      }
    };

    console.log(`Handling image upload for ${face} face`);
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden border border-neon-purple/20">
      <div ref={containerRef} className="w-full h-full" />
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm">
        <Controls isPlaying={isPlaying} onPlayPause={handlePlayPause} />
      </div>
      <div className="absolute top-4 right-4">
        <CubeUploader onImageUpload={handleImageUpload} />
      </div>
    </div>
  );
};