import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { AudioAnalyzer } from './visualizer/AudioAnalyzer';
import { ParticleSystem } from './visualizer/ParticleSystem';
import { Scene3D } from './visualizer/Scene3D';
import { FrequencyBars } from './visualizer/FrequencyBars';

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
  const sceneRef = useRef<THREE.Scene | null>(null);
  const audioAnalyzerRef = useRef<AudioAnalyzer | null>(null);
  const particleSystemRef = useRef<ParticleSystem | null>(null);
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);

  const handleSceneReady = (scene: THREE.Scene) => {
    sceneRef.current = scene;
    audioAnalyzerRef.current = new AudioAnalyzer();
    audioAnalyzerRef.current.connectToAudio(new Audio('/audio/sample-beat.mp3'));

    if (particleEnabled) {
      particleSystemRef.current = new ParticleSystem(scene);
    }

    const updateAudioData = () => {
      if (audioAnalyzerRef.current && particleSystemRef.current) {
        const newAudioData = audioAnalyzerRef.current.getAudioData();
        setAudioData(newAudioData);
        particleSystemRef.current.update(newAudioData);
      }
      requestAnimationFrame(updateAudioData);
    };

    updateAudioData();
  };

  return (
    <div className="relative w-full h-full">
      <Scene3D
        rotationSpeed={rotationSpeed}
        cubeColor={cubeColor}
        cubeSize={cubeSize}
        displayText={displayText}
        onSceneReady={handleSceneReady}
        audioData={audioData}
        particleEnabled={particleEnabled}
        neonEnabled={neonEnabled}
      />
      <FrequencyBars audioData={audioData} />
    </div>
  );
};

export default AudioVisualizer;