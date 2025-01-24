import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';

const SAMPLE_BEATS = [
  {
    id: 1,
    artwork: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    producer: 'Producer X',
    trackName: 'Midnight Vibes',
    description: 'Deep bass, atmospheric synths, perfect for modern trap',
    tags: ['Trap', 'Dark', 'Atmospheric'],
  },
  {
    id: 2,
    artwork: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
    producer: 'Beat Master',
    trackName: 'Urban Dreams',
    description: 'Hard-hitting drums with melodic elements',
    tags: ['Hip Hop', 'Melodic', 'Urban'],
  },
];

export const BeatsTable = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
        Available Beats
      </h2>
      <div className="rounded-lg border border-neon-purple/20 backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-neon-purple/5">
              <TableHead>Artwork</TableHead>
              <TableHead>Track Info</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead className="hidden sm:table-cell">Tags</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SAMPLE_BEATS.map((beat) => (
              <TableRow key={beat.id} className="hover:bg-neon-purple/5">
                <TableCell>
                  <img
                    src={beat.artwork}
                    alt={beat.trackName}
                    className="w-16 h-16 object-cover rounded-lg border border-neon-purple/20"
                  />
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium text-neon-purple">{beat.trackName}</div>
                    <div className="text-sm text-muted-foreground">
                      by {beat.producer}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{beat.description}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div className="flex gap-2 flex-wrap">
                    {beat.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary"
                        className="bg-neon-purple/10 text-neon-purple border-neon-purple/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="default" 
                    size="sm"
                    className="bg-neon-purple hover:bg-neon-pink transition-colors duration-300"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};