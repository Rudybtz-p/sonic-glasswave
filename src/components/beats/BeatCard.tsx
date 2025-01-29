import { Play, Heart, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BeatCardProps {
  artwork: string;
  title: string;
  genre: string;
  bpm: number;
  key: string;
  onClick: () => void;
}

export const BeatCard = ({ artwork, title, genre, bpm, key, onClick }: BeatCardProps) => {
  return (
    <div 
      className="group relative overflow-hidden rounded-lg border border-neon-purple/20 bg-background/80 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={artwork}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute bottom-4 left-4 right-4 space-y-4">
            <Button 
              variant="default" 
              size="icon"
              className="bg-neon-purple hover:bg-neon-pink transition-colors duration-300 w-12 h-12 rounded-full"
            >
              <Play className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-neon-purple/10 text-neon-purple border-neon-purple/20">
            {genre}
          </Badge>
          <Badge variant="secondary" className="bg-neon-purple/10 text-neon-purple border-neon-purple/20">
            {bpm} BPM
          </Badge>
          <Badge variant="secondary" className="bg-neon-purple/10 text-neon-purple border-neon-purple/20">
            Key: {key}
          </Badge>
        </div>
        <div className="flex justify-between items-center pt-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:text-neon-pink transition-colors"
          >
            <Heart className="h-5 w-5" />
          </Button>
          <Button 
            variant="default"
            size="sm"
            className="bg-neon-purple hover:bg-neon-pink transition-colors duration-300"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Buy Beat
          </Button>
        </div>
      </div>
    </div>
  );
};