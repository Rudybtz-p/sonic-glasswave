import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Card } from './ui/card';
import { createCubeGeometry } from './visualizer/CubeGeometry';
import { createCubeText } from './visualizer/CubeText';
import { setupLights } from './visualizer/Lights';
import { Controls } from './visualizer/Controls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Circle, MessageCircle, ThumbsUp } from 'lucide-react';

export const AudioVisualizer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [comments, setComments] = useState<string[]>([]);
  const [likes, setLikes] = useState(0);

  // Simulate real-time comments
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setComments(prev => [...prev, `Great beat! ${new Date().getSeconds()}`].slice(-3));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  // Simulate real-time likes
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setLikes(prev => prev + 1);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

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
    new FontLoader().load(
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
    <Card className="bg-gradient-to-br from-black/80 to-purple-900/50 backdrop-blur-sm border-neon-purple/20 relative">
      {/* User Profile */}
      <div className="absolute top-4 left-4 z-10">
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" />
          <AvatarFallback>
            <Circle className="w-10 h-10" />
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Gender/Style Tag */}
      <div className="absolute top-4 right-4 z-10">
        <span className="bg-neon-purple/20 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          @electronic/ambient
        </span>
      </div>

      {/* Comments Section */}
      <div className="absolute bottom-16 left-4 z-10 space-y-2">
        {comments.map((comment, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-white text-sm bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 animate-fade-in"
          >
            <MessageCircle className="w-4 h-4" />
            {comment}
          </div>
        ))}
      </div>

      {/* Likes Section */}
      <div className="absolute bottom-16 right-4 z-10">
        <div className="flex items-center gap-2 text-white text-sm bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
          <ThumbsUp className="w-4 h-4" />
          {likes} likes
        </div>
      </div>

      <div ref={containerRef} className="w-full h-[400px] rounded-lg" />
      <Controls isPlaying={isPlaying} onPlayPause={() => setIsPlaying(!isPlaying)} />
    </Card>
  );
};