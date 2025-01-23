import React, { memo } from 'react';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Youtube, Instagram, Facebook, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Platform {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
}

interface PlatformSelectorProps {
  selectedPlatforms: string[];
  onPlatformToggle: (platformId: string) => void;
}

const platforms: Platform[] = [
  { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-youtube' },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-instagram' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-facebook' },
  { id: 'tiktok', name: 'TikTok', icon: Share2, color: 'text-tiktok' }
];

export const PlatformSelector = memo(({ selectedPlatforms, onPlatformToggle }: PlatformSelectorProps) => {
  console.log('PlatformSelector rendered');
  
  return (
    <div className="space-y-4">
      <Label>Select Platforms</Label>
      <div className="grid grid-cols-2 gap-4">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <Label
              key={platform.id}
              className={cn(
                'flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-accent',
                selectedPlatforms.includes(platform.id) && 'border-primary bg-accent'
              )}
              onClick={() => onPlatformToggle(platform.id)}
            >
              <Checkbox
                checked={selectedPlatforms.includes(platform.id)}
                onCheckedChange={() => onPlatformToggle(platform.id)}
              />
              <Icon className={platform.color} />
              <span>{platform.name}</span>
            </Label>
          );
        })}
      </div>
    </div>
  );
});

PlatformSelector.displayName = 'PlatformSelector';