import React from 'react';
import { Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

interface CubeUploaderProps {
  onImageUpload: (face: string, image: File) => void;
}

export const CubeUploader: React.FC<CubeUploaderProps> = ({ onImageUpload }) => {
  const faces = ['front', 'back', 'top', 'bottom', 'left', 'right'];

  const handleFileChange = (face: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(`Uploading image for ${face} face:`, file.name);
      onImageUpload(face, file);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Face Images
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black/90 border-neon-purple/20 backdrop-blur-sm text-white">
        <DialogHeader>
          <DialogTitle>Upload Cube Face Images</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          {faces.map((face) => (
            <div key={face} className="space-y-2">
              <label className="block text-sm font-medium">{face.charAt(0).toUpperCase() + face.slice(1)} Face</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(face, e)}
                className="hidden"
                id={`file-${face}`}
              />
              <label
                htmlFor={`file-${face}`}
                className="flex items-center justify-center p-4 border-2 border-dashed border-neon-purple/30 rounded-lg cursor-pointer hover:border-neon-purple/50 transition-colors"
              >
                <Upload className="h-6 w-6 text-neon-purple/50" />
              </label>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};