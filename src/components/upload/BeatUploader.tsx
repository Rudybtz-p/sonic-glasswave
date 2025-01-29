import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface BeatUploaderProps {
  onBeatUploaded: (videoId: string, file: File) => void;
}

export const BeatUploader = ({ onBeatUploaded }: BeatUploaderProps) => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type.startsWith('audio/')) {
        // Upload to Supabase storage
        const fileName = `${crypto.randomUUID()}-${file.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('videos')
          .upload(fileName, file);

        if (uploadError) {
          toast.error('Failed to upload beat');
          return;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('videos')
          .getPublicUrl(fileName);

        // Create video record in database
        const { data: videoData, error: dbError } = await supabase
          .from('videos')
          .insert({
            title: file.name,
            track_name: file.name,
            beat_url: publicUrl,
            render_status: 'pending'
          })
          .select()
          .single();

        if (dbError) {
          toast.error('Failed to create video record');
          return;
        }

        onBeatUploaded(videoData.id, Object.assign(file, {
          preview: URL.createObjectURL(file)
        }));
        toast.success('Beat uploaded successfully!');
      } else {
        toast.error('Please upload an audio file');
      }
    }
  }, [onBeatUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': []
    },
    maxFiles: 1
  });

  return (
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
  );
};