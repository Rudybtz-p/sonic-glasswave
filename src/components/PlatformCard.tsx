import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Wand2, Youtube, Instagram, Facebook, Share2 } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';

interface PlatformCardProps {
  description: string;
  onGenerateAI: () => void;
}

export const PlatformCard: React.FC<PlatformCardProps> = ({
  description,
  onGenerateAI
}) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const platforms = [
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-youtube' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-instagram' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-facebook' },
    { id: 'tiktok', name: 'TikTok', icon: Share2, color: 'text-tiktok' }
  ];

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(current =>
      current.includes(platformId)
        ? current.filter(id => id !== platformId)
        : [...current, platformId]
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Share your video
          </CardTitle>
          <Badge
            variant="outline"
            className="bg-primary text-primary-foreground"
          >
            {selectedPlatforms.length} Selected
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
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
                  onClick={() => togglePlatform(platform.id)}
                >
                  <Checkbox
                    checked={selectedPlatforms.includes(platform.id)}
                    onCheckedChange={() => togglePlatform(platform.id)}
                  />
                  <Icon className={platform.color} />
                  <span>{platform.name}</span>
                </Label>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <Label>Description</Label>
          <Textarea
            placeholder="Enter your description..."
            value={description}
            className="mb-4 h-32"
          />
        </div>

        <div className="space-y-4">
          <Label>Tags</Label>
          <Textarea
            placeholder="Enter tags (comma separated)..."
            className="mb-4"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={onGenerateAI}
            disabled={selectedPlatforms.length === 0}
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Generate Description & Tags with AI
          </Button>
          <Button
            variant="outline"
            className="w-full"
            disabled={selectedPlatforms.length === 0}
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Generate Cover Image with AI
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};