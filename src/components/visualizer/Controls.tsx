import React from 'react';
import { Button } from '../ui/button';
import { Play, Pause } from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ isPlaying, onPlayPause }) => {
  return (
    <div className="flex justify-center items-center gap-4 p-4">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={onPlayPause}
        className="text-neon-purple hover:text-neon-pink hover:bg-neon-purple/10"
      >
        {isPlaying ? (
          <Pause className="h-6 w-6" />
        ) : (
          <Play className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};