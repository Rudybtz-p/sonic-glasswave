import React from 'react';
import { Instagram } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface InstagramHandleProps {
  videoId: string | null;
  value: string;
  onChange: (value: string) => void;
}

export const InstagramHandle = ({ videoId, value, onChange }: InstagramHandleProps) => {
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const handle = event.target.value;
    if (videoId) {
      await supabase
        .from('videos')
        .update({ instagram_handle: handle })
        .eq('id', videoId);
    }
    onChange(handle);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Instagram Handle</label>
      <div className="flex items-center">
        <Instagram className="w-5 h-5 mr-2 text-instagram" />
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="@username"
          className="flex-1 p-2 border rounded-lg"
        />
      </div>
    </div>
  );
};