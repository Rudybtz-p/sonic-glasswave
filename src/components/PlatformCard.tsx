import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { PlatformSelector } from './platform/PlatformSelector';
import { ContentEditor } from './platform/ContentEditor';
import { ActionButtons } from './platform/ActionButtons';

interface PlatformCardProps {
  description: string;
  onGenerateAI: () => void;
  onDescriptionChange?: (description: string) => void;
}

export const PlatformCard: React.FC<PlatformCardProps> = ({
  description,
  onGenerateAI,
  onDescriptionChange
}) => {
  console.log('PlatformCard rendered');
  
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [localDescription, setLocalDescription] = useState(description);
  const [tags, setTags] = useState('');

  useEffect(() => {
    setLocalDescription(description);
  }, [description]);

  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    setLocalDescription(newDescription);
    onDescriptionChange?.(newDescription);
  }, [onDescriptionChange]);

  const handleTagsChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTags(e.target.value);
  }, []);

  const togglePlatform = useCallback((platformId: string) => {
    setSelectedPlatforms(current =>
      current.includes(platformId)
        ? current.filter(id => id !== platformId)
        : [...current, platformId]
    );
  }, []);

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
        <PlatformSelector
          selectedPlatforms={selectedPlatforms}
          onPlatformToggle={togglePlatform}
        />
        
        <ContentEditor
          description={localDescription}
          tags={tags}
          onDescriptionChange={handleDescriptionChange}
          onTagsChange={handleTagsChange}
        />

        <ActionButtons
          onGenerateAI={onGenerateAI}
          disabled={selectedPlatforms.length === 0}
        />
      </CardContent>
    </Card>
  );
};