import React, { memo } from 'react';
import { Button } from '../ui/button';
import { Wand2 } from 'lucide-react';

interface ActionButtonsProps {
  onGenerateAI: () => void;
  disabled: boolean;
}

export const ActionButtons = memo(({ onGenerateAI, disabled }: ActionButtonsProps) => {
  console.log('ActionButtons rendered');
  
  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="outline"
        className="w-full"
        onClick={onGenerateAI}
        disabled={disabled}
      >
        <Wand2 className="w-4 h-4 mr-2" />
        Generate Description & Tags with AI
      </Button>
      <Button
        variant="outline"
        className="w-full"
        disabled={disabled}
      >
        <Wand2 className="w-4 h-4 mr-2" />
        Generate Cover Image with AI
      </Button>
    </div>
  );
});

ActionButtons.displayName = 'ActionButtons';