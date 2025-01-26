import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { supabase } from '@/integrations/supabase/client';
import { AudioVisualizer } from '@/components/AudioVisualizer';
import { Button } from '@/components/ui/button';
import { Heart, Share2, MessageCircle } from 'lucide-react';

interface Beat {
  id: string;
  title: string;
  beat_url: string;
  description?: string;
  likes?: number;
  comments?: number;
  shares?: number;
}

const BeatsBrowser = () => {
  const [beats, setBeats] = useState<Beat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBeats = async () => {
      try {
        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .eq('render_status', 'completed');

        if (error) throw error;
        setBeats(data || []);
      } catch (error) {
        console.error('Error fetching beats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBeats();
  }, []);

  return (
    <div className="h-screen w-screen bg-black overflow-hidden">
      <Carousel className="h-full" orientation="vertical">
        <CarouselContent className="-mt-1 h-full">
          {beats.map((beat) => (
            <CarouselItem key={beat.id} className="pt-1 h-full">
              <div className="relative h-full w-full bg-gradient-to-b from-neutral-900 to-black">
                <div className="absolute inset-0 flex items-center justify-center">
                  <AudioVisualizer audioUrl={beat.beat_url} />
                </div>
                
                {/* Beat Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white text-xl font-bold">{beat.title}</h3>
                  <p className="text-gray-300 text-sm">{beat.description}</p>
                </div>

                {/* Interaction Buttons */}
                <div className="absolute right-4 bottom-20 flex flex-col gap-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="bg-black/20 hover:bg-black/40 text-white rounded-full h-12 w-12"
                  >
                    <Heart className="h-6 w-6" />
                    <span className="text-sm mt-1">{beat.likes || 0}</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="bg-black/20 hover:bg-black/40 text-white rounded-full h-12 w-12"
                  >
                    <MessageCircle className="h-6 w-6" />
                    <span className="text-sm mt-1">{beat.comments || 0}</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="bg-black/20 hover:bg-black/40 text-white rounded-full h-12 w-12"
                  >
                    <Share2 className="h-6 w-6" />
                    <span className="text-sm mt-1">{beat.shares || 0}</span>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default BeatsBrowser;