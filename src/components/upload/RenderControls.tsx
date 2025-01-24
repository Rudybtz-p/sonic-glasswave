import React from 'react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Video, Share2, Wand2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface RenderControlsProps {
  videoId: string | null;
  isRendering: boolean;
  renderProgress: number;
  onRender: () => void;
}

export const RenderControls = ({ 
  videoId, 
  isRendering, 
  renderProgress, 
  onRender 
}: RenderControlsProps) => {
  const handleGenerateDescription = () => {
    toast.success('Generating AI description and tags...');
  };

  const handleGenerateCover = () => {
    toast.success('Generating AI cover image...');
  };

  const handleShare = () => {
    toast.success('Sharing beat video...');
  };

  return (
    <div className="space-y-4">
      {isRendering && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Rendering Progress</span>
            <span>{renderProgress}%</span>
          </div>
          <Progress value={renderProgress} className="h-2" />
        </div>
      )}

      <div className="flex flex-col gap-4">
        <Button 
          onClick={onRender} 
          disabled={isRendering}
          className="w-full"
        >
          <Video className="w-4 h-4 mr-2" />
          {isRendering ? 'Rendering...' : 'Render Video'}
        </Button>

        {renderProgress === 100 && (
          <div className="space-y-4">
            <Button onClick={handleGenerateDescription} variant="outline" className="w-full">
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Description & Tags with AI
            </Button>
            
            <Button onClick={handleGenerateCover} variant="outline" className="w-full">
              <ImageIcon className="w-4 h-4 mr-2" />
              Generate Cover Image with AI
            </Button>

            <Button onClick={handleShare} className="w-full">
              <Share2 className="w-4 h-4 mr-2" />
              Share Beat Video
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};