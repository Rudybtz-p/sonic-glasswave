import React, { useState } from 'react';
import { Card } from './ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { BeatUploader } from './upload/BeatUploader';
import { AssetUploader } from './upload/AssetUploader';
import { InstagramHandle } from './upload/InstagramHandle';
import { RenderControls } from './upload/RenderControls';

interface VideoFile extends File {
  preview: string;
}

interface UploadState {
  logo?: File;
  backgroundImage?: File;
  instagramHandle: string;
}

export const VideoUploader = () => {
  const [video, setVideo] = useState<VideoFile | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>({
    instagramHandle: '',
  });
  const [renderProgress, setRenderProgress] = useState(0);
  const [isRendering, setIsRendering] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);

  const handleBeatUploaded = (newVideoId: string, file: VideoFile) => {
    setVideoId(newVideoId);
    setVideo(file);
  };

  const handleRender = async () => {
    if (!videoId) {
      toast.error('Please upload a beat first');
      return;
    }

    setIsRendering(true);
    try {
      const response = await fetch('/functions/render-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoId })
      });

      if (!response.ok) {
        throw new Error('Failed to render video');
      }

      // Subscribe to realtime updates for render progress
      const subscription = supabase
        .channel('render-progress')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'videos',
            filter: `id=eq.${videoId}`
          },
          (payload) => {
            const status = payload.new.render_status;
            if (status.startsWith('rendering:')) {
              const progress = parseInt(status.split(':')[1]);
              setRenderProgress(progress);
            } else if (status === 'completed') {
              setIsRendering(false);
              setRenderProgress(100);
              toast.success('Rendering complete!');
              subscription.unsubscribe();
            }
          }
        )
        .subscribe();

    } catch (error) {
      toast.error('Failed to render video');
      setIsRendering(false);
    }
  };

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <BeatUploader onBeatUploaded={handleBeatUploaded} />

      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <AssetUploader
            type="logo"
            videoId={videoId}
            onAssetUploaded={(file) => setUploadState(prev => ({ ...prev, logo: file }))}
          />
          <AssetUploader
            type="background"
            videoId={videoId}
            onAssetUploaded={(file) => setUploadState(prev => ({ ...prev, backgroundImage: file }))}
          />
        </div>

        <InstagramHandle
          videoId={videoId}
          value={uploadState.instagramHandle}
          onChange={(handle) => setUploadState(prev => ({ ...prev, instagramHandle: handle }))}
        />

        {video && (
          <div className="mt-6 animate-fade-in space-y-4">
            <h3 className="font-medium mb-2">Preview:</h3>
            <audio
              src={video.preview}
              controls
              className="w-full"
            />
            
            <RenderControls
              videoId={videoId}
              isRendering={isRendering}
              renderProgress={renderProgress}
              onRender={handleRender}
            />
          </div>
        )}
      </div>
    </Card>
  );
};