import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Card } from './ui/card';
import { createCubeGeometry } from './visualizer/CubeGeometry';
import { createCubeText } from './visualizer/CubeText';
import { setupLights } from './visualizer/Lights';
import { Controls } from './visualizer/Controls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Circle, MessageCircle, ThumbsUp, UserPlus, MessageSquarePlus, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { CubeUploader } from './visualizer/CubeUploader';
import { ParticleSystem } from './visualizer/ParticleSystem';
import { AudioAnalyzer } from './visualizer/AudioAnalyzer';

export const AudioVisualizer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [comments, setComments] = useState<string[]>([]);
  const [likes, setLikes] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [newComment, setNewComment] = useState("");
  
  const particleSystemRef = useRef<ParticleSystem | null>(null);
  const audioAnalyzerRef = useRef<AudioAnalyzer | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  const handleImageUpload = (face: string, image: File) => {
    console.log(`Handling image upload for ${face} face`);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!cubeRef.current) {
        console.error('Cube reference is not available');
        return;
      }

      const texture = new THREE.TextureLoader().load(e.target?.result as string);
      const materials = cubeRef.current.material as THREE.MeshPhongMaterial[];
      
      if (!Array.isArray(materials)) {
        console.error('Cube materials are not properly initialized');
        return;
      }

      const faceIndex = ['right', 'left', 'top', 'bottom', 'front', 'back'].indexOf(face);
      if (faceIndex !== -1 && materials[faceIndex]) {
        console.log(`Updating texture for ${face} face at index ${faceIndex}`);
        materials[faceIndex].map = texture;
        materials[faceIndex].needsUpdate = true;
      } else {
        console.error(`Invalid face ${face} or material not found at index ${faceIndex}`);
      }
    };
    reader.readAsDataURL(image);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    const cube = createCubeGeometry();
    cubeRef.current = cube; // Assign the cube to our ref
    scene.add(cube);

    // Initialize particle system
    particleSystemRef.current = new ParticleSystem(scene);
    
    // Initialize audio analyzer
    audioAnalyzerRef.current = new AudioAnalyzer();
    if (audioRef.current) {
      audioAnalyzerRef.current.connectToAudio(audioRef.current);
    }

    // Setup mouse controls
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        const deltaMove = {
          x: e.clientX - previousMousePositionRef.current.x,
          y: e.clientY - previousMousePositionRef.current.y
        };

        cube.rotation.y += deltaMove.x * 0.01;
        cube.rotation.x += deltaMove.y * 0.01;
      }
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    containerRef.current.addEventListener('mousedown', handleMouseDown);
    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mouseup', handleMouseUp);

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
      
      if (!isDraggingRef.current) {
        cube.rotation.x += 0.001;
        cube.rotation.y += 0.001;
      }

      if (audioAnalyzerRef.current && particleSystemRef.current) {
        const audioData = audioAnalyzerRef.current.getAudioData();
        particleSystemRef.current.update(audioData);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      particleSystemRef.current?.dispose();
      audioAnalyzerRef.current?.dispose();
      containerRef.current?.removeEventListener('mousedown', handleMouseDown);
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    console.log('Follow status changed:', !isFollowing);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments(prev => [...prev, newComment]);
      setNewComment("");
      console.log('New comment added:', newComment);
    }
  };

  const handleShare = (platform: string) => {
    console.log(`Sharing to ${platform}`);
    // Here you would implement the actual sharing logic for each platform
  };

  return (
    <Card className="bg-gradient-to-br from-black/80 to-purple-900/50 backdrop-blur-sm border-neon-purple/20 relative">
      {/* User Profile */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" />
          <AvatarFallback>
            <Circle className="w-10 h-10" />
          </AvatarFallback>
        </Avatar>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleFollow}
          className={`ml-2 transition-colors duration-300 ${
            isFollowing 
              ? 'bg-neon-purple text-white hover:bg-neon-purple/90' 
              : 'bg-transparent border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10'
          }`}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          {isFollowing ? 'Following' : 'Follow'}
        </Button>
      </div>

      {/* Gender/Style Tag */}
      <div className="absolute top-4 right-4 z-10">
        <CubeUploader onImageUpload={handleImageUpload} />
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

      {/* Action Buttons */}
      <div className="absolute bottom-4 left-4 z-10 flex gap-2">
        {/* Comment Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="icon"
              className="bg-neon-purple/20 border-neon-purple/50 hover:bg-neon-purple/30"
            >
              <MessageSquarePlus className="h-4 w-4 text-white" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black/90 border-neon-purple/20 backdrop-blur-sm text-white">
            <DialogHeader>
              <DialogTitle>Add a Comment</DialogTitle>
              <DialogDescription className="text-gray-400">
                Share your thoughts about this track
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment..."
                className="bg-black/50 border-neon-purple/30 text-white placeholder:text-gray-500"
              />
              <Button 
                onClick={handleAddComment}
                className="w-full bg-neon-purple hover:bg-neon-pink transition-colors duration-300"
              >
                Post Comment
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Share Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="icon"
              className="bg-neon-purple/20 border-neon-purple/50 hover:bg-neon-purple/30"
            >
              <Share2 className="h-4 w-4 text-white" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black/90 border-neon-purple/20 backdrop-blur-sm text-white">
            <DialogHeader>
              <DialogTitle>Share Track</DialogTitle>
              <DialogDescription className="text-gray-400">
                Share this track on your favorite platform
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={() => handleShare('twitter')}
                className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90"
              >
                Twitter
              </Button>
              <Button 
                onClick={() => handleShare('facebook')}
                className="bg-[#4267B2] hover:bg-[#4267B2]/90"
              >
                Facebook
              </Button>
              <Button 
                onClick={() => handleShare('instagram')}
                className="bg-[#E4405F] hover:bg-[#E4405F]/90"
              >
                Instagram
              </Button>
              <Button 
                onClick={() => handleShare('copy')}
                className="bg-gray-700 hover:bg-gray-600"
              >
                Copy Link
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Likes Section */}
      <div className="absolute bottom-16 right-4 z-10">
        <div className="flex items-center gap-2 text-white text-sm bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
          <ThumbsUp className="w-4 h-4" />
          {likes} likes
        </div>
      </div>

      <audio ref={audioRef} src="/path-to-your-audio.mp3" />
      <div ref={containerRef} className="w-full h-[400px] rounded-lg" />
      <Controls isPlaying={isPlaying} onPlayPause={() => setIsPlaying(!isPlaying)} />
    </Card>
  );
};