import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AudioVisualizer } from '@/components/AudioVisualizer';
import { BeatsTable } from '@/components/BeatsTable';

const Beats = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 space-y-8">
        {/* Only render AudioVisualizer when we have a URL to pass */}
        <div className="h-64">
          <AudioVisualizer audioUrl="/placeholder-beat.mp3" />
        </div>
        <BeatsTable />
      </main>
      <Footer />
    </div>
  );
};

export default Beats;