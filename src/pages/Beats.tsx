import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { BeatsTable } from '@/components/BeatsTable';
import { BeatCard } from '@/components/beats/BeatCard';
import { BeatDetailsModal } from '@/components/beats/BeatDetailsModal';

const SAMPLE_BEATS = [
  {
    id: 1,
    artwork: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    title: 'Midnight Vibes',
    genre: 'UK Drill',
    bpm: 140,
    key: 'Am',
    description: 'Deep bass, atmospheric synths, perfect for modern trap',
  },
  {
    id: 2,
    artwork: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
    title: 'Urban Dreams',
    genre: 'Trap',
    bpm: 145,
    key: 'Fm',
    description: 'Hard-hitting drums with melodic elements',
  },
  {
    id: 3,
    artwork: 'https://images.unsplash.com/photo-1466428996289-fb355538da1b',
    title: 'Dark Streets',
    genre: 'UK Drill',
    bpm: 142,
    key: 'Cm',
    description: 'Haunting melodies with aggressive 808s',
  },
  {
    id: 4,
    artwork: 'https://images.unsplash.com/photo-1504509546545-e000b4a62425',
    title: 'Night Rider',
    genre: 'Trap',
    bpm: 138,
    key: 'Gm',
    description: 'Cinematic trap vibes with heavy bass',
  },
];

const Beats = () => {
  const [selectedBeat, setSelectedBeat] = useState<typeof SAMPLE_BEATS[0] | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 backdrop-blur-sm" />
        <div className="relative container mx-auto px-4 text-center space-y-6">
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple via-neon-pink to-neon-orange">
            Latest Trap & UK Drill Beats
          </h1>
          <p className="text-xl text-muted-foreground">
            Producer: RudyBtz
          </p>
          <Button 
            className="bg-neon-purple hover:bg-neon-pink transition-all duration-300 transform hover:scale-105"
            size="lg"
          >
            Stream Now
          </Button>
        </div>
      </section>

      {/* Beat Showcase Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
          Featured Beats
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SAMPLE_BEATS.map((beat) => (
            <BeatCard
              key={beat.id}
              artwork={beat.artwork}
              title={beat.title}
              genre={beat.genre}
              bpm={beat.bpm}
              key={beat.key}
              onClick={() => setSelectedBeat(beat)}
            />
          ))}
        </div>
      </section>

      {/* Beats Table Section */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <BeatsTable />
      </main>

      {/* Beat Details Modal */}
      {selectedBeat && (
        <BeatDetailsModal
          isOpen={!!selectedBeat}
          onClose={() => setSelectedBeat(null)}
          beat={selectedBeat}
        />
      )}

      <Footer />
    </div>
  );
};

export default Beats;