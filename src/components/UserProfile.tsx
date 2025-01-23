import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Link, Music, Globe, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

interface Beat {
  id: number;
  title: string;
  genre: string;
  plays: number;
}

export const UserProfile = () => {
  const userBeats: Beat[] = [
    { id: 1, title: "Midnight Vibes", genre: "Trap", plays: 1200 },
    { id: 2, title: "Summer Dreams", genre: "Pop", plays: 850 },
    { id: 3, title: "Dark Matter", genre: "Hip Hop", plays: 2300 },
  ];

  return (
    <Card className="bg-black/80 backdrop-blur-sm border-neon-purple/20">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" />
              <AvatarFallback>DJ</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white">DJ Producer</h2>
              <p className="text-gray-400">Los Angeles, CA</p>
            </div>
          </div>
          <Button 
            className="bg-neon-purple hover:bg-neon-pink transition-colors duration-300"
          >
            Edit Profile
          </Button>
        </div>
        
        <p className="text-gray-300">
          Professional music producer specializing in trap, hip-hop, and electronic music.
          Creating unique sounds since 2015.
        </p>

        <div className="flex flex-wrap gap-2">
          {["Trap", "Hip Hop", "Electronic", "Producer", "Mixing", "Mastering"].map((tag) => (
            <Badge 
              key={tag}
              variant="secondary"
              className="bg-neon-purple/10 text-neon-purple border-neon-purple/20"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex gap-4">
          <Button variant="outline" className="gap-2 text-neon-blue border-neon-blue/20">
            <Globe className="h-4 w-4" />
            Website
          </Button>
          <Button variant="outline" className="gap-2 text-neon-orange border-neon-orange/20">
            <Link className="h-4 w-4" />
            Social Links
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Music className="h-5 w-5 text-neon-purple" />
          Latest Beats
        </h3>
        <div className="space-y-4">
          {userBeats.map((beat) => (
            <div 
              key={beat.id}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Music className="h-4 w-4 text-neon-purple" />
                <div>
                  <p className="text-white font-medium">{beat.title}</p>
                  <p className="text-sm text-gray-400">{beat.genre}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">{beat.plays} plays</span>
                <Button size="icon" variant="ghost">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};