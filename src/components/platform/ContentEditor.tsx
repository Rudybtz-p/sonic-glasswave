import React, { memo } from 'react';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface ContentEditorProps {
  description: string;
  tags: string;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onTagsChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const ContentEditor = memo(({ 
  description, 
  tags, 
  onDescriptionChange, 
  onTagsChange 
}: ContentEditorProps) => {
  console.log('ContentEditor rendered');
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          placeholder="Enter your description..."
          value={description}
          onChange={onDescriptionChange}
          className="mb-4 h-32"
        />
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <Textarea
          placeholder="Enter tags (comma separated)..."
          value={tags}
          onChange={onTagsChange}
          className="mb-4"
        />
      </div>
    </div>
  );
});

ContentEditor.displayName = 'ContentEditor';