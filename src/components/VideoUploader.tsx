import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { toast } from 'sonner';
import { Upload, Video, Share2, Wand2, Image as ImageIcon, Instagram } from 'lucide-react';

interface VideoFile extends File {
  preview: string;
}

interface UploadState {
  logo?: File;
  backgroundImage?: File;
  instagramHandle?: string;
}

export const VideoUploader = () => {
  const [video, setVideo] = useState<VideoFile | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>({
    instagramHandle: '',
  });
  const [renderProgress, setRenderProgress] = useState(0);
  const [isRendering, setIsRendering] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type.startsWith('audio/')) {
        setVideo(Object.assign(file, {
          preview: URL.createObjectURL(file)
        }));
        toast.success('Beat uploaded successfully!');
      } else {
        toast.error('Please upload an audio file');
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': []
    },
    maxFiles: 1
  });

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadState(prev => ({ ...prev, logo: file }));
      toast.success('Logo uploaded successfully!');
    }
  };

  const handleBackgroundUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadState(prev => ({ ...prev, backgroundImage: file }));
      toast.success('Background image uploaded successfully!');
    }
  };

  const handleInstagramChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadState(prev => ({ ...prev, instagramHandle: event.target.value }));
  };

  const handleRender = () => {
    setIsRendering(true);
    // Simulate rendering progress
    const interval = setInterval(() => {
      setRenderProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRendering(false);
          toast.success('Rendering complete!');
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

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
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'}`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        {isDragActive ? (
          <p className="text-lg">Drop the beat here...</p>
        ) : (
          <div>
            <p className="text-lg mb-2">Drag & drop your beat here</p>
            <p className="text-sm text-gray-500">or click to select a file</p>
          </div>
        )}
      </div>

      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
              id="logo-upload"
            />
            <label
              htmlFor="logo-upload"
              className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary"
            >
              <ImageIcon className="w-6 h-6 mr-2" />
              Upload Logo
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Background Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleBackgroundUpload}
              className="hidden"
              id="bg-upload"
            />
            <label
              htmlFor="bg-upload"
              className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary"
            >
              <ImageIcon className="w-6 h-6 mr-2" />
              Upload Background
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Instagram Handle</label>
          <div className="flex items-center">
            <Instagram className="w-5 h-5 mr-2 text-instagram" />
            <input
              type="text"
              value={uploadState.instagramHandle}
              onChange={handleInstagramChange}
              placeholder="@username"
              className="flex-1 p-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {video && (
        <div className="mt-6 animate-fade-in space-y-4">
          <h3 className="font-medium mb-2">Preview:</h3>
          <audio
            src={video.preview}
            controls
            className="w-full"
          />
          
          {isRendering && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Rendering Progress</span>
                <span>{renderProgress}%</span>
              </div>
              <Progress value={renderProgress} />
            </div>
          )}

          <div className="flex flex-col gap-4">
            <Button onClick={handleRender} disabled={isRendering}>
              <Video className="w-4 h-4 mr-2" />
              Render Video
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
      )}
    </Card>
  );
};