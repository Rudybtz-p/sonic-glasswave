import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { Button } from './ui/button';
import { Play, Pause, SkipBack, SkipForward, List, Upload, Share2, Heart } from 'lucide-react';
import { Card } from './ui/card';
import { useMediaQuery } from '@/hooks/use-mobile';

export const AudioVisualizer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (!containerRef.current) return;

    // Three.js setup with responsive sizing
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    const updateSize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    updateSize();
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Audio analyzer setup
    let audioContext: AudioContext;
    let analyzer: AnalyserNode;
    let audioData: Uint8Array;
    
    const setupAudio = () => {
      audioContext = new AudioContext();
      analyzer = audioContext.createAnalyser();
      analyzer.fftSize = 256;
      audioData = new Uint8Array(analyzer.frequencyBinCount);
      
      // Connect audio source here when playing starts
      if (isPlaying) {
        // Example audio source
        const oscillator = audioContext.createOscillator();
        oscillator.connect(analyzer);
        analyzer.connect(audioContext.destination);
        oscillator.start();
      }
    };

    // Create main cube with glass effect
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

    // Add neon edges with enhanced glow
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0xD946EF,
      linewidth: 2,
    });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    cube.add(wireframe);

    // Create frequency dots with audio reactivity
    const dotsGroup = new THREE.Group();
    const dots: THREE.Mesh[] = [];
    for(let i = 0; i < 16; i++) {
      const dotGeometry = new THREE.SphereGeometry(0.05, 16, 16);
      const dotMaterial = new THREE.MeshPhongMaterial({
        color: 0xF97316,
        emissive: 0xF97316,
        emissiveIntensity: 0.5,
      });
      const dot = new THREE.Mesh(dotGeometry, dotMaterial);
      dot.position.set(
        (i % 4) * 0.2 - 0.3,
        1.1,
        Math.floor(i / 4) * 0.2 - 0.3
      );
      dots.push(dot);
      dotsGroup.add(dot);
    }
    cube.add(dotsGroup);

    // Load font and create text
    const fontLoader = new FontLoader();
    fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', 
      (font) => {
        console.log('Font loaded successfully');
        
        // Front face - RudyBtz
        const frontTextGeometry = new TextGeometry('RUDYBTZ', {
          font: font,
          size: 0.2,
          height: 0.05,
        });
        const frontTextMaterial = new THREE.MeshPhongMaterial({ 
          color: 0xF97316,
          emissive: 0xF97316,
          emissiveIntensity: 0.5,
        });
        const frontText = new THREE.Mesh(frontTextGeometry, frontTextMaterial);
        frontText.position.set(-0.6, 0, 1.1);
        cube.add(frontText);

        // Top face - TRAP
        const topTextGeometry = new TextGeometry('TRAP', {
          font: font,
          size: 0.2,
          height: 0.05,
        });
        const topText = new THREE.Mesh(topTextGeometry, frontTextMaterial);
        topText.rotation.x = -Math.PI / 2;
        topText.position.set(-0.3, 1.1, -0.1);
        cube.add(topText);

        // Right face - UK DRILL
        const rightTextGeometry = new TextGeometry('UK DRILL', {
          font: font,
          size: 0.15,
          height: 0.05,
        });
        const rightText = new THREE.Mesh(rightTextGeometry, frontTextMaterial);
        rightText.rotation.y = Math.PI / 2;
        rightText.position.set(1.1, 0, 0.3);
        cube.add(rightText);

        // Left face - FUNKBR
        const leftTextGeometry = new TextGeometry('FUNKBR', {
          font: font,
          size: 0.15,
          height: 0.05,
        });
        const leftText = new THREE.Mesh(leftTextGeometry, frontTextMaterial);
        leftText.rotation.y = -Math.PI / 2;
        leftText.position.set(-1.1, 0, -0.3);
        cube.add(leftText);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (err) => {
        console.error('An error occurred loading the font:', err);
      }
    );

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xD946EF, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x8B5CF6, 1, 10);
    pointLight1.position.set(2, 2, 2);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xD946EF, 1, 10);
    pointLight2.position.set(-2, -2, -2);
    scene.add(pointLight2);

    // Position camera
    camera.position.z = isMobile ? 6 : 5;

    // Touch and mouse controls
    let isDragging = false;
    let previousPosition = { x: 0, y: 0 };

    const startDrag = (x: number, y: number) => {
      isDragging = true;
      previousPosition = { x, y };
    };

    const updateDrag = (x: number, y: number) => {
      if (isDragging) {
        const deltaMove = {
          x: x - previousPosition.x,
          y: y - previousPosition.y
        };

        cube.rotation.y += deltaMove.x * 0.005;
        cube.rotation.x += deltaMove.y * 0.005;
      }
      previousPosition = { x, y };
    };

    const endDrag = () => {
      isDragging = false;
    };

    // Mouse events
    containerRef.current.addEventListener('mousedown', (e) => startDrag(e.clientX, e.clientY));
    containerRef.current.addEventListener('mousemove', (e) => updateDrag(e.clientX, e.clientY));
    containerRef.current.addEventListener('mouseup', endDrag);

    // Touch events
    containerRef.current.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      startDrag(touch.clientX, touch.clientY);
      // Center cube on touch for iOS
      cube.position.set(0, 0, 0);
    });
    
    containerRef.current.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      updateDrag(touch.clientX, touch.clientY);
    });
    
    containerRef.current.addEventListener('touchend', endDrag);

    // Enhanced animation with audio reactivity
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (!isDragging) {
        cube.rotation.x += 0.002;
        cube.rotation.y += 0.002;
      }

      // Audio reactive animations
      if (analyzer && isPlaying) {
        analyzer.getByteFrequencyData(audioData);
        
        // Update dots based on frequency bands
        dots.forEach((dot, i) => {
          const frequencyBand = Math.floor(i * (audioData.length / dots.length));
          const value = audioData[frequencyBand];
          const scale = 1 + (value / 256) * 2;
          dot.scale.set(scale, scale, scale);
          dot.position.y = 1.1 + (value / 256) * 0.5;
        });

        // Pulse cube based on bass
        const bassValue = audioData[0] / 256;
        cube.scale.set(1 + bassValue * 0.2, 1 + bassValue * 0.2, 1 + bassValue * 0.2);
      }

      // Neon pulse effect
      const time = Date.now() * 0.001;
      pointLight1.intensity = 1 + Math.sin(time * 2) * 0.5;
      pointLight2.intensity = 1 + Math.cos(time * 2) * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    window.addEventListener('resize', updateSize);

    // Setup audio when playing starts
    if (isPlaying) {
      setupAudio();
    }

    return () => {
      window.removeEventListener('resize', updateSize);
      containerRef.current?.removeChild(renderer.domElement);
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [isPlaying, isMobile]);

  return (
    <Card className="p-4 md:p-6 space-y-4 md:space-y-6 bg-gradient-to-br from-black/80 to-purple-900/50 backdrop-blur-sm border-neon-purple/20">
      <div 
        ref={containerRef} 
        className="w-full h-[300px] md:h-[400px] rounded-lg cursor-grab active:cursor-grabbing touch-none"
      />
      
      <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          className="text-neon-purple hover:text-neon-pink hover:bg-neon-purple/10"
        >
          <SkipBack className="h-4 w-4 md:h-6 md:w-6" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-neon-purple hover:text-neon-pink hover:bg-neon-purple/10"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 md:h-6 md:w-6" />
          ) : (
            <Play className="h-4 w-4 md:h-6 md:w-6" />
          )}
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-neon-purple hover:text-neon-pink hover:bg-neon-purple/10"
        >
          <SkipForward className="h-4 w-4 md:h-6 md:w-6" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-neon-purple hover:text-neon-pink hover:bg-neon-purple/10"
        >
          <List className="h-4 w-4 md:h-6 md:w-6" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-neon-purple hover:text-neon-pink hover:bg-neon-purple/10"
        >
          <Upload className="h-4 w-4 md:h-6 md:w-6" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setLiked(!liked)}
          className={`hover:bg-neon-purple/10 ${liked ? 'text-red-500' : 'text-neon-purple hover:text-neon-pink'}`}
        >
          <Heart className="h-4 w-4 md:h-6 md:w-6" fill={liked ? "currentColor" : "none"} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-neon-purple hover:text-neon-pink hover:bg-neon-purple/10"
        >
          <Share2 className="h-4 w-4 md:h-6 md:w-6" />
        </Button>
      </div>
    </Card>
  );
};