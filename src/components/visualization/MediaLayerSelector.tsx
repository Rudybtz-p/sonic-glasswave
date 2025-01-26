import React from 'react';
import { Button } from '../ui/button';
import { Video, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MediaLayerSelectorProps {
  selectedMode: 'video' | '3d';
  onModeChange: (mode: 'video' | '3d') => void;
}

export const MediaLayerSelector = ({ selectedMode, onModeChange }: MediaLayerSelectorProps) => {
  return (
    <div className="flex gap-4 mb-6">
      <Button
        variant={selectedMode === 'video' ? 'default' : 'outline'}
        className={cn(
          'flex-1 gap-2',
          selectedMode === 'video' && 'bg-gradient-to-r from-neon-purple to-neon-pink'
        )}
        onClick={() => onModeChange('video')}
      >
        <Upload className="w-4 h-4" />
        Video Upload
      </Button>
      <Button
        variant={selectedMode === '3d' ? 'default' : 'outline'}
        className={cn(
          'flex-1 gap-2',
          selectedMode === '3d' && 'bg-gradient-to-r from-neon-blue to-neon-purple'
        )}
        onClick={() => onModeChange('3d')}
      >
        <Video className="w-4 h-4" />
        3D Animation
      </Button>
    </div>
  );
};