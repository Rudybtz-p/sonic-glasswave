import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Music, Upload } from 'lucide-react';
import { toast } from 'sonner';
import AudioVisualizer from './AudioVisualizer';
import { CubeCustomization } from './visualizer/CubeCustomization';

interface BeatUploaderProps {
  isPremium?: boolean;
}

export const BeatUploader: React.FC<BeatUploaderProps> = ({ isPremium = false }) => {
  const [beatName, setBeatName] = useState('');
  const [beatFile, setBeatFile] = useState<File | null>(null);
  const [showVisualizer, setShowVisualizer] = useState(false);
  const [cubeRotationSpeed, setCubeRotationSpeed] = useState(1);
  const [cubeColor, setCubeColor] = useState('#8B5CF6');
  const [cubeSize, setCubeSize] = useState(1);
  const [particleEnabled, setParticleEnabled] = useState(true);
  const [neonEnabled, setNeonEnabled] = useState(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setBeatFile(file);
        toast.success('Beat uploaded successfully!');
        setShowVisualizer(true);
      } else {
        toast.error('Please upload an audio file');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!beatFile) {
      toast.error('Please upload a beat file');
      return;
    }
    if (!beatName.trim()) {
      toast.error('Please enter a beat name');
      return;
    }
    console.log('Uploading beat:', { 
      name: beatName, 
      file: beatFile,
      cubeSettings: isPremium ? {
        rotationSpeed: cubeRotationSpeed,
        color: cubeColor,
        size: cubeSize,
        particleEnabled,
        neonEnabled
      } : undefined
    });
    toast.success('Beat saved successfully!');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-black/80 backdrop-blur-sm border-neon-purple/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="w-5 h-5 text-neon-purple" />
          Upload Your Beat
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="beatName">Beat Name</Label>
            <Input
              id="beatName"
              value={beatName}
              onChange={(e) => setBeatName(e.target.value)}
              placeholder="Enter your beat name"
              className="bg-black/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="beatFile">Upload Beat</Label>
            <div className="flex items-center gap-4">
              <Input
                id="beatFile"
                type="file"
                onChange={handleFileChange}
                accept="audio/*"
                className="hidden"
              />
              <Label
                htmlFor="beatFile"
                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-neon-purple/30 rounded-lg cursor-pointer hover:border-neon-purple/50 transition-colors"
              >
                <div className="text-center space-y-2">
                  <Upload className="w-8 h-8 mx-auto text-neon-purple/50" />
                  <p className="text-sm text-gray-400">Click to upload your beat</p>
                </div>
              </Label>
            </div>
          </div>

          {showVisualizer && isPremium && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Customize Your Beat Visualizer</h3>
              <AudioVisualizer
                rotationSpeed={cubeRotationSpeed}
                cubeColor={cubeColor}
                cubeSize={cubeSize}
                particleEnabled={particleEnabled}
                neonEnabled={neonEnabled}
              />
              <CubeCustomization
                onRotationSpeedChange={setCubeRotationSpeed}
                onColorChange={setCubeColor}
                onSizeChange={setCubeSize}
                onParticleToggle={setParticleEnabled}
                onNeonToggle={setNeonEnabled}
              />
            </div>
          )}

          {!isPremium && showVisualizer && (
            <div className="p-4 bg-neon-purple/10 rounded-lg">
              <p className="text-sm text-center">
                Upgrade to premium to customize your beat visualizer and unlock multi-platform sharing!
              </p>
            </div>
          )}

          <Button 
            type="submit"
            className="w-full bg-neon-purple hover:bg-neon-pink transition-colors duration-300"
          >
            Save Beat
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};