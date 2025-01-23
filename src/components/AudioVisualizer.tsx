import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Card } from './ui/card';
import { createCubeGeometry } from './visualizer/CubeGeometry';
import { createCubeText } from './visualizer/CubeText';
import { setupLights } from './visualizer/Lights';
import { Controls } from './visualizer/Controls';

export const AudioVisualizer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    const cube = createCubeGeometry();
    scene.add(cube);

    console.log('Loading font...');
    new THREE.FontLoader().load(
      'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', 
      (font) => {
        console.log('Font loaded successfully');
        const positions = [
          { position: new THREE.Vector3(-0.5, 0, 1.1), rotation: new THREE.Euler(0, 0, 0) },
          { position: new THREE.Vector3(1.1, 0, 0.5), rotation: new THREE.Euler(0, Math.PI / 2, 0) },
          { position: new THREE.Vector3(0, 1.1, 0.5), rotation: new THREE.Euler(-Math.PI / 2, 0, 0) },
          { position: new THREE.Vector3(-0.5, -1.1, 0), rotation: new THREE.Euler(Math.PI / 2, 0, 0) }
        ];

        positions.forEach(({ position, rotation }) => {
          const { textMesh, strokeMesh } = createCubeText(font, position, rotation);
          cube.add(textMesh);
          cube.add(strokeMesh);
        });
      }
    );

    const { pointLight1, pointLight2 } = setupLights(scene);
    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      const time = Date.now() * 0.001;
      pointLight1.intensity = 1 + Math.sin(time * 2) * 0.5;
      pointLight2.intensity = 1 + Math.cos(time * 2) * 0.5;

      renderer.render(scene, camera);
    };

    animate();

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
    <Card className="bg-gradient-to-br from-black/80 to-purple-900/50 backdrop-blur-sm border-neon-purple/20">
      <div ref={containerRef} className="w-full h-[400px] rounded-lg" />
      <Controls isPlaying={isPlaying} onPlayPause={() => setIsPlaying(!isPlaying)} />
    </Card>
  );
};