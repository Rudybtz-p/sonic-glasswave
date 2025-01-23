import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
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

    // Create cube
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({
      color: 0x8B5CF6,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xD946EF, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Position camera
    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
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
    <Card className="p-6 space-y-6">
      <div 
        ref={containerRef} 
        className="w-full h-[400px] bg-gradient-to-br from-[#1A1F2C] to-[#403E43] rounded-lg"
      />
      
      <div className="flex justify-center items-center gap-4">
        <Button variant="ghost" size="icon">
          <SkipBack className="h-6 w-6" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>
        <Button variant="ghost" size="icon">
          <SkipForward className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <List className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <Upload className="h-6 w-6" />
        </Button>
      </div>
    </Card>
  );
};