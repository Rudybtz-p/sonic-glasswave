import React, { useState } from 'react';
import { AudioController } from './AudioController';
import { FrequencyVisualizer } from './FrequencyVisualizer';
import { Scene3D } from '../visualizer/Scene3D';

interface AudioVisualizerProps {
  rotationSpeed: number;
  cubeColor: string;
  cubeSize: number;
  particleEnabled: boolean;
  neonEnabled: boolean;
  displayText?: string;
  audioData: Uint8Array | null;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  rotationSpeed,
  cubeColor,
  cubeSize,
  particleEnabled,
  neonEnabled,
  displayText,
  audioData
}) => {
  return (
    <div className="relative w-full h-full">
      <AudioController onAudioData={() => {}} />
      <Scene3D
        rotationSpeed={rotationSpeed}
        cubeColor={cubeColor}
        cubeSize={cubeSize}
        displayText={displayText}
        audioData={audioData}
        particleEnabled={particleEnabled}
        neonEnabled={neonEnabled}
      />
      <FrequencyVisualizer audioData={audioData} />
    </div>
  );
};

export default AudioVisualizer;