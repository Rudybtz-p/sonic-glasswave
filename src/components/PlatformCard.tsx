import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Wand2 } from 'lucide-react';

interface PlatformCardProps {
  platform: 'youtube' | 'instagram' | 'facebook' | 'tiktok';
  title: string;
  icon: React.ReactNode;
  description: string;
  onGenerateAI: () => void;
}

export const PlatformCard: React.FC<PlatformCardProps> = ({
  platform,
  title,
  icon,
  description,
  onGenerateAI
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
          <Badge
            variant="outline"
            className={`bg-${platform} text-white`}
          >
            Ready
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder={`Enter your ${title} description...`}
          value={description}
          className="mb-4"
        />
        <Button
          variant="outline"
          className="w-full"
          onClick={onGenerateAI}
        >
          <Wand2 className="w-4 h-4 mr-2" />
          Generate with AI
        </Button>
      </CardContent>
    </Card>
  );
};