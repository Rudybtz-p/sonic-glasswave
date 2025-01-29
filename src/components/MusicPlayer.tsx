import { useState } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Repeat,
  Shuffle,
} from "lucide-react";

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([100]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="/placeholder.svg"
              alt="Track artwork"
              className="w-12 h-12 rounded-lg"
            />
            <div className="text-sm">
              <p className="font-medium">Dark Piano Drill</p>
              <p className="text-muted-foreground">RudyBtz</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Shuffle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button 
              size="icon"
              className="bg-neon-purple hover:bg-neon-pink transition-colors"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <SkipForward className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Repeat className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2 min-w-[150px]">
            <Volume2 className="h-5 w-5" />
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="w-24"
            />
          </div>
        </div>
        
        <Slider
          defaultValue={[0]}
          max={100}
          step={1}
          className="mt-2"
        />
      </div>
    </div>
  );
};