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
      <h2 className="text-2xl font-bold">Available Beats</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Artwork</TableHead>
            <TableHead>Track Info</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {SAMPLE_BEATS.map((beat) => (
            <TableRow key={beat.id}>
              <TableCell>
                <img
                  src={beat.artwork}
                  alt={beat.trackName}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium">{beat.trackName}</div>
                  <div className="text-sm text-muted-foreground">
                    by {beat.producer}
                  </div>
                </div>
              </TableCell>
              <TableCell>{beat.description}</TableCell>
              <TableCell>
                <div className="flex gap-2 flex-wrap">
                  {beat.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Button variant="default" size="sm">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};