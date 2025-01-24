import React from 'react';
import { ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface AssetUploaderProps {
  type: 'logo' | 'background';
  videoId: string | null;
  onAssetUploaded: (file: File) => void;
}

export const AssetUploader = ({ type, videoId, onAssetUploaded }: AssetUploaderProps) => {
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && videoId) {
      const fileName = `${crypto.randomUUID()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('assets')
        .upload(fileName, file);

      if (error) {
        toast.error(`Failed to upload ${type}`);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('assets')
        .getPublicUrl(fileName);

      const updateData = type === 'logo' 
        ? { logo_url: publicUrl }
        : { background_image_url: publicUrl };

      await supabase
        .from('videos')
        .update(updateData)
        .eq('id', videoId);

      onAssetUploaded(file);
      toast.success(`${type} uploaded successfully!`);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {type === 'logo' ? 'Logo' : 'Background Image'}
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
        id={`${type}-upload`}
      />
      <label
        htmlFor={`${type}-upload`}
        className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary"
      >
        <ImageIcon className="w-6 h-6 mr-2" />
        Upload {type === 'logo' ? 'Logo' : 'Background'}
      </label>
    </div>
  );
};