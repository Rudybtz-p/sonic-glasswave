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
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
            Cubeatz
          </h1>
          <p className="text-muted-foreground">
            Discover and purchase high-quality beats
          </p>
        </div>
        <AudioVisualizer />
        <BeatsTable />
      </main>
      <Footer />
    </div>
  );
};

export default Beats;