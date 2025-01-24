import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { Button } from './ui/button';
import { Play, Pause, SkipBack, SkipForward, List, Upload } from 'lucide-react';
import { Card } from './ui/card';

export const AudioVisualizer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create cube with glass effect
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({
      color: 0x8B5CF6,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
      specular: 0xffffff,
      shininess: 100,
      reflectivity: 1,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Add neon edges
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0xD946EF,
      linewidth: 2,
    });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    cube.add(wireframe);

    // Load font and create text
    const fontLoader = new FontLoader();
    console.log('Loading font...');
    fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', 
      // onLoad callback
      (font) => {
        console.log('Font loaded successfully');
        const textGeometry = new TextGeometry('CUBEATZ', {
          font: font,
          size: 0.2,
          height: 0.05,
        });
        const textMaterial = new THREE.MeshPhongMaterial({ 
          color: 0xF97316,
          emissive: 0xF97316,
          emissiveIntensity: 0.5,
        });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(-0.5, 0, 1.1);
        cube.add(textMesh);
      },
      // onProgress callback
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      // onError callback
      (err) => {
        console.error('An error occurred loading the font:', err);
      }
    );

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xD946EF, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Add point lights for neon effect
    const pointLight1 = new THREE.PointLight(0x8B5CF6, 1, 10);
    pointLight1.position.set(2, 2, 2);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xD946EF, 1, 10);
    pointLight2.position.set(-2, -2, -2);
    scene.add(pointLight2);

    // Position camera
    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate cube
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // Pulse neon effect
      const time = Date.now() * 0.001;
      pointLight1.intensity = 1 + Math.sin(time * 2) * 0.5;
      pointLight2.intensity = 1 + Math.cos(time * 2) * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <Card className="p-6 space-y-6 bg-gradient-to-br from-black/80 to-purple-900/50 backdrop-blur-sm border-neon-purple/20">
      <div 
        ref={containerRef} 
        className="w-full h-[400px] rounded-lg"
      />
      
      <div className="flex justify-center items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          className="text-neon-purple hover:text-neon-pink hover:bg-neon-purple/10"
        >
          <SkipBack className="h-6 w-6" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-neon-purple hover:text-neon-pink hover:bg-neon-purple/10"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-neon-purple hover:text-neon-pink hover:bg-neon-purple/10"
        >
          <SkipForward className="h-6 w-6" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-neon-purple hover:text-neon-pink hover:bg-neon-purple/10"
        >
          <List className="h-6 w-6" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-neon-purple hover:text-neon-pink hover:bg-neon-purple/10"
        >
          <Upload className="h-6 w-6" />
        </Button>
      </div>
    </Card>
  );
};