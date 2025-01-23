import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { Upload, Video } from 'lucide-react';

interface VideoFile extends File {
  preview: string;
}

const VideoUploader = () => {
  const [video, setVideo] = useState<VideoFile | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
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
      'video/*': []
    },
    maxFiles: 1
  });

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
          <p className="text-lg">Drop the video here...</p>
        ) : (
          <div>
            <p className="text-lg mb-2">Drag & drop your video here</p>
            <p className="text-sm text-gray-500">or click to select a file</p>
          </div>
        )}
      </div>

      {video && (
        <div className="mt-6 animate-fade-in">
          <h3 className="font-medium mb-2">Preview:</h3>
          <video
            src={video.preview}
            controls
            className="w-full rounded-lg"
          />
          <div className="mt-4 flex gap-4">
            <Button onClick={() => setVideo(null)} variant="outline">
              Remove
            </Button>
            <Button>
              <Video className="w-4 h-4 mr-2" />
              Process Video
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default VideoUploader;
