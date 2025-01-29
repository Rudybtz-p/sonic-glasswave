import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Heart, ShoppingCart } from "lucide-react";

interface BeatDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  beat: {
    artwork: string;
    title: string;
    genre: string;
    bpm: number;
    key: string;
    description: string;
  };
}

export const BeatDetailsModal = ({ isOpen, onClose, beat }: BeatDetailsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-background/95 backdrop-blur-lg border-neon-purple/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
            {beat.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="relative aspect-square overflow-hidden rounded-lg border border-neon-purple/20">
            <img
              src={beat.artwork}
              alt={beat.title}
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-neon-purple/10 text-neon-purple border-neon-purple/20">
                {beat.genre}
              </Badge>
              <Badge variant="secondary" className="bg-neon-purple/10 text-neon-purple border-neon-purple/20">
                {beat.bpm} BPM
              </Badge>
              <Badge variant="secondary" className="bg-neon-purple/10 text-neon-purple border-neon-purple/20">
                Key: {beat.key}
              </Badge>
            </div>
            
            <p className="text-muted-foreground">{beat.description}</p>
            
            <div className="flex items-center justify-between pt-4">
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:text-neon-pink transition-colors"
              >
                <Heart className="h-5 w-5" />
              </Button>
              <div className="space-x-2">
                <Button 
                  variant="default"
                  size="lg"
                  className="bg-neon-purple hover:bg-neon-pink transition-colors duration-300"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button 
                  variant="default"
                  size="lg"
                  className="bg-neon-purple hover:bg-neon-pink transition-colors duration-300"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Buy Beat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};