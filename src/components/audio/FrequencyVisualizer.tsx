import React from 'react';

interface FrequencyVisualizerProps {
  audioData: Uint8Array | null;
}

export const FrequencyVisualizer: React.FC<FrequencyVisualizerProps> = ({ audioData }) => {
  if (!audioData) return null;

  return (
    <div className="absolute bottom-4 left-4 right-4 bg-black/50 p-2 rounded-lg">
      <div className="flex gap-1 h-16">
        {Array.from(audioData).map((value, index) => (
          <div
            key={index}
            className="flex-1 bg-neon-purple"
            style={{
              height: `${(value / 255) * 100}%`,
              transition: 'height 0.1s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
};