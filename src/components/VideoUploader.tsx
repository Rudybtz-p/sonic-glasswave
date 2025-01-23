import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { Upload, Video, Youtube, Link as LinkIcon, Settings } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';

interface VideoFile extends File {
  preview: string;
}

export const VideoUploader = () => {
  const [video, setVideo] = useState<VideoFile | null>(null);
  const [embedUrl, setEmbedUrl] = useState('');
  const [isCompressed, setIsCompressed] = useState(false);
  const [quality, setQuality] = useState([720]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("Video file dropped:", acceptedFiles[0]?.name);
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type.startsWith('video/')) {
        setVideo(Object.assign(file, {
          preview: URL.createObjectURL(file)
        }));
        toast.success('Video uploaded successfully!');
      } else {
        toast.error('Please upload a video file');
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mkv', '.avi', '.mov']
    },
    maxFiles: 1
  });

  const handleEmbedVideo = () => {
    console.log("Attempting to embed video from URL:", embedUrl);
    if (!embedUrl) {
      toast.error('Please enter a valid URL');
      return;
    }
    
    if (embedUrl.includes('youtube.com') || embedUrl.includes('vimeo.com')) {
      toast.success('Video embedded successfully!');
    } else {
      toast.error('Please enter a valid YouTube or Vimeo URL');
    }
  };

  const handleProcessVideo = () => {
    if (!video) return;
    
    console.log("Processing video with settings:", {
      isCompressed,
      quality: quality[0]
    });

    toast.success('Video processing started');
    // Simulate processing time
    setTimeout(() => {
      toast.success('Video processed successfully!');
    }, 2000);
  };

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Video</TabsTrigger>
          <TabsTrigger value="embed">Embed Video</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'}`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            {isDragActive ? (
              <p className="text-lg">Drop the video here...</p>
            ) : (
              <div>
                <p className="text-lg mb-2">Drag & drop your video here</p>
                <p className="text-sm text-gray-500">Supports MP4, MKV, AVI, MOV</p>
              </div>
            )}
          </div>

          {video && (
            <div className="mt-6 space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    <Label htmlFor="compress">Compress video</Label>
                  </div>
                  <Switch
                    id="compress"
                    checked={isCompressed}
                    onCheckedChange={setIsCompressed}
                  />
                </div>

                {isCompressed && (
                  <div className="space-y-2">
                    <Label>Quality (pixels)</Label>
                    <Slider
                      value={quality}
                      onValueChange={setQuality}
                      min={360}
                      max={1080}
                      step={360}
                      className="w-full"
                    />
                    <div className="text-sm text-gray-500 text-center">
                      {quality}p
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Preview:</h3>
                <video
                  src={video.preview}
                  controls
                  className="w-full rounded-lg"
                />
              </div>
              
              <div className="flex gap-4">
                <Button 
                  onClick={() => {
                    URL.revokeObjectURL(video.preview);
                    setVideo(null);
                  }} 
                  variant="outline"
                >
                  Remove
                </Button>
                <Button onClick={handleProcessVideo}>
                  <Video className="w-4 h-4 mr-2" />
                  Process Video
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="embed" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="embedUrl">Video URL</Label>
            <div className="flex gap-2">
              <Input
                id="embedUrl"
                placeholder="Enter YouTube or Vimeo URL"
                value={embedUrl}
                onChange={(e) => setEmbedUrl(e.target.value)}
              />
              <Button onClick={handleEmbedVideo}>
                <LinkIcon className="w-4 h-4 mr-2" />
                Embed
              </Button>
            </div>
          </div>
          
          {embedUrl && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Preview:</h3>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <Youtube className="w-12 h-12 text-gray-400" />
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};